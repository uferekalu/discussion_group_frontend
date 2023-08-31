import React, { useEffect } from "react";

const HeaderShrinker = () => {
  useEffect(() => {
    window.addEventListener("scroll", () => shrinkHeader(), false);

    return () => {
      window.removeEventListener("scroll", () => shrinkHeader());
    };
  }, []);

  const shrinkHeader = () => {
    const DISTANCE_FROM_TOP = 140;
    const navElement = document.getElementById("navbar") as HTMLElement;
    const logoElement = document.getElementById("logo") as HTMLElement;
    const togglebar = document.getElementById("togglebar") as HTMLElement;
    const availScreenWidth = window.screen.availWidth;
    const scrollY =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (scrollY > DISTANCE_FROM_TOP && availScreenWidth > 639) {
      navElement.style.transition = "height 200ms ease-in";
      navElement.style.height = "80px";
      logoElement.style.transition = "height 200ms ease-in";
      logoElement.style.height = "2rem";
    } else {
      navElement.style.height = "100px";
    }
  };
};

export { HeaderShrinker };
