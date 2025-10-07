"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { toast } from "sonner";

function Dropzone() {
  const MAX_FILE_SIZE = 10;
  const MAX_FILES = 1;
  // State to hold the uploaded file and its metadata
  const [file, setFile] = React.useState<{
    file: File;
    isUploaded: boolean;
    cid: string;
  } | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // set the first accepted file
    if (acceptedFiles.length > 0) {
      setFile({
        file: acceptedFiles[0]!,
        isUploaded: false,
        cid: "",
      });
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
    <>
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
        <div className="group relative mt-5 w-full">
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

          <form className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button variant="destructive">Remove</Button>
          </form>

          <p className="mt-2 truncate text-sm text-gray-500">
            {file.file.name}
          </p>
        </div>
      )}
    </>
  );
}

export default Dropzone;
