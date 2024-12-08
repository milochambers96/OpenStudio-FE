import { IArtwork } from "../../../interfaces/artwork";

interface SummaryProp {
  artwork: IArtwork | null;
}

function Summary({ artwork }: SummaryProp) {
  return (
    <div className="p-4">
      <h2 className="os-subtitle-text is-size-2-desktop is-size-4-touch has-text-weight-bold">
        About the Work
      </h2>
      <div className="content mt-2 os-body-text is-size-4-desktop is-size-6-touch">
        <p>{artwork?.description}</p>
        <p className="has-text-weight-bold">Price (GBP): £{artwork?.price}</p>
      </div>
    </div>
  );
}

export default Summary;
