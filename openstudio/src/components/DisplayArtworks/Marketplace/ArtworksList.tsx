import React, { useState, useEffect, ChangeEvent } from "react";
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
  const [showOnlyForSale, setShowOnlyForSale] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/artworks/`);
      setArtworks(
        Array.isArray(response.data)
          ? response.data
          : response.data.artworks || []
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching artworks:", error);
      setIsLoading(false);
    }
  };

  const getArtistFullName = (artwork: IArtwork) => {
    return `${artwork.artist.first_name} ${artwork.artist.last_name}`.toLowerCase();
  };

  const filterArtworks = (
    artworks: IArtwork[],
    query: string,
    onlyForSale: boolean
  ) => {
    const lowercaseQuery = query.toLowerCase().trim();
    return artworks.filter(
      (artwork) =>
        (getArtistFullName(artwork).includes(lowercaseQuery) ||
          artwork.title.toLowerCase().includes(lowercaseQuery)) &&
        (!onlyForSale || artwork.is_for_sale)
    );
  };

  const filteredArtworks = artworks
    ? filterArtworks(artworks, searchQuery, showOnlyForSale)
    : null;

  const totalFilteredArtworks = filteredArtworks?.length || 0;
  const calculatedTotalPages = Math.ceil(totalFilteredArtworks / itemsPerPage);

  useEffect(() => {
    setTotalPages(calculatedTotalPages);
  }, [calculatedTotalPages]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleForSaleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowOnlyForSale(e.target.checked);
    setCurrentPage(1);
  };

  const paginatedArtworks = filteredArtworks?.slice(
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
            OpenStudio's Marketplace
          </h1>
          <div className="columns is-centered">
            <div className="column is-one-third-desktop is-full-mobile">
              <div className="field">
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Search by artist"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={showOnlyForSale}
                      onChange={handleForSaleFilter}
                    />{" "}
                    Only show artworks available for purchase
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="scrollable-container">
            <div className="columns is-multiline">
              {paginatedArtworks?.map((artwork) => (
                <ArtworkItems {...artwork} key={artwork.id} />
              ))}
            </div>
          </div>

          {totalFilteredArtworks > 0 && (
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
          )}
        </div>
      )}
    </section>
  );
}

export default ArtworkList;
