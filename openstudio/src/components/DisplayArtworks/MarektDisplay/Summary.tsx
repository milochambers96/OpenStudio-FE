import { IArtwork } from "../../../interfaces/artwork";

interface SummaryProp {
  artwork: IArtwork | null;
}

function Summary({ artwork }: SummaryProp) {
  return (
    <section className="section">
      <p>{artwork?.description}</p>
      <br />
      <p>
        <strong className="text-special">Price (USD):</strong> {artwork?.price}
      </p>
    </section>
  );
}

export default Summary;
