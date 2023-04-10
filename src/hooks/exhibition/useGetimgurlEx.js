import { v4 as uuidv4 } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const useGetimgurlEx = (files) => {
  const s3imgurlhandle = (sourceUrl) => {
    files.forEach((file) => {
      const fileName = `${sourceUrl}/${uuidv4()}`;
      console.log("서버로들어가는 idfileName", fileName);
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
        console.log("잘들어갔나요?");
      } catch (err) {
        console.log(err.message);
      }
    });
  };
  return [s3imgurlhandle];
};
