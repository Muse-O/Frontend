import { useEffect } from "react";

export const IntersectionObserverEX = (fetchNextPage, lastRef) => {
  const obsHandler = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      fetchNextPage();
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (lastRef.current) {
      console.log("사이트실행");
      observer.observe(lastRef.current);
    }
    return () => {
      console.log("사이드 종료");
      observer.disconnect();
    };
  }, [obsHandler]);
};
