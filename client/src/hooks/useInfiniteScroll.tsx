import { RefObject, useCallback, useEffect, useRef, useState } from "react";

const useInfiniteScroll = (targetRef: RefObject<HTMLElement>) => {
  const observerRef = useRef<IntersectionObserver>(); // 한번만 등록되게끔 하기 위해서 ref에 담음
  const [intersecting, setIntersecting] = useState(false);
  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        setIntersecting(entries[0].isIntersecting);
      });
    }
    return observerRef.current;
  }, []);
  useEffect(() => {
    if (targetRef.current) getObserver().observe(targetRef.current);
  }, [targetRef.current]);
  return intersecting;
};
export default useInfiniteScroll;
