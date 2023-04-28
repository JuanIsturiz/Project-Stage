const LoadingProjects = () => {
  return (
    <>
      {Array(4)
        .fill(null)
        .map((_, idx) => (
          <div
            key={idx}
            className="basis-48 cursor-pointer px-4 py-5 bg-white rounded-xl shadow-md animate-pulse duration-75 md:mb-3"
            style={{ animationDelay: `${idx * 200}ms` }}
          />
        ))}
    </>
  );
};

export default LoadingProjects;
