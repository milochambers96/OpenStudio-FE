import { IArtwork } from "../../../interfaces/artwork";

interface SummaryProp {
  artwork: IArtwork | null;
}

function Summary({ artwork }: SummaryProp) {
  return (
    <section className="section">
      <h2 className="title is-5">About the Work</h2>
      <p>{artwork?.description}</p>
      <br />
      <p>
        <strong className="text-special">Price (GBP): </strong> £
        {artwork?.price}
      </p>
    </section>
  );
}

export default Summary;
