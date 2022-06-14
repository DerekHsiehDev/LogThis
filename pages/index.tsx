import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FaRegEnvelope } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { useState, useEffect, useLayoutEffect } from "react";
import HomeView from "../components/HomeView";
import { useRouter } from "next/router";
import { useUser } from "../context/user";
import { Flex } from "@chakra-ui/react";
import { PageProvider } from "../context/page";

const Home: NextPage = () => {
  const { user, setUser } = useUser();
  const router = useRouter();

  return user ? (
    <PageProvider>
      <HomeView>{}</HomeView>
    </PageProvider>
  ) : (
    <div>landing view</div>
  );
};

export default Home;
