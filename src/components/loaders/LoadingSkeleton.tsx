import { FC } from "react";

const LoadingSkeleton: FC<{ qty: number }> = ({ qty }) => {
  return (
    <>
      {Array(qty)
        .fill(null)
        .map((_, idx) => (
          <div
            key={idx}
            className="cursor-pointer px-4 py-5 bg-white rounded-xl shadow-md animate-pulse duration-75 md:mb-3 dark:bg-zinc-800"
            style={{ animationDelay: `${idx * 200}ms` }}
          />
        ))}
    </>
  );
};

export default LoadingSkeleton;
