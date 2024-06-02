import React, { useEffect, useRef } from "react";

const TwitchPlayer = ({ channel, className }) => {
  const twitchPlayerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.twitch.tv/embed/v1.js";
    script.async = true;

    const loadTwitchPlayer = () => {
      new window.Twitch.Player(twitchPlayerRef.current, {
        channel,
        layout: "video",
        muted: true,
        width: 800,
        height: 450,
      });
    };

    if (!window.Twitch) {
      // If Twitch object is not available, load the script first
      script.onload = loadTwitchPlayer;
      document.body.appendChild(script);
    } else {
      // If Twitch object is already available, directly load the player
      loadTwitchPlayer();
    }

    // Clean up function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [channel]);

  return (
    <div id="twitch-player" className={className} ref={twitchPlayerRef}></div>
  );
};

export default TwitchPlayer;
