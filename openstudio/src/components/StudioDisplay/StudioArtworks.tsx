import { useState, useEffect } from "react";
import axios from "axios";

import { IArtwork } from "../../interfaces/artwork";

import SectionLoader from "../UtilityComps/SectionLoader";

type Artworks = null | Array<IArtwork>;

function StudioArtworks() {
  const [studioArtworks, setStudioArtworks] = useState<Artworks>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  async function getArtworks();

  return <p>Artwork</p>;
}

export default StudioArtworks;
