import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { baseUrl } from "../../config";

import { IArtwork } from "../../interfaces/artwork";

import SectionLoader from "../UtilityComps/SectionLoader";
import ArtworkItems from "../DisplayArtworks/Marketplace/ArtworkItems";

type Artworks = null | Array<IArtwork>;

interface StudioArtworkProps {
  memberId: number | undefined;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function StudioArtworks({ memberId, setActiveTab }: StudioArtworkProps) {
  const [studioArtworks, setStudioArtworks] = useState<Artworks>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4;

  const getArtworks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseUrl}/artworks/`);
      const allArtworks = response.data;

      const artistsWork = allArtworks.filter(
        (artwork: IArtwork) => artwork.artist.id === memberId
      );

      setStudioArtworks(artistsWork);
      setTotalPages(Math.ceil(artistsWork.length / itemsPerPage));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ||
            "An error occurred while fetching studio artworks."
        );
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Error fetching studio artworks:", error);
    }
  }, [memberId, itemsPerPage]);

  useEffect(() => {
    if (memberId) {
      getArtworks();
    }
  }, [memberId, getArtworks]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) return <SectionLoader />;
  if (error) return <p className="has-text-danger">{error}</p>;

  const paginatedArtworks = studioArtworks?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const noUploadedWorkMessage = () => {
    return (
      <div className="has-text-centered-desktop has-text-justifed-touch is-size-3-desktop is-size-5-touch os-body-text">
        <h4>Your studio awaits its first creation.</h4>
        <h4 className="mt-4">
          Share your work with the world -{" "}
          <span
            className="is-link-text has-cursor-pointer"
            onClick={() => setActiveTab("upload")}
          >
            upload
          </span>{" "}
          your first artwork.
        </h4>
      </div>
    );
  };

  return (
    <article className="article">
      <div className="mb-6 pb-4">
        <h2 className="is-size-2-desktop is-size-3-touch has-text-centered has-text-weight-bold os-subtitle-text">
          Shared Artworks
        </h2>
      </div>
      {paginatedArtworks && paginatedArtworks.length > 0 ? (
        <>
          <div className="columns is-multiline">
            {paginatedArtworks.map((artwork) => (
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
        noUploadedWorkMessage()
      )}
    </article>
  );
}

export default StudioArtworks;
