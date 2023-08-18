import { useEffect, useState } from "react";

export default function useClickOutside(ref: React.MutableRefObject<any>) {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        setTrigger((b) => !b);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return trigger;
}
