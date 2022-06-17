import React, { useEffect } from "react";
import { useUser } from "../context/user";
import { Center, Spinner } from "@chakra-ui/react";

function LandingPage() {
  const { user } = useUser();
  useEffect(() => {
    setTimeout(() => {
      if (user === null) {
        window.location.replace("https://mt-landing-tau.vercel.app");
      }
    }, 1000);
  });
  return (
    <Center>
      <Spinner />
    </Center>
  );
}

export default LandingPage;
