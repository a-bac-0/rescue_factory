import cloudinary from "./configCloudinary";

const uploadImage = async (filePath: string) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "ecommerce",
  });
};
export default uploadImage;