import { IArtwork } from "../../../interfaces/artwork";

interface ArtworkArtistProp {
  artwork: IArtwork | null;
}

function ArtworkArtistBio({ artwork }: ArtworkArtistProp) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="title is-5">About the Artist</h2>
        <div className="content">
          <p>{artwork?.artist.bio || "No artist bio available."}</p>
          {artwork?.artist.website && (
            <p>
              Connect with the artist:{" "}
              <a
                href={artwork?.artist.website}
                target="_blank"
                rel="noopener noreferrer"
                className="is-link"
              >
                Visit Website
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ArtworkArtistBio;
