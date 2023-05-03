import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useDetailGetExibition } from "../../../../hooks/exhibition/useDetailGetExibition";

export const GetDetailInfos = () => {
  const { id } = useParams();
  const reviewRef = useRef(null);
  const [info, isLoading, isError] = useDetailGetExibition(id);
  return [id, reviewRef, info, isLoading, isError];
};
