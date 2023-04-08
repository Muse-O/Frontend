import { useState } from "react";
import { useDropzone } from "react-dropzone";

export const useDropzoneinputEx = () => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  // console.log("내부URL", files);
  return [files, setFiles, getRootProps, getInputProps];
};
