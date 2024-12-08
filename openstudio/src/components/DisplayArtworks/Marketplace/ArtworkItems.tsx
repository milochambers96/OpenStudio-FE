import { Link } from "react-router-dom";
import { IArtwork } from "../../../interfaces/artwork";

function ArtworkItems({ id, title, artist, artworks_images }: IArtwork) {
  return (
    <div className="column is-one-third-desktop is-full-mobile">
      <Link to={`/artwork/${id}`}>
        <div className="card os-content-bk">
          <div className="card-header">
            <h4 className="card-header-title os-subtitle-text is-size-4">
              {title}
            </h4>
          </div>
          <div className="card-image px-1">
            <figure className="image is-3by2">
              <img
                src={artworks_images[0]?.image_url}
                alt={`An image of ${title}`}
                className="artwork-image"
              />
            </figure>
          </div>
          <div className="card-content">
            <h5 className="os-subtitle-text is-size-5">
              by {artist.first_name} {artist.last_name}
            </h5>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ArtworkItems;
