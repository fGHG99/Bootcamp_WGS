import React from "react";
import axios from "axios";

class UnsplashExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      query: "nature", // default query
      searchText: "", // teks input user
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchPhotos(this.state.query);
  }

  async fetchPhotos(query) {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: query,
            per_page: 12,
          },
          headers: {
            Authorization: `Client-ID ${
              import.meta.env.VITE_UNSPLASH_ACCESS_KEY
            }`,
          },
        }
      );

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
      <div className="p-4">
        {/* Search Form */}
        <form onSubmit={this.handleSubmit} className="mb-6 flex gap-2">
          <input
            type="text"
            value={this.state.searchText}
            onChange={this.handleChange}
            placeholder="Search photos..."
            className="border px-4 py-2 rounded-lg w-full"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>
        </form>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {this.state.photos.length > 0 ? (
            this.state.photos.map((photo) => (
              <div
                key={photo.id}
                className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-64"
              >
                <img
                  src={photo.urls.small}
                  alt={photo.alt_description || "Unsplash photo"}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-10">
              No photos found.
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default UnsplashExample;
