import { IArtwork } from "../../../interfaces/artwork";

interface SpecProp {
  artwork: IArtwork | null;
}

function Specifications({ artwork }: SpecProp) {
  return (
    <section className="section">
      <h2 className="title is-5">Artwork Specifications</h2>

      <ul>
        <li>
          <strong className="text-special">Year created:</strong>{" "}
          {artwork?.year}
        </li>
        <li>
          <strong className="text-special">Price (USD):</strong>{" "}
          {artwork?.price}
        </li>
        <li>
          <strong className="text-special">Medium:</strong> {artwork?.medium}
        </li>
        <li>
          <strong className="text-special">Material(s):</strong>{" "}
          {artwork?.material}
        </li>
        <li>
          <strong className="text-special">Dimensions:</strong> {artwork?.width}
          cm (W) x {artwork?.depth}cm (D) x {artwork?.height}cm (H)
        </li>
        <li>
          <strong className="text-special">Weight:</strong> {artwork?.weight}kg
        </li>

        <li>
          <strong className="text-special">
            Is the work currently for sale?
          </strong>{" "}
          {artwork?.is_for_sale ? "Yes" : "No"}
        </li>
      </ul>
    </section>
  );
}

export default Specifications;
