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
