import { useState } from "react";
import { useDropzone } from "react-dropzone";

//상세이미지용
export const useDropzoneinputEx = () => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles((old) => {
        return [
          ...old,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ];
      });
    },
  });
  // console.log("내부URL", files);
  return [files, setFiles, getRootProps, getInputProps];
};

//섬네일용
export const useDropzoneinputPostEx = () => {
  const [postfiles, setPostFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setPostFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  return [postfiles, setPostFiles, getRootProps, getInputProps];
};
