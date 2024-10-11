import { useState, useEffect } from "react";
import axios from "axios";

import { IMember } from "../../../../interfaces/member";
import { IArtwork } from "../../../../interfaces/artwork";

interface CollectorActionProps {
  member: IMember | null;
  artwork: IArtwork | null;
}

function CollectorGalleryActions({ member, artwork }: CollectorActionProps) {
  const [isInGallery, setIsInGallery] = useState(false);

  const galleryId = Number(localStorage.getItem("gallery_id"));

  useEffect(() => {
    if (!artwork || !galleryId) return;

    const checkArtworkInGallery = async () => {
      try {
        const response = await axios.get(
          `/api/galleries/${galleryId}/artworks/`
        );
        const artworkExists = response.data.some(
          (art: IArtwork) => art.id === artwork.id
        );
        setIsInGallery(artworkExists);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error fetching artworks:", error.response?.data);
      }
    };

    checkArtworkInGallery();
  }, [artwork, galleryId]);

  const addToGallery = async () => {
    if (!artwork || !member || !galleryId) return;
    try {
      await axios.post(`/api/galleries/${galleryId}/curate/`, {
        artwork: artwork.id,
      });
      setIsInGallery(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error adding artwork:", error.response?.data);
    }
  };

  const removeFromGallery = async () => {
    if (!artwork || !member || !galleryId) return;
    try {
      await axios.delete(`/api/galleries/${galleryId}/curate/`, {
        data: { artwork: artwork.id },
      });
      setIsInGallery(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error removing artwork:", error.response?.data);
    }
  };

  return (
    <div>
      {isInGallery ? (
        <button className="button is-danger" onClick={removeFromGallery}>
          Remove from Gallery
        </button>
      ) : (
        <button className="button is-primary" onClick={addToGallery}>
          Add to Gallery
        </button>
      )}
    </div>
  );
}

export default CollectorGalleryActions;
