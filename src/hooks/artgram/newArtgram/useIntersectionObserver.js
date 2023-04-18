import { useEffect, useRef } from "react";

export const useInterserctionObserver = (fetchNextPage) => {
  const ref = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchNextPage()
        console.log("IntersectionObserver 동작")
        
      }
    }, { threshold: 0.01 });

    if (ref.current) {
      console.log("IntersectionObserver 감지시작")
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        console.log("IntersectionObserver 감지해제.")
        observer.unobserve(ref.current);
      }
    };
  }, []);
  return {ref}
}