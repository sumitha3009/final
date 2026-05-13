import axios from "axios";

export const uploadImage = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "YOUR_UPLOAD_PRESET");
  formData.append("cloud_name", "YOUR_CLOUD_NAME");

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
    formData
  );

  return response.data.secure_url;
};
