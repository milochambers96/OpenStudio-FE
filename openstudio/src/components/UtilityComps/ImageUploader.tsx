import axios from "axios";

const openStudioCloud = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const cloudinaryUpload = async (files: File[]): Promise<string[]> => {
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${openStudioCloud}/image/upload`;

  const imageLimit = 5;
  const filesToUpload = files.slice(0, imageLimit);

  const uploadPromises = filesToUpload.map((file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    return axios.post(cloudinaryUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  });

  try {
    const responses = await Promise.all(uploadPromises);
    return responses.map((response) => response.data.secure_url);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Cloudinary upload error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
      throw new Error(
        `Failed to upload images to Cloudinary: ${
          error.response?.data?.error?.message || error.message
        }`
      );
    } else {
      console.error("Unexpected error during Cloudinary upload:", error);
      throw new Error("An unexpected error occurred during the upload");
    }
  }
};
