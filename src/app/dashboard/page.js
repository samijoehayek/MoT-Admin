"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { set, subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { OverviewRevenue } from "../../sections/overview/overview-revenue";
import { OverviewLatestOrders } from "../../sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "../../sections/overview/overview-latest-products";
import { OverviewLocation } from "../../sections/overview/overview-location";
import { OverviewTasksProgress } from "../../sections/overview/overview-tasks-progress";
import { OverviewTotalUsers } from "../../sections/overview/overview-total-users";
import { OverviewTotalOwnerships } from "../../sections/overview/overview-total-ownerships";
import { OverviewTraffic } from "../../sections/overview/overview-traffic";
import { getUserCount, userIsAdmin } from "@/axios";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [userCount, setUserCount] = useState(null);
  const router = useRouter();

  // Functions
  const userNumber = async () => {
    const token = localStorage.getItem("token");
    const count = await getUserCount(token);
    if (!count) {
      throw new Error("Failed to fetch data");
    }
    setUserCount(count);
  };

  const isAdmin = async () => {
    const token = localStorage.getItem("token");
    const admin = await userIsAdmin(token);
  };

  // Use Effects
  useEffect(() => {
    isAdmin()
      .then(() => {
        userNumber();
      })
      .catch((error) => {
        localStorage.removeItem("token");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/login");
      });
  }, []);

  return (
    <>
      <Head>
        <title>Overview</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalUsers
                // difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value={userCount ? userCount.toString() : ""}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewRevenue
                // difference={12}
                positive
                sx={{ height: "100%" }}
                value="$24k"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalOwnerships sx={{ height: "100%" }} value="15k" />
            </Grid>
            {/* <Grid xs={12} sm={6} lg={3}>
              <OverviewTasksProgress sx={{ height: "100%" }} value={75.5} />
            </Grid> */}
            <Grid xs={12} lg={8}>
              <OverviewLocation
                chartSeries={[
                  {
                    name: "This year",
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  // {
                  //   name: "Last year",
                  //   data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  // },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                chartSeries={[63, 15, 22]}
                labels={["Desktop", "Tablet", "Phone"]}
                sx={{ height: "100%" }}
              />
            </Grid>
            {/* <Grid xs={12} md={6} lg={4}>
              <OverviewLatestProducts
                products={[
                  {
                    id: "5ece2c077e39da27658aa8a9",
                    image: "/assets/products/product-1.png",
                    name: "Healthcare Erbology",
                    updatedAt: subHours(now, 6).getTime(),
                  },
                  {
                    id: "5ece2c0d16f70bff2cf86cd8",
                    image: "/assets/products/product-2.png",
                    name: "Makeup Lancome Rouge",
                    updatedAt: subDays(subHours(now, 8), 2).getTime(),
                  },
                  {
                    id: "b393ce1b09c1254c3a92c827",
                    image: "/assets/products/product-5.png",
                    name: "Skincare Soja CO",
                    updatedAt: subDays(subHours(now, 1), 1).getTime(),
                  },
                  {
                    id: "a6ede15670da63f49f752c89",
                    image: "/assets/products/product-6.png",
                    name: "Makeup Lipstick",
                    updatedAt: subDays(subHours(now, 3), 3).getTime(),
                  },
                  {
                    id: "bcad5524fe3a2f8f8620ceda",
                    image: "/assets/products/product-7.png",
                    name: "Healthcare Ritual",
                    updatedAt: subDays(subHours(now, 5), 6).getTime(),
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid> */}
            {/* <Grid xs={12} md={12} lg={8}>
              <OverviewLatestOrders
                orders={[
                  {
                    id: "f69f88012978187a6c12897f",
                    ref: "DEV1049",
                    amount: 30.5,
                    user: {
                      name: "Ekaterina Tankova",
                    },
                    createdAt: 1555016400000,
                    status: "pending",
                  },
                  {
                    id: "9eaa1c7dd4433f413c308ce2",
                    ref: "DEV1048",
                    amount: 25.1,
                    user: {
                      name: "Cao Yu",
                    },
                    createdAt: 1555016400000,
                    status: "delivered",
                  },
                  {
                    id: "01a5230c811bd04996ce7c13",
                    ref: "DEV1047",
                    amount: 10.99,
                    user: {
                      name: "Alexa Richardson",
                    },
                    createdAt: 1554930000000,
                    status: "refunded",
                  },
                  {
                    id: "1f4e1bd0a87cea23cdb83d18",
                    ref: "DEV1046",
                    amount: 96.43,
                    user: {
                      name: "Anje Keizer",
                    },
                    createdAt: 1554757200000,
                    status: "pending",
                  },
                  {
                    id: "9f974f239d29ede969367103",
                    ref: "DEV1045",
                    amount: 32.54,
                    user: {
                      name: "Clarke Gillebert",
                    },
                    createdAt: 1554670800000,
                    status: "delivered",
                  },
                  {
                    id: "ffc83c1560ec2f66a1c05596",
                    ref: "DEV1044",
                    amount: 16.76,
                    user: {
                      name: "Adam Denisov",
                    },
                    createdAt: 1554670800000,
                    status: "delivered",
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
