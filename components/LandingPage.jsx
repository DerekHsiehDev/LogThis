import React, { useEffect } from "react";
import { useUser } from "../context/user";
import { Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

function LandingPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  useEffect(() => {

      if (user === null) {
        const noredirect = queryParams.get("noredirect")
        if(noredirect == true) {
          router.push("/")
        } else {
          window.location.replace("https://mt-landing-tau.vercel.app");
        }
        
      } else {
        router.push("/");
      }
  },[user]);
  return (
    <Center>
      <Spinner />
    </Center>
  );
}

export default LandingPage;
