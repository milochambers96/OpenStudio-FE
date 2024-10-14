import { useState, useEffect } from "react";
import axios from "axios";

import { baseUrl } from "../../../config";

import { IArtwork } from "../../../interfaces/artwork";

import FullPageLoader from "../../UtilityComps/FullPageLoader";
import ArtworkItems from "./ArtworkItems";

type Artworks = null | Array<IArtwork>;

function ArtworkList() {
  const [artworks, setArtworks] = useState<Artworks>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchArtworks = async () => {
      const response = await axios.get(`${baseUrl}/artworks/`);
      setArtworks(response.data);
      setIsLoading(false);
    };

    fetchArtworks();
  }, []);

  const filteredArtworks = artworks?.filter((artwork) =>
    artwork.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = filteredArtworks
    ? Math.ceil(filteredArtworks.length / itemsPerPage)
    : 1;
  const currentArtworks = filteredArtworks?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="section">
      {isLoading ? (
        <FullPageLoader />
      ) : (
        <div className="container mt-5">
          <h1 className="title text-special has-text-centered is-3">
            Gallery Artworks
          </h1>
          <div className="columns is-centered">
            <div className="column is-one-third-desktop is-full-mobile">
              <div className="field">
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Search for artworks by artist"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-multiline">
            {currentArtworks?.map((artwork) => (
              <ArtworkItems {...artwork} key={artwork.id} />
            ))}
          </div>

          <nav
            className="pagination is-centered"
            role="navigation"
            aria-label="pagination"
          >
            <ul className="pagination-list">
              {[...Array(totalPages)].map((_, index) => (
                <li key={index}>
                  <a
                    className={`pagination-link ${
                      currentPage === index + 1 ? "is-current" : ""
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </section>
  );
}

export default ArtworkList;
