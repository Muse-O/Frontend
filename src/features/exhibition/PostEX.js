import { usePostExhibition } from "../../hooks/exhibition/usetPostExhibition";

export const PostEX = (
  s3ImgUrlHandle,
  s3PostImgUrlHandle,
  files,
  postfiles,
  exhibition,
  exhibitionKind
) => {
  const [createExhibition] = usePostExhibition();
  const PostEXHandler = (event) => {
    event.preventDefault();
    const urls = s3ImgUrlHandle(files);
    const posturl = s3PostImgUrlHandle(postfiles);
    createExhibition({
      ...exhibition,
      postImage: posturl,
      artImage: urls,
      exhibitionKind,
    });
  };
  return PostEXHandler;
};
