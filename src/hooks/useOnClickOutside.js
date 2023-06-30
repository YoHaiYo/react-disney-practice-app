import { useEffect } from "react"

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if(!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler();
    };

    // 마우스로 클릭할때 listener 실행
    document.addEventListener("mouseup", listener);
    // 모바일터치할때 listener 실행
    document.addEventListener("touchstart", listener);
  return () => {
    document.removeEventListener("mouseup", listener);
    document.removeEventListener("touchstart", listener);
    }
  }, [ref, handler])
  
}