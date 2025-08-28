import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

// Higher-order component untuk menggunakan useNavigate hook dengan class component
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
  return ComponentWithRouterProp;
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
    };
    this.apiKey = import.meta.env.VITE_YOUTUBE_API;
  }

  componentDidMount() {
    this.fetchVideos();
  }

  fetchVideos = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&maxResults=12&key=${this.apiKey}`
      );
      const data = await res.json();
      this.setState({ videos: data.items || [] });
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  handleVideoClick = (videoId) => {
    this.props.navigate(`/youtube/${videoId}`);
  };

  render() {
    const { videos } = this.state;

    return (
      <div style={{ padding: "20px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "20px" }}>
          YouTube Home
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => this.handleVideoClick(video.id)}
              style={{
                cursor: "pointer",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                style={{ width: "100%", display: "block" }}
              />
              <div style={{ padding: "10px" }}>
                <p
                  style={{
                    fontWeight: "600",
                    marginBottom: "6px",
                    fontSize: "14px",
                    lineHeight: "1.3em",
                  }}
                >
                  {video.snippet.title}
                </p>
                <p style={{ fontSize: "12px", color: "gray", marginBottom: "4px" }}>
                  {video.snippet.channelTitle}
                </p>
                <p style={{ fontSize: "12px", color: "gray" }}>
                  {video.statistics.viewCount} views
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);