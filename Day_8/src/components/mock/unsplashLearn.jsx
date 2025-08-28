import React from "react";
import axios from "axios";

class UnsplashExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      query: "nature",
      searchText: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchPhotos(this.state.query);
  }

  async fetchPhotos(query) {
    try {
      const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: query,
          per_page: 20, // ambil lebih banyak supaya masonry terisi penuh
        },
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
        },
      });

      this.setState({ photos: response.data.results });
    } catch (error) {
      console.error("Error fetching from Unsplash:", error);
    }
  }

  handleChange(event) {
    this.setState({ searchText: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ query: this.state.searchText }, () => {
      this.fetchPhotos(this.state.query);
    });
  }

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <form
          onSubmit={this.handleSubmit}
          style={{ marginBottom: "20px", display: "flex", gap: "10px" }}
        >
          <input
            type="text"
            value={this.state.searchText}
            onChange={this.handleChange}
            placeholder="Search photos..."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#2563eb",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </form>

        <div className="masonry">
          {this.state.photos.length > 0 ? (
            this.state.photos.map((photo) => (
              <div key={photo.id} className="masonry-item">
                <img
                  src={photo.urls.small}
                  alt={photo.alt_description || "Unsplash photo"}
                  style={{
                    width: "100%",
                    display: "block",
                    borderRadius: "12px",
                  }}
                />
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#666", padding: "20px" }}>
              No photos found.
            </p>
          )}
        </div>

        {/* CSS Masonry */}
        <style>{`
          .masonry {
            column-count: 4;     /* jumlah kolom */
            column-gap: 16px;    /* jarak antar kolom */
            width: 100%;         /* penuh lebar container */
          }

          .masonry-item {
            break-inside: avoid; /* jangan biarkan item terpotong */
            margin-bottom: 16px; /* jarak antar gambar */
          }

          /* Responsive */
          @media (max-width: 1200px) {
            .masonry { column-count: 3; }
          }
          @media (max-width: 768px) {
            .masonry { column-count: 2; }
          }
          @media (max-width: 480px) {
            .masonry { column-count: 1; }
          }
        `}</style>
      </div>
    );
  }
}

export default UnsplashExample;
