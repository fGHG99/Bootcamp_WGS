import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let params = useParams();
    let navigate = useNavigate();
    return <Component {...props} params={params} navigate={navigate} />;
  }
  return ComponentWithRouterProp;
}

class YoutubePlayerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: props.params.videoId,
      suggestions: [],
      isEnded: false,
      videoDetails: null,
      channelDetails: null,
    };

    this.apiKey = import.meta.env.VITE_YOUTUBE_API;
    this.player = null;
  }

  componentDidMount() {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = this.loadPlayer;
    } else {
      this.loadPlayer();
    }

    this.fetchVideoDetails(this.state.videoId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.videoId !== this.props.videoId) {
      this.setState(
        {
          videoId: this.props.videoId,
          isEnded: false,
          suggestions: [],
          videoDetails: null,
          channelDetails: null,
        },
        () => {
          this.player?.loadVideoById(this.props.videoId);
          this.fetchVideoDetails(this.props.videoId);
        }
      );
    }
  }

  loadPlayer = () => {
    this.player = new window.YT.Player("youtube-iframe", {
      events: {
        onStateChange: this.onPlayerStateChange,
      },
    });

    this.fetchSuggestions();
  };

  onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      this.setState({ isEnded: true });
    }
  };

  fetchVideoDetails = async (videoId) => {
    try {
      // Fetch video detail
      const videoRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${this.apiKey}`
      );
      const videoData = await videoRes.json();
      const video = videoData.items[0];

      if (video) {
        this.setState({ videoDetails: video });

        // Fetch channel detail
        const channelId = video.snippet.channelId;
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${this.apiKey}`
        );
        const channelData = await channelRes.json();
        this.setState({ channelDetails: channelData.items[0] });
      }
    } catch (err) {
      console.error("Error fetching video details:", err);
    }
  };

  // error terdapat pada fetchsuggestions, dimana res tidak berhasil melakukan fetching dari data
  fetchSuggestions = async () => {
    const { videoId } = this.state;
    if (!videoId) {
      console.warn("VideoId tidak tersedia, fetchSuggestions dibatalkan.");
      return;
    }

    try {
      // Get current video details
      const videoRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${this.apiKey}`
      );
      const videoData = await videoRes.json();

      if (videoData.items && videoData.items.length > 0) {
        const videoSnippet = videoData.items[0].snippet;

        // Extract keywords from title (first few words)
        const keywords = videoSnippet.title.split(" ").slice(0, 3).join(" ");

        // Search for similar videos using keywords
        const suggestionsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
            keywords
          )}&maxResults=6&order=relevance&key=${this.apiKey}`
        );
        const suggestionsData = await suggestionsRes.json();

        if (suggestionsData.error) {
          console.error("YouTube API Error:", suggestionsData.error);
          return;
        }

        // Filter out the current video
        const filteredSuggestions =
          suggestionsData.items
            ?.filter((item) => item.id.videoId !== videoId)
            .slice(0, 5) || [];

        this.setState({ suggestions: filteredSuggestions });
        console.log("Suggested Videos:", filteredSuggestions);
      }
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  playNewVideo = (id) => {
    this.setState(
      { videoId: id, isEnded: false, suggestions: [], videoDetails: null },
      () => {
        this.player?.loadVideoById(id);
        this.fetchVideoDetails(id);
      }
    );
  };

  render() {
    const { videoId, suggestions, isEnded, videoDetails, channelDetails } =
      this.state;

    return (
      <div style={{ padding: "20px" }}>
        {/* Video Player */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          {/* Video Player Section */}
          <div style={{ flex: "0 0 70%" }}>
            <iframe
              id="youtube-iframe"
              width="100%"
              height="480"
              src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>

          {/* Suggested Videos Section */}
          <div style={{ flex: "0 0 30%", marginTop: "0" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Suggested Videos
            </h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {suggestions.map((item) => (
                <li
                  key={item.id.videoId}
                  onClick={() => this.playNewVideo(item.id.videoId)}
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "15px",
                    cursor: "pointer",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.snippet.thumbnails.default.url}
                    alt={item.snippet.title}
                    style={{
                      width: "80px",
                      height: "60px",
                      borderRadius: "6px",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        margin: "0 0 5px 0",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.snippet.title}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "gray",
                        margin: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.snippet.channelTitle}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Video Information */}
        {videoDetails && (
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {videoDetails.snippet.title}
            </h2>
            <p style={{ fontSize: "14px", color: "gray", marginBottom: "8px" }}>
              {parseInt(videoDetails.statistics.viewCount).toLocaleString()}{" "}
              views •{" "}
              {new Date(videoDetails.snippet.publishedAt).toLocaleDateString()}
            </p>

            {channelDetails && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={channelDetails.snippet.thumbnails.default.url}
                  alt={channelDetails.snippet.title}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <p style={{ fontWeight: "600" }}>
                    {channelDetails.snippet.title}
                  </p>
                  <p style={{ fontSize: "12px", color: "gray" }}>
                    {parseInt(
                      channelDetails.statistics.subscriberCount
                    ).toLocaleString()}{" "}
                    subscribers
                  </p>
                </div>
              </div>
            )}

            {/* Like button info */}
            <p style={{ fontSize: "14px", fontWeight: "500" }}>
              👍 {parseInt(videoDetails.statistics.likeCount).toLocaleString()}{" "}
              Likes
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(YoutubePlayerPage);