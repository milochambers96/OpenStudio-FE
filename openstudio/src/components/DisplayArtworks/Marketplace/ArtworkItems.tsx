import { Link } from "react-router-dom";
import { IArtwork } from "../../../interfaces/artwork";

function ArtworkItems({ id, title, artist, artworks_images }: IArtwork) {
  return (
    <div className="column is-one-quarter-desktop is-one-half-tablet">
      <Link to={`/artwork/${id}`}>
        <div className="card has-text-white-ter">
          <div className="card-header">
            <div className="card-header-title">{title}</div>
          </div>
          <div className="card-image">
            <figure className="image is-3by2">
              <img
                src={artworks_images[0]?.image_url}
                alt={`An image of ${title}`}
                className="artwork-image"
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
