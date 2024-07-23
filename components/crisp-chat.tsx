"use client";

import { Crisp } from "crisp-sdk-web";

import { useEffect } from "react";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("aace4c02-a2aa-4d3c-b689-319754ca7bcb");
  }, []);
  return null;
};
