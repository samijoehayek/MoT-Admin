"use client";

import React, { useEffect } from "react";
import { useCallback, useMemo, useState } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelection } from "../../../hooks/use-selection";
import { CollectableTable } from "../../../sections/collectable/collectable-table";
import { CollectableSearch } from "../../../sections/collectable/collectable-search";
import { applyPagination } from "../../../utils/apply-pagination";
import { getAllCollectables, searchCollectableByName, collectableCreate } from "@/axios";
import SnackbarComponent from "../../../components/snackbar-component/snackbar-component";

export default function Collectables() {
  const [allCollectables, setAllCollectables] = useState();
  const [selectedGender, setSelectedGender] = useState("");
  const [openCollectableModal, setOpenCollectableModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showSnackbar, setShowSnackbar] = useState({
    openFlag: false,
    message: "error",
    severity: "error",
  });
  const [search, setSearch] = useState("");

  const useCollectables = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(allCollectables ? allCollectables : [], page, rowsPerPage);
    }, [page, rowsPerPage, allCollectables]);
  };

  const useCollectableIds = (collectable) => {
    return useMemo(() => {
      return collectable.map((collectable) => collectable.id);
    }, [collectable]);
  };

  const getCollectables = async () => {
    const token = localStorage.getItem("token");
    const collectable = await getAllCollectables(token);
    setAllCollectables(collectable);
  };

  const searchCollectables = async (search) => {
    const token = localStorage.getItem("token");
    const collectable = await searchCollectableByName(search, token);
    setAllCollectables(collectable);
  };

  const collectable = useCollectables(page, rowsPerPage);
  const collectableIds = useCollectableIds(collectable);
  const collectableSelection = useSelection(collectableIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  console.log(allCollectables)

  const createCollectable = (e) => {
    // To make sure that the one creating the collectable is an admin
    const token = localStorage.getItem("token");
    e.preventDefault();
    setLoading(true);
    const nameRegex = /^[^\d\W][a-zA-Z0-9]*$/;

    if (!nameRegex.test(document.getElementById("name").value)) {
      setLoading(false);
      setShowSnackbar({
        openFlag: true,
        message: "Name must start with a letter and can only contain alphanumeric characters",
        severity: "error",
      });
      throw new Error("Invalid name format");
    }

    // Make sure that the value is a number
    const integerRegex = /^\d+$/;

    if (!integerRegex.test(document.getElementById("value").value)) {
      setLoading(false);
      setShowSnackbar({
        openFlag: true,
        message: "Value must be a valid integer number",
        severity: "error",
      });
      throw new Error("Invalid value format");
    }

    const newCollectable = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      value: document.getElementById("value").value,
    };

    collectableCreate(newCollectable, token)
      .then((response) => {
        setAllCollectables([
          ...allCollectables,
          {
            id: response.data.id,
            name: newCollectable.name,
            gender: newCollectable.gender,
            model: response.data.model,
          },
          // Add new collectable
        ]);
        setOpenCollectableModal(false);
        setLoading(false);
        setShowSnackbar({
          openFlag: true,
          message: "Collectable Created Successfully",
          severity: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        setOpenCollectableModal(false);
        setLoading(false);
        setShowSnackbar({
          openFlag: true,
          message: "Failed To Create Collectable",
          severity: "error",
        });
      });
  };

  // Use Effects
  useEffect(() => {
    getCollectables();
  }, []);

  useEffect(() => {
    if (search) {
      searchCollectables(search);
    } else {
      getCollectables();
    }
  }, [search]);

  return (
    <>
      <Head>
        <title>Collectables</title>
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
                <Typography variant="h4">Collectables</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => setOpenCollectableModal(true)}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CollectableSearch setSearch={setSearch} />
            <CollectableTable
              count={allCollectables?.length}
              items={collectable}
              onDeselectAll={collectableSelection.handleDeselectAll}
              onDeselectOne={collectableSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={collectableSelection.handleSelectAll}
              onSelectOne={collectableSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={collectableSelection.selected}
            />
          </Stack>
          <Dialog open={openCollectableModal} onClose={() => setOpenCollectableModal(false)}>
            <DialogTitle>
              <Typography color="primary" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Create Collectable - Approved by Unity Team
              </Typography>
            </DialogTitle>
            <form method="POST" onSubmit={(e) => createCollectable(e)}>
              <DialogContent>
                <TextField
                  label="Name"
                  id="name"
                  style={{ marginBottom: "2vh" }}
                  fullWidth
                  required
                />
                <TextField
                  label="Description"
                  id="description"
                  style={{ marginBottom: "2vh" }}
                  fullWidth
                  required
                />
                <TextField
                  label="Value"
                  id="value"
                  style={{ marginBottom: "2vh" }}
                  fullWidth
                  required
                />
              </DialogContent>
              <DialogActions>
                {loading ? (
                  <Button variant="contained" disabled={true}>
                    Create
                  </Button>
                ) : (
                  <Button variant="contained" type="submit">
                    Create
                  </Button>
                )}
              </DialogActions>
            </form>
          </Dialog>
        </Container>
      </Box>
    </>
  );
}
