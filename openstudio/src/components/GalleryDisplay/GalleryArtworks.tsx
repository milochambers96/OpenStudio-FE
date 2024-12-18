import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { baseUrl } from "../../config";

import { IArtwork } from "../../interfaces/artwork";

import SectionLoader from "../UtilityComps/SectionLoader";
import ArtworkItems from "../DisplayArtworks/Marketplace/ArtworkItems";

type Artworks = null | Array<IArtwork>;

function GalleryArtworks() {
  const [galleryArtworks, setGalleryArtworks] = useState<Artworks>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4;

  async function getArtworks(page: number) {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/galleries/my-gallery/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
          per_page: itemsPerPage,
        },
      });
      setGalleryArtworks(response.data.artworks);
      setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ||
            "An error occurred while fetching gallery artworks."
        );
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Error fetching gallery artworks:", error);
    }
  }

  useEffect(() => {
    getArtworks(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) return <SectionLoader />;
  if (error) return <p className="has-text-danger">{error}</p>;

  const noSavedWorkMessage = () => {
    return (
      <div className="has-text-centered-desktop has-text-justifed-touch is-size-3-desktop is-size-5-touch os-body-text">
        <h4>Your gallery is waiting for its first masterpiece.</h4>
        <h4 className="mt-4">
          Visit the{" "}
          <Link to="/marketplace" className="is-link-text">
            Marketplace
          </Link>{" "}
          to discover and curate your collection.
        </h4>
      </div>
    );
  };

  return (
    <article className="article">
      <div className="mb-6">
        <h2 className="is-size-2-desktop is-size-3-touch has-text-centered has-text-weight-bold os-subtitle-text">
          Works on Display
        </h2>
      </div>
      {galleryArtworks && galleryArtworks.length > 0 ? (
        <>
          <div className="columns is-multiline">
            {galleryArtworks.map((artwork) => (
              <ArtworkItems {...artwork} key={artwork.id} />
            ))}
          </div>
          <nav
            className="pagination is-centered"
            role="navigation"
            aria-label="pagination"
          >
            <button
              className="pagination-previous"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="pagination-next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <ul className="pagination-list">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    className={`pagination-link ${
                      currentPage === index + 1 ? "is-current" : ""
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : (
        noSavedWorkMessage()
      )}
    </article>
  );
}

export default GalleryArtworks;
