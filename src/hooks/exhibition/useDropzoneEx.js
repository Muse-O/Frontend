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
  return [files, getRootProps, getInputProps];
};

//섬네일용
export const useDropzoneinputPostEx = () => {
  const [postfiles, setPostFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 1) {
        alert("섬네일은 1개만 가능합니다.");
        return;
      } else {
        setPostFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      }
    },
  });
  return [postfiles, getRootProps, getInputProps];
};
