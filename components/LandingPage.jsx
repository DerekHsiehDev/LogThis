import React, { useEffect } from "react";
import { Spinner } from "@chakra-ui/react";

function LandingPage() {
  useEffect(() => {
    setTimeout(() => {
      window.location.replace("https://mt-landing-tau.vercel.app");
    });
  });
  return <Spinner />;
}

export default LandingPage;
