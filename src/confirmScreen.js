import * as React from "react";
import { GuestDataContext } from "./context/guestDataContext";
import Divider from "@mui/material/Divider";

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
    "https://lh3.googleusercontent.com/drive-viewer/AEYmBYRo7dSNI61lxR3eWJV54iigGEXNcdf7ctlDhXrgCz0Br2lavYUGwkRPvFpwKxOpWnooK9kFqvdHSAT2P2HzModJyruL2g=s1600",
    "https://lh3.googleusercontent.com/drive-viewer/AEYmBYRMOQiALxaWt9YFZ5lCGf0lLpy-hp5a-E8TT4JS2ezrbLe4ZBu9AxubYMQuK7TnBhYWDaZx9lp7_nOW7yf1kfRNHuU6kg=s1600",
    "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQ53bCrD_FLxVniVAxIozfIRoeCH_MG0NjtR9Ker5Wuow3ZE82BC7QDVqeaFNTfLPYP2rZ8DSDwqdqNmtteCFAEyOGGmg=s1600",
  ]; // Add your image URLs

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {confirmGuestStore.Name && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              padding: "48px",
              borderRadius: "10px",
              fontSize: "48px",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                fontSize: "64px",
                margin: 0,
                marginBottom: "16px",
              }}
            >
              {confirmGuestStore.Name.join(", ")}
            </h2>
            <Divider />
            <div
              style={{
                marginTop: "48px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  margin: "24px 0 0 0 ",
                }}
              >
                {confirmGuestStore.TableNo.join(", ")}
              </p>
              <p
                style={{
                  margin: "8px 0 0 0 ",
                  color: "#333",
                }}
              >
                桌號
              </p>
            </div>
            <div
              style={{
                marginTop: "48px",
              }}
            >
              <p
                style={{
                  margin: "24px 0 0 0 ",
                  textAlign: "center",
                }}
              >
                總人數:{" "}
                {confirmGuestStore.NoOfRegular +
                  confirmGuestStore.NoOfVegetarian +
                  confirmGuestStore.NoOfChildren}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "36px",
                  justifyContent: "center",
                  fontSize: "36px",
                  color: "#333",
                }}
              >
                <p
                  style={{
                    margin: "24px 0 0 0 ",
                  }}
                >
                  素食人數: {confirmGuestStore.NoOfVegetarian}
                </p>
                <p
                  style={{
                    margin: "24px 0 0 0 ",
                  }}
                >
                  兒童椅: {confirmGuestStore.NoOfChildren}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmScreen;
