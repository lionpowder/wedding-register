import { Box } from "@mui/material";
import * as React from "react";

export default function NumberDisplay({ title, icon, number }) {
  return (
    <Box
      sx={{
        borderStyle: "solid",
        borderWidth: "4px",
        borderRadius: "15px",
        boxSizing: "border-box",
        fontSize: "24px",
        width: "140px",
        borderColor: (theme) => theme.palette.primary.main,
      }}
    >
      <Box
        sx={{
          borderRadius: "11px 11px 0 0",
          height: "48px",
          lineHeight: "36px",
          textAlign: "center",
          color: "#FFFFFF",
          backgroundColor: (theme) => theme.palette.primary.main,
        }}
      >
        {icon}
        <span style={{ verticalAlign: "middle", marginLeft: "8px" }}>
          {title}
        </span>
      </Box>
      <Box
        sx={{
          height: "60px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: "100%",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          {number}
        </div>
      </Box>
    </Box>
  );
}
