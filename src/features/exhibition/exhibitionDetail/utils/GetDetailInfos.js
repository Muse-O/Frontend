import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDetailGetExibition } from "../../../../hooks/exhibition/useDetailGetExibition";

export const GetDetailInfos = () => {
  const { id } = useParams();
  const reviewRef = useRef(null);
  const [info, isLoading, isError] = useDetailGetExibition(id);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return [id, reviewRef, info, isLoading, isError];
};
