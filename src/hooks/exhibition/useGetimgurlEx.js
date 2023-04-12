import { v4 as uuidv4 } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { useRef } from "react";

export const useGetimgurlEx = (files) => {
  const order = useRef(1);
  const s3imgurlhandle = (sourceUrl) => {
    let urls = [];
    files.forEach((file) => {
      const fileName = `${sourceUrl}/${uuidv4()}.${file.type.split("/")[1]}`;
      const newimageUrl = `https://${process.env.REACT_APP_BucketName}.s3.amazonaws.com/${fileName}`;
      const newObject = {
        order: order.current.toString(),
        imgUrl: newimageUrl,
        imgCaption: "이미지 내용",
      };
      order.current++;
      urls.push(newObject);
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
        const response = s3Client.send(putCommand);
      } catch (err) {
        console.log(err.message);
      }
    });
    return urls;
  };
  return [s3imgurlhandle];
};

export const useGetPostimgurlEx = (postfiles) => {
  const s3Postimgurlhandle = (sourceUrl) => {
    let posturl = "";
    postfiles.forEach((file) => {
      const fileName = `${sourceUrl}/${uuidv4()}.${file.type.split("/")[1]}`;
      const newimageUrl = `https://${process.env.REACT_APP_BucketName}.s3.amazonaws.com/${fileName}`;
      posturl = newimageUrl;
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
        const response = s3Client.send(putCommand);
      } catch (err) {
        console.log(err.message);
      }
    });
    return posturl;
  };
  return [s3Postimgurlhandle];
};
