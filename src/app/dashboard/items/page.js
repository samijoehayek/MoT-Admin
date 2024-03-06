"use client";

import React from "react";
import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useSelection } from "../../../hooks/use-selection";
import { ItemsTable } from "../../../sections/items/items-table";
import { ItemsSearch } from "../../../sections/items/items-search";
import { applyPagination } from "../../../utils/apply-pagination";
import { getAllItems, updateItemPrice, searchItemByName } from "@/axios";
import SnackbarComponent from "../../../components/snackbar-component/snackbar-component";

export default function Items() {
  const [allItems, setAllItems] = useState();
  const [search, setSearch] = useState("");
  const [itemPriceModal, setItemPriceModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState({
    openFlag: false,
    message: "error",
    severity: "error",
  });

  const getItems = async () => {
    const token = localStorage.getItem("token");
    const items = await getAllItems(token);
    setAllItems(items);
  };

  const searchItems = async (search) => {
    const token = localStorage.getItem("token");
    const item = await searchItemByName(token, search);
    setAllItems(item);
  };

  const useItems = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(allItems ? allItems : [], page, rowsPerPage);
    }, [page, rowsPerPage, allItems]);
  };

  const useItemIds = (items) => {
    return useMemo(() => {
      return items.map((item) => item.id);
    }, [items]);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const items = useItems(page, rowsPerPage);
  const itemsIds = useItemIds(items);
  const itemsSelection = useSelection(itemsIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const changeItemPrice = () => {
    const token = localStorage.getItem("token");
    const itemPrice = document.getElementById("price").value;
    setLoading(true);
    const itemId = itemsSelection.selected[0].toString();
    updateItemPrice(itemId, itemPrice, token).then((response) => {
      const updateItems = allItems.map((item) => {
        if (itemsSelection.selected.includes(item.id)) {
          return {
            ...item,
            price: itemPrice,
          };
        }
        return item;
      });
      setAllItems(updateItems);
    });
    setItemPriceModal(false);
    setLoading(false);
    setShowSnackbar({
      openFlag: true,
      message: "Item Price Changed Successfully",
      severity: "success",
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (search) {
      searchItems(search);
    } else {
      getItems();
    }
  }, [search]);

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
        <SnackbarComponent
          openFlag={showSnackbar.openFlag}
          message={showSnackbar.message}
          severity={showSnackbar.severity}
          onClose={() => {
            setShowSnackbar({
              openFlage: false,
              message: "error",
              severity: "error",
            });
          }}
        />
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
              {/* <div>
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
              </div> */}
            </Stack>
            <ItemsSearch setSearch={setSearch} />
            <ItemsTable
              count={allItems?.length}
              items={items}
              onDeselectAll={itemsSelection.handleDeselectAll}
              onDeselectOne={itemsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={itemsSelection.handleSelectAll}
              onSelectOne={itemsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              setItemPriceModal={setItemPriceModal}
              selected={itemsSelection.selected}
            />
          </Stack>
          <Dialog open={itemPriceModal} onClose={() => setItemPriceModal(false)}>
            <DialogTitle>
              <Typography color="primary" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Change the price of the selected item
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Typography style={{ marginBottom: "2vh" }}>Item price should be positive</Typography>
            </DialogContent>
            <TextField
              label="New Price"
              id="price"
              name="newPrice"
              type="number"
              style={{ width: "90%", maxWidth: "90%", margin: "auto", marginBottom: "10px" }}
            />
            <DialogActions>
              {loading ? (
                <Button variant="contained" disabled={true}>
                  Update Price
                </Button>
              ) : (
                <Button variant="contained" type="submit" onClick={() => changeItemPrice()}>
                  Update Price
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  );
}
