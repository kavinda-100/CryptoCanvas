"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps({
        className:
          "border-2 border-dashed border-gray-300 dark:border-gray-600 p-10 text-center cursor-pointer rounded-lg",
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default Dropzone;
