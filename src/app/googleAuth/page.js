"use client";

import React, { useState } from "react";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Box, Button, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { login } from "@/axios";
import Image from "next/image";


export default function GoogleAuth(props) {
  const router = useRouter();
  const redirect = async () => {
    router.push(`${process.env.NEXT_PUBLIC_API_HOST}/auth/oAuth`);
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box
        sx={{
          //   backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login with google</Typography>
            </Stack>
            <div onClick={redirect} className="w-80 flex items-center p-2 bg-secondary-dark rounded-lg cursor-pointer border border-gray-300">
              <Image
                width={26}
                height={26}
                alt="google-icon"
                src="/images/googleicon.svg"
              />
              <p className="flex justify-center w-full mb-0 font-normal text-base text-white">Log In with Google</p>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}
