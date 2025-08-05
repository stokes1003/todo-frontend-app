export const Header = () => {
  return (
    <div
      className="text-center mb-8 flex items-center justify-center"
      style={{ width: "100%", height: "200px", backgroundColor: "#0D0D0D" }}
    >
      <div className="flex items-center justify-center ">
        <div className="w-8 h-8 mr-3">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full"
            style={{ color: "#1E6F9F" }}
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 style={{ fontSize: "40px", fontWeight: 900 }}>
          <span style={{ color: "#4EA8DE" }}>Todo </span>
          <span style={{ color: "#5E60CE" }}>App</span>
        </h1>
      </div>
    </div>
  );
};
