import { IArtwork } from "../../../interfaces/artwork";

interface SummaryProp {
  artwork: IArtwork | null;
}

function Summary({ artwork }: SummaryProp) {
  return (
    <div className="px-6 py-4">
      <h2 className="title is-5">About the Work</h2>
      <div className="content">
        <p>{artwork?.description}</p>
        <p className="has-text-weight-bold">Price (GBP): £{artwork?.price}</p>
      </div>
    </div>
  );
}

export default Summary;
