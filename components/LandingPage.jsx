import React, { useEffect } from "react";
import { useUser } from "../context/user";
import { Center, Spinner } from "@chakra-ui/react";

function LandingPage() {
  const { user, loading } = useUser();
  useEffect(() => {
    setTimeout(() => {
      console.log(user);

      if (user === null && loading === false && !user._id) {
        window.location.replace("https://mt-landing-tau.vercel.app");
      }
    }, 3000);
  });
  return (
    <Center>
      <Spinner />
    </Center>
  );
}

export default LandingPage;
