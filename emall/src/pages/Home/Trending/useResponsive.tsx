import React, { useCallback, useEffect } from "react";

export const useResponsive = () => {
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [windowHeight, setWindowHeight] = React.useState(0);
  const [screenType, setScreenType] = React.useState("INITIAL");

  const updateWindowDimensions = useCallback(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    if (window.innerWidth > 1300) {
      setScreenType("DESKTOP");
    } else if (window.innerWidth <= 1300 && windowWidth > 768) {
      setScreenType("TABLET");
    } else {
      setScreenType("MOBILE");
    }
  }, [windowWidth]);

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);

    return function cleanup() {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, [updateWindowDimensions]);

  return {
    windowWidth,
    windowHeight,
    screenType
  };
};
