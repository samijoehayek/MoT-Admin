'use client';
import React, {useEffect} from "react";
import { Button } from "@mui/material";
import Link from "next/link";
// import { getUserByJWT } from "@/axios";
// import { useRouter } from "next/navigation";

export default function Home() {
  // const urlParams = new URLSearchParams(window.location.search);
  // const token = urlParams.get("token");
  // const router = useRouter();

  // useEffect(() => {
  //   getUserByJWT(token).then(() => {
  //     localStorage.setItem("token", token);
  //     document.cookie = `token=${token}`;
  //     router.push("/dashboard");
  //   }).catch((error) => {
  //     console.log("Login failed: ", error);
  //     router.push("/");
  //   });
  // }, []);

  return (
    <main className="min-h-screen flex justify-center items-center">
      <Link href="/dashboard">
        <Button
          size="large"
          sx={{
            mt: 3,
          }}
          type="submit"
          variant="contained"
        >
          Go To Admin Panel!
        </Button>
      </Link>
    </main>
  );
}
