import { useState, useEffect } from "react";
import axios from "axios";

import { baseUrl } from "../../../../config";

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
          `${baseUrl}/galleries/${galleryId}/artworks/`,
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
        `${baseUrl}/galleries/${galleryId}/curate/`,
        {
          artwork: artwork.id,
        },
        getAuthConfig()
      );
      setIsInGallery(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error adding artwork:", error.response?.data);
    }
  };

  const removeFromGallery = async () => {
    if (!artwork || !member || !galleryId) return;
    try {
      await axios.delete(`${baseUrl}/galleries/${galleryId}/curate/`, {
        ...getAuthConfig(),
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
      <button
        className={`button is-small-mobile ${
          isInGallery ? "is-destroy" : "is-link"
        }`}
        onClick={isInGallery ? removeFromGallery : addToGallery}
        title={isInGallery ? "Remove from Gallery" : "Add to Gallery"}
      >
        Gallery {isInGallery ? "−" : "+"}
      </button>
    </div>
  );
}

export default CollectorGalleryActions;
