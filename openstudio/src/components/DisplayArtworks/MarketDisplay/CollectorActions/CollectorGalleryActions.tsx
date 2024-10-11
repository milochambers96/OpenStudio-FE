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

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  useEffect(() => {
    if (!artwork || !galleryId) return;

    const checkArtworkInGallery = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/galleries/${galleryId}/artworks/`,
          getAuthConfig()
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
      await axios.post(
        `http://localhost:8000/galleries/${galleryId}/curate/`,
        {
          artwork: artwork.id,
        },
        getAuthConfig()
      );
      setIsInGallery(true);
      console.log("Adding to gallery");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error adding artwork:", error.response?.data);
    }
  };

  const removeFromGallery = async () => {
    if (!artwork || !member || !galleryId) return;
    try {
      await axios.delete(
        `http://localhost:8000/galleries/${galleryId}/curate/`,
        {
          ...getAuthConfig(),
          data: { artwork: artwork.id },
        }
      );
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
        <button className="button is-link" onClick={addToGallery}>
          Add to Gallery
        </button>
      )}
    </div>
  );
}

export default CollectorGalleryActions;
