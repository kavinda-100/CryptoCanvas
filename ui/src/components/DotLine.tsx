"use client";

import React from "react";
import { cn } from "../lib/utils";

const DotLine = ({ length }: { length: number }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex >= length) {
      setCurrentIndex(0);
    }
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, length]);
  return (
    <div className={"my-2 h-fit w-full"}>
      <div className={"flex items-center gap-1 overflow-x-hidden"}>
        {Array.from({ length: length }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "my-2 h-[6px] w-full rounded-full bg-gray-600 transition-colors duration-300 ease-in-out",
              {
                "bg-gradient-to-r from-green-400 via-green-300 to-yellow-200":
                  currentIndex === index,
              },
            )}
          />
        ))}
      </div>
    </div>
  );
};
export default DotLine;
