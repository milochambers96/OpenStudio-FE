import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { baseUrl } from "../../../../config";

import {
  ArtworkFormData,
  ArtworkFormWithImages,
} from "../../../../interfaces/artwork";

import ArtworkForm from "../../../UtilityComps/ArtworkForm";
import { cloudinaryUpload } from "../../../UtilityComps/ImageUploader";

interface UpdateArtworkProp {
  memberId: number | undefined;
}

function UpdateArtworkDetails({ memberId }: UpdateArtworkProp) {
  const [artworkInfo, setArtworkInfo] = useState<ArtworkFormWithImages | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { artworkId } = useParams<{ artworkId: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      if (!memberId) {
        setError("You must be logged in to edit artwork.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${baseUrl}/artworks/${artworkId}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setArtworkInfo(response.data);

        if (response.data.artist.id !== memberId) {
          setError("You don't have permission to edit this artwork.");
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error fetching artwork:", error);
        setError("Failed to fetch artwork details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchArtworkDetails();
  }, [artworkId, memberId]);

  const handleSubmit = async (
    formData: ArtworkFormData,
    imageFiles: (File | null)[]
  ) => {
    if (!memberId) {
      setError("You must be logged in to update artwork.");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const validFiles = imageFiles.filter(
        (file): file is File => file !== null
      );
      let newImageUrls: string[] = [];
      if (validFiles.length > 0) {
        newImageUrls = await cloudinaryUpload(validFiles);
      }

      const existingImageUrls =
        artworkInfo?.artworks_images?.map((img) =>
          typeof img === "string" ? img : img.image_url
        ) ?? [];
      const updatedImageUrls = [...existingImageUrls, ...newImageUrls];

      const updatedArtworkData = {
        ...formData,
        artworks_images: updatedImageUrls,
        artist: memberId,
      };

      await axios.put(`${baseUrl}/artworks/${artworkId}/`, updatedArtworkData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate("/studio");
    } catch (error) {
      console.error("Error updating artwork:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data);
        setError(
          `Failed to update artwork: ${
            error.response?.data?.detail || error.message
          }`
        );
      } else {
        setError("Failed to update artwork. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!artworkInfo) return <div>Artwork not found.</div>;

  return (
    <div className="section">
      <div className="section mt-5">
        <div className="container mt-5">
          <div className="columns is-centered">
            <div className="column is-two-thirds">
              <div className="box scrollable-container">
                <h1 className="title">Update Artwork Details</h1>
                <ArtworkForm
                  initialData={artworkInfo}
                  onSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateArtworkDetails;
