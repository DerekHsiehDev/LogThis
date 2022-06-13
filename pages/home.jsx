import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useUser } from "../context/user";
import { Button } from "@chakra-ui/react";
// import { Button } from "chakra-ui/react";

function Home() {
  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/auth");
    }
  }, []);

  return (
    <div>
      <Button
        onClick={() => {
          setUser(null);
          console.log(user);
          router.push("/");
        }}
      >
        Log out
      </Button>
    </div>
  );
}

export default Home;
