import React from "react";
import bannerVideo from "./banner.mp4";

export default function CenterVideo() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '350px',
      width: '100%',
    }}>
      <video
        src={bannerVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "80%",
          maxWidth: "600px",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(24,90,157,0.18)"
        }}
      />
    </div>
  );
}
