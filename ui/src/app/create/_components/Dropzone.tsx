"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, Loader2Icon, XIcon } from "lucide-react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { toast } from "sonner";
import pinata from "@/pinata";
import { deleteFileAction } from "../_actions";
import { useCreateNFTStoreDetails } from "@/store/createNFTStore";

// https://ipfs.io/ipfs/bafybeifnlmbmldh4pkmscwdlmfwooatlcowwqdwg5xslry4psxtcusxoj4

// https://yourgateway.mypinata.cloud/ipfs/bafybeifnlmbmldh4pkmscwdlmfwooatlcowwqdwg5xslry4psxtcusxoj4

function Dropzone() {
  // Get the store actions
  const { setImage, setFallbackImage } = useCreateNFTStoreDetails();
  // file upload constants
  const MAX_FILE_SIZE = 10;
  const MAX_FILES = 1;
  // State to hold the uploaded file and its metadata
  const [file, setFile] = React.useState<{
    file: File;
    isUploaded: boolean;
    cid: string;
    id: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const uploadFile = async (file: File) => {
    try {
      // set the file as uploading
      setFile({
        file,
        isUploaded: true,
        cid: "",
        id: "",
      });
      // upload the file to pinata
      const urlRequest = await fetch("/api/pinata/url"); // Fetches the temporary upload URL
      const urlResponse: { url: string } = await urlRequest.json(); // Parse response
      const upload = await pinata.upload.public.file(file).url(urlResponse.url); // Upload the file with the signed URL

      // set the file as uploaded
      setFile({
        file,
        isUploaded: false,
        cid: upload.cid,
        id: upload.id,
      });
      // set the image in the store
      setImage(`https://ipfs.io/ipfs/${upload.cid}`);
      setFallbackImage(
        `https://${process.env.PINATA_GATEWAY}/ipfs/${upload.cid}`,
      );
      // show success toast
      toast.success(`File - ${file.name} uploaded successfully!`);
    } catch (error) {
      toast.error(`Error uploading file - ${file.name}`);
      setFile({
        file,
        isUploaded: false,
        cid: "",
        id: "",
      });
      console.error("Error uploading file:", error);
    }
  };

  // Handle deleted files
  const deleteFile = async (
    fileId: string,
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    try {
      // if no file, return
      if (!file) return;
      // set loading state
      setIsDeleting(true);
      //  delete the file from pinata
      const res = await deleteFileAction(fileId);
      if (res.success) {
        // remove the file from state
        setIsDeleting(false);
        setFile(null);
        toast.success("File deleted successfully");
        // clear the image from the store
        setImage("");
        setFallbackImage("");
      } else {
        setIsDeleting(false);
        toast.error(res.error ?? "Error deleting file");
      }
    } catch (error) {
      console.error("Internal server error when deleting file:", error);
      setIsDeleting(false);
      toast.error("Internal server error");
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // set the first accepted file
    if (acceptedFiles.length > 0) {
      setFile({
        file: acceptedFiles[0]!,
        isUploaded: false,
        cid: "",
        id: "",
      });
    }
    // upload the first accepted file
    if (acceptedFiles.length > 0) {
      void uploadFile(acceptedFiles[0]!);
    }
  }, []);

  // Handle rejected files
  const rejectedFiles = useCallback((fileRejection: FileRejection[]) => {
    if (fileRejection.length) {
      const tooManyFiles = fileRejection.find(
        (rejection) => rejection.errors[0]?.code === "too-many-files",
      );

      const fileSizeToBig = fileRejection.find(
        (rejection) => rejection.errors[0]?.code === "file-too-large",
      );

      if (tooManyFiles) {
        toast.error(`Too many files selected, max is ${MAX_FILES}`);
      }

      if (fileSizeToBig) {
        toast.error(`File size exceeds ${MAX_FILE_SIZE}MB limit`);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: rejectedFiles,
    maxFiles: MAX_FILES,
    maxSize: 1024 * 1024 * MAX_FILE_SIZE, // 10mb
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <section className="flex w-full flex-col gap-y-5">
      {/* Dropzone */}
      <div
        {...getRootProps({
          className:
            "border-2 border-dashed border-gray-300 dark:border-gray-600 p-10 text-center cursor-pointer rounded-lg",
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-center">Drop the files here ...</p>
        ) : (
          <div className="flex flex-col items-center gap-y-3">
            <p>Drag and drop some files here, or click to select files</p>
            <Button>Select Files</Button>
          </div>
        )}
      </div>

      {/* Display uploaded file image */}
      {file?.file && (
        <div className="group relative w-full">
          <div className="relative">
            <img
              src={URL.createObjectURL(file.file)}
              alt={file.file.name}
              width={200}
              height={200}
              className={cn(
                file.isUploaded ? "opacity-50" : "",
                "size-32 rounded-lg object-cover",
              )}
            />

            {file.isUploaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="text-primary size-8 animate-spin" />
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => deleteFile(file.id, e)}
            className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Button variant="destructive" disabled={isDeleting}>
              {isDeleting ? (
                <Loader2Icon className="size-5 animate-spin" />
              ) : (
                <XIcon className="size-5" />
              )}
            </Button>
          </form>

          <p className="mt-2 truncate text-sm text-gray-500">
            {file.file.name}
          </p>
        </div>
      )}
    </section>
  );
}

export default Dropzone;
