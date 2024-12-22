import * as React from "react";
import Divider from "@mui/material/Divider";
import { GuestDataContext } from "../context/guestDataContext";
import NumberDisplay from "./numberDisplay";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import StrollerOutlinedIcon from "@mui/icons-material/StrollerOutlined";

export default function ConfirmInfoBox(zoom) {
  const { confirmGuestStore } = React.useContext(GuestDataContext);
  return (
    <div style={{ zoom: zoom ? zoom : "100%" }}>
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
          <div
            style={{
              color: "#333",
              fontSize: "36px",
            }}
          >
            桌號
          </div>
          <div
            style={{
              margin: "12px 0 0 0",
              fontWeight: "600",
              fontSize: "56px",
            }}
          >
            {confirmGuestStore.TableNo.join(", ")}
          </div>
        </div>
        <div
          style={{
            marginTop: "48px",
            display: "flex",
            gap: "16px",
          }}
        >
          <NumberDisplay
            icon={
              <Groups2OutlinedIcon
                fontSize="inherit"
                style={{ verticalAlign: "middle" }}
              />
            }
            title={"總人數"}
            number={
              confirmGuestStore.NoOfRegular +
              confirmGuestStore.NoOfVegetarian +
              confirmGuestStore.NoOfChildren
            }
          />
          <NumberDisplay
            icon={
              <SpaOutlinedIcon
                fontSize="inherit"
                style={{ verticalAlign: "middle" }}
              />
            }
            title={"素食"}
            number={confirmGuestStore.NoOfVegetarian}
          />
          <NumberDisplay
            icon={
              <StrollerOutlinedIcon
                fontSize="inherit"
                style={{ verticalAlign: "middle" }}
              />
            }
            title={"兒童椅"}
            number={confirmGuestStore.NoOfChildren}
          />
        </div>
      </div>
    </div>
  );
}
