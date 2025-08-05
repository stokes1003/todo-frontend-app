import { PiRocketBold } from "react-icons/pi";

export const Header = () => {
  return (
    <div
      className="text-center mb-8 flex items-center justify-center"
      style={{ width: "100%", height: "200px", backgroundColor: "#0D0D0D" }}
    >
      <div className="flex items-center justify-center ">
        <PiRocketBold className="mr-2" size={32} style={{ color: "#4EA8DE" }} />

        <h1 style={{ fontSize: "40px", fontWeight: 900 }}>
          <span style={{ color: "#4EA8DE" }}>Todo </span>
          <span style={{ color: "#5E60CE" }}>App</span>
        </h1>
      </div>
    </div>
  );
};
