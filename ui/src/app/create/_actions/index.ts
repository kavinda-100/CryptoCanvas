"use server";

import pinata from "@/pinata";

export const deleteFileAction = async (fileId: string) => {
  try {
    // Logic to delete the file using Pinata SDK or API
    await pinata.files.public.delete([fileId]);
    return { success: true };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false, error: "Error deleting file" };
  }
};

type UploadJSONResponse = {
  name: string;
  description: string;
  image: string;
  fallbackImage: string;
  attributes: { trait_type: string; value: string }[];
  external_link: string;
};

export const uploadJSONMetadata = async (metadata: UploadJSONResponse) => {
  try {
    const upload = await pinata.upload.public.json({
      name: metadata.name,
      description: metadata.description,
      image: metadata.image,
      fallbackImage: metadata.fallbackImage,
      attributes: metadata.attributes,
      external_link: metadata.external_link ?? "https://pinata.cloud",
    });
    return { success: true, cid: upload.cid };
  } catch (error) {
    console.error("Error uploading JSON metadata:", error);
    return { success: false, error: "Error uploading JSON metadata" };
  }
};
