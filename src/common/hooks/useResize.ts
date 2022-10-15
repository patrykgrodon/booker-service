import { useEffect, useState } from "react";

const useResize = (size: number) => {
  const [isBelowSize, setIsBelowSize] = useState(window.innerWidth < size);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < size) {
        setIsBelowSize(true);
      } else {
        setIsBelowSize(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [size]);

  return isBelowSize;
};
export default useResize;
