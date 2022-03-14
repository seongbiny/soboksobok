import React from "react";
import Avatar from "@mui/material/Avatar";

export default function FallbackAvatars() {
  return (
    <div>
      <Avatar sx={{ width: 112, height: 112 }} src="/broken-image.jpg" />
    </div>
  );
}
