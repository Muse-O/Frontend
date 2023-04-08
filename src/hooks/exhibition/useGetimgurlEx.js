import { v4 as uuidv4 } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { useState } from "react";

export const useGetimgurlEx = (files) => {
  // console.log("url받아오는곳", files);
  const [urls, setUrls] = useState([]);
  const s3imgurlhandle = (sourceUrl) => {
    files.forEach((file) => {
      const fileName = `${sourceUrl}/${uuidv4()}-${file.name}`;
      const fileType = file.type;
      const s3Client = new S3Client({
        credentials: {
          accessKeyId: process.env.REACT_APP_AccessKey,
          secretAccessKey: process.env.REACT_APP_SecretAccessKey,
        },
        region: process.env.REACT_APP_BucketRegion,
      });

      const putCommand = new PutObjectCommand({
        Bucket: process.env.REACT_APP_BucketName,
        Key: fileName,
        Body: file,
        ContentType: fileType,
      });
      try {
        // const response = s3Client.send(putCommand);
        const newimageUrl = `https://${process.env.REACT_APP_BucketName}.s3.amazonaws.com/${fileName}`;
        // console.log("내부URL", urls);
        setUrls((pre) => [...pre, newimageUrl]);
      } catch (err) {
        console.log(err.message);
      }
    });
  };
  return [urls, setUrls, s3imgurlhandle];
};
