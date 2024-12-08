import { IArtwork } from "../../../interfaces/artwork";

interface ArtworkArtistProp {
  artwork: IArtwork | null;
}

function ArtworkArtistBio({ artwork }: ArtworkArtistProp) {
  return (
    <div className="px-6 py-4">
      <h2 className="os-subtitle-text is-size-2-desktop is-size-4-touch has-text-weight-bold">
        About the Artist
      </h2>
      <div className="content content mt-2 os-body-text is-size-4-desktop is-size-6-touch">
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
