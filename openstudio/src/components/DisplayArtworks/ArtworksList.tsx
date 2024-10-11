import { useState, useEffect } from "react";
import axios from "axios";

import { IArtwork } from "../../interfaces/artwork";
import FullPageLoader from "../UtilityComps/FullPageLoader";
import ArtworkItems from "./ArtworkItems";

type Artworks = null | Array<IArtwork>;

function ArtworkList() {
  const [artworks, setArtworks] = useState<Artworks>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  async function getArtworks() {
    const response = await axios.get("http://localhost:8000/artworks/");
    setArtworks(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getArtworks();
  }, []);

  useEffect(() => {
    console.log(artworks);
  }, [artworks]);

  const filterArtworks = artworks?.filter((artwork) =>
    artwork.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="section">
      {isLoading ? (
        <FullPageLoader />
      ) : (
        <div className="container mt-5">
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
            {filterArtworks?.map((artwork) => (
              <ArtworkItems {...artwork} key={artwork.id} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default ArtworkList;
