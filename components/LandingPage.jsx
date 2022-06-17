import React, { useEffect } from "react";
import { useUser } from "../context/user";
import { Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

function LandingPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      if (user === null && loading === false) {
        window.location.replace("https://mt-landing-tau.vercel.app");
      } else {
        router.push("/");
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
