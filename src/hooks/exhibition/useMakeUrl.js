import { v4 as uuidv4 } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { useRef, useState } from "react";

export const useMakeUrl = (files) => {
  // console.log("url받아오는곳", files);
  const [imgurls, setUrls] = useState([]);
  const order = useRef(1);
  const imgurlhandle = (sourceUrl) => {
    files.forEach((file, index) => {
      const fileName = `${sourceUrl}/${uuidv4()}-${file.name}`;
      const newimageUrl = `https://${process.env.REACT_APP_BucketName}.s3.amazonaws.com/${fileName}`;
      const newObject = {
        order: order.current.toString(),
        imgUrl: newimageUrl,
        imgCaption: "이미지 내용",
      };
      setUrls((pre) => [...pre, newObject]);
      order.current++;
    });
  };
  return [imgurls, imgurlhandle];
};

export const useThumbnailUrl = (files) => {
  // console.log("url받아오는곳", files);
  const [imgurls, setUrls] = useState([]);
  const imgurlhandle = (sourceUrl) => {
    files.forEach((file, index) => {
      const fileName = `${sourceUrl}/${uuidv4()}-${file.name}`;
      const newimageUrl = `https://${process.env.REACT_APP_BucketName}.s3.amazonaws.com/${fileName}`;
      setUrls(newimageUrl);
    });
  };
  return [imgurls, imgurlhandle];
};
