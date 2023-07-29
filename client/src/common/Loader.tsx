import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface LoaderProps {
  className?: string;
}

export default function Loader(props: LoaderProps) {
  const [circleHeight, setCircleHeight] = useState(0);

  return (
    <div
      className={twMerge(
        "flex justify-between items-center min-w-[3rem]",
        props.className
      )}
      style={{ height: circleHeight * 4 }}
    >
      {[1, 2, 3].map((i) => (
        <Circle key={i} count={i} setCircleHeight={setCircleHeight} />
      ))}
    </div>
  );
}
function Circle(props: {
  setCircleHeight: React.Dispatch<React.SetStateAction<number>>;
  count: number;
}) {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    props.setCircleHeight(ref.current.clientHeight);
  }, []);

  return (
    <div
      ref={ref}
      className="w-[20%] aspect-square rounded-full"
      style={{
        animation: `loader-move 1200ms linear ${
          props.count * 200 + 50 * (props.count - 1)
        }ms infinite, loader-color-cycle 2579ms infinite`,
      }}
    />
  );
}
