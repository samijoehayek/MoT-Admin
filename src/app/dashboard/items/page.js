"use client";

import React from "react";
import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "../../../hooks/use-selection";
import { ItemsTable } from "../../../sections/items/items-table";
import { ItemsSearch } from "../../../sections/items/items-search";
import { applyPagination } from "../../../utils/apply-pagination";

export default function Items() {
  const data = [
    {
      id: "cdb45661-ceea-40c2-8cd2-f5aee508846d",
      itemName: "Saudi Camel",
      itemNumber: 25,
      itemRarity: 1,
      itemsLeft: 25,
      createdAt: "2024-02-05T15:20:35.707Z",
      createdBy: null,
      updatedAt: "2024-02-05T15:20:35.707Z",
      updatedBy: null,
    },
    {
      id: "cdb5661-ceea-40c2-8cd2-f5aee508846d",
      itemName: "Saudi Camel",
      itemNumber: 25,
      itemRarity: 1,
      itemsLeft: 25,
      createdAt: "2024-02-05T15:20:35.707Z",
      createdBy: null,
      updatedAt: "2024-02-05T15:20:35.707Z",
      updatedBy: null,
    },
    {
      id: "cdb45661-ceea-40c2-cd2-f5aee508846d",
      itemName: "Saudi Camel",
      itemNumber: 25,
      itemRarity: 1,
      createdAt: "2024-02-05T15:20:35.707Z",
      createdBy: null,
      updatedAt: "2024-02-05T15:20:35.707Z",
      updatedBy: null,
    },
    {
      id: "cdb45661-ceea-40c2-8c2-f5aee508846d",
      itemName: "Saudi Camel",
      itemNumber: 25,
      itemRarity: 1,
      createdAt: "2024-02-05T15:20:35.707Z",
      createdBy: null,
      updatedAt: "2024-02-05T15:20:35.707Z",
      updatedBy: null,
    },
    {
      id: "cdb45661-ceea-40c2-8cd2-f5aee50886d",
      itemName: "Saudi Camel",
      itemNumber: 25,
      itemRarity: 1,
      createdAt: "2024-02-05T15:20:35.707Z",
      createdBy: null,
      updatedAt: "2024-02-05T15:20:35.707Z",
      updatedBy: null,
    },
  ];

  const useCustomers = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(data, page, rowsPerPage);
    }, [page, rowsPerPage]);
  };

  const useCustomerIds = (customers) => {
    return useMemo(() => {
      return customers.map((customer) => customer.id);
    }, [customers]);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Items</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Items</Typography>
                {/* <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack> */}
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <ItemsSearch />
            <ItemsTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
}
