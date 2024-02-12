"use client";
import Navbar from "../../components/navbar/navbar";
import { useState, useEffect } from "react";
import Sidenav from "../../components/sidenav/sidenav";
import { styled } from "@mui/material/styles";
import { getUserByJWT } from "@/axios";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

export default function DashboardLayout({ children }) {
  // Use States
  const [openNav, setOpenNav] = useState(false);
  const [user, setUser] = useState(null);

  // Functions
  const getUser = async () => {
    const token = localStorage.getItem("token");
    const filter = JSON.stringify({relations:["role"]})
    const user = await getUserByJWT(token, filter);
    if(!user) {
      throw new Error ("Failed to fetch data")
    }
    setUser(user);
  }

  // Use Effects
  useEffect(() => {
    getUser()
  }, [])

  return (
    <div>
      <Navbar onNavOpen={() => setOpenNav(true)} user={user}/>
      <Sidenav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </div>
  );
}
