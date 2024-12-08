import { IArtwork } from "../../../interfaces/artwork";

interface SpecProp {
  artwork: IArtwork | null;
}

function Specifications({ artwork }: SpecProp) {
  return (
    <div className="px-6 py-4">
      <div className="content">
        <h2 className="title is-5">Artwork Specifications</h2>
        <ul>
          <li>
            <span className="has-text-weight-bold">Year created:</span>{" "}
            {artwork?.year}
          </li>
          <li>
            <span className="has-text-weight-bold">Price (USD):</span>{" "}
            {artwork?.price}
          </li>
          <li>
            <span className="has-text-weight-bold">Medium:</span>{" "}
            {artwork?.medium}
          </li>
          <li>
            <span className="has-text-weight-bold">Material(s):</span>{" "}
            {artwork?.material}
          </li>
          <li>
            <span className="has-text-weight-bold">Dimensions:</span>{" "}
            {artwork?.width}
            cm (W) x {artwork?.depth}cm (D) x {artwork?.height}cm (H)
          </li>
          <li>
            <span className="has-text-weight-bold">Weight:</span>{" "}
            {artwork?.weight}
            kg
          </li>

          <li>
            <span className="has-text-weight-bold">
              Is the work currently for sale?
            </span>{" "}
            {artwork?.is_for_sale ? "Yes" : "No"}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Specifications;
