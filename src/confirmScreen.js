import * as React from "react";
import { GuestDataContext } from "./context/guestDataContext";
import Divider from "@mui/material/Divider";
import ConfirmInfoBox from "./component/confirmInfoBox";

const ConfirmScreen = () => {
  const { confirmGuestStore } = React.useContext(GuestDataContext);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const images = [
    "https://lh3.googleusercontent.com/d/1r4Vp25__w9ao7af_WLf7mVd5AslctXwC",
    "https://lh3.googleusercontent.com/d/1ELSEEDP0i84UD4IjznhiUNcjfmqRz02f",
  ]; // Add your image URLs

  // Render all image components to prevent unnecessary image refetching
  const imageComponents = images.map((image, index) => (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "absolute",
        width: "100%",
        height: "100%",
        display: index === currentImageIndex ? "block" : "none",
      }}
    ></div>
  ));

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {imageComponents}
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {confirmGuestStore.Name && <ConfirmInfoBox />}
      </div>
    </div>
  );
};

export default ConfirmScreen;
