import { IArtwork } from "../../../interfaces/artwork";
import { Link } from "react-router-dom";

function ArtworkItems({ id, title, artist, artworks_images }: IArtwork) {
  return (
    <div className="column is-one-quarter-desktop is-one-half-tablet">
      <Link to={`/artwork/${id}`}>
        <div className="card has-text-white-ter">
          <div className="card-header">
            <div className="card-header-title">{title}</div>
          </div>
          <div className="card-image">
            <figure className="image fixed-image-container">
              <img
                src={artworks_images[0].image_url}
                alt={`An image of ${title}`}
                className="fixed-image"
              />
            </figure>
          </div>
          <div className="card-content">
            <p>
              by {artist.first_name} {artist.last_name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ArtworkItems;
