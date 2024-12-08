import { IArtwork } from "../../../interfaces/artwork";

interface ArtworkArtistProp {
  artwork: IArtwork | null;
}

function ArtworkArtistBio({ artwork }: ArtworkArtistProp) {
  return (
    <div className="px-6 py-4">
      <div className="content">
        <h2 className="title is-5">About the Artist</h2>
        {artwork?.artist.bio ? (
          <p>{artwork.artist.bio}</p>
        ) : (
          <p>The artist has not uploaded a bio yet.</p>
        )}
        {artwork?.artist.website && (
          <p>
            Connect with the artist:{" "}
            <a
              href={artwork?.artist.website}
              target="_blank"
              rel="noopener noreferrer"
              className="is-link"
            >
              Visit Website.
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default ArtworkArtistBio;
