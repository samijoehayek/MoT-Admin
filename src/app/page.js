'use client';
import React, {useEffect} from "react";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
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
