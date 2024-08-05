 import { useRef, useCallback } from "react";

const useResizable = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidthContent = contentRef.current?.offsetWidth || 0;
    const startWidthDetails = detailsRef.current?.offsetWidth || 0;

    const doDrag = (dragEvent: MouseEvent) => {
      if (contentRef.current && detailsRef.current) {
        const newWidthContent = Math.max(
          100,
          startWidthContent + (dragEvent.clientX - startX)
        );
        const newWidthDetails = Math.max(
          100,
          startWidthDetails - (dragEvent.clientX - startX)
        );

        const maxWidthContent =
          contentRef.current.parentElement?.offsetWidth || window.innerWidth;
        const maxWidthDetails =
          detailsRef.current.parentElement?.offsetWidth || window.innerWidth;

        if (
          newWidthContent < maxWidthContent &&
          newWidthDetails < maxWidthDetails
        ) {
          contentRef.current.style.width = `${newWidthContent}px`;
          detailsRef.current.style.width = `${newWidthDetails}px`;
        }
      }
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", stopDrag);
    };

    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag);
  }, []);

  return {
    contentRef,
    detailsRef,
    handleMouseDown,
  };
};

export default useResizable;
