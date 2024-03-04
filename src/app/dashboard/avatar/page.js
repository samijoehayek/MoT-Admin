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
import { AvatarTable } from "../../../sections/avatar/avatar-table";
import { AvatarSearch } from "../../../sections/avatar/avatar-search";
import { applyPagination } from "../../../utils/apply-pagination";
import {getAllAvatars, searchAvatarByName, avatarCreate } from "@/axios";
import SnackbarComponent from "../../../components/snackbar-component/snackbar-component";

export default function Avatars() {
  const [allAvatars, setAllAvatars] = useState();
  const [selectedGender, setSelectedGender] = useState("");
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showSnackbar, setShowSnackbar] = useState({
    openFlag: false,
    message: "error",
    severity: "error",
  });
  const [search, setSearch] = useState("");

  const useAvatars = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(allAvatars ? allAvatars : [], page, rowsPerPage);
    }, [page, rowsPerPage, allAvatars]);
  };

  const useAvatarIds = (avatar) => {
    return useMemo(() => {
      return avatar.map((avatar) => avatar.id);
    }, [avatar]);
  };

  const getAvatars = async () => {
    const token = localStorage.getItem("token");
    const avatar = await getAllAvatars(token);
    setAllAvatars(avatar);
  };

  const searchAvatars = async (search) => {
    const token = localStorage.getItem("token");
    const avatar = await searchAvatarByName(token, search);
    setAllAvatars(avatar);
  };

  const avatar = useAvatars(page, rowsPerPage);
  const avatarIds = useAvatarIds(avatar);
  const avatarSelection = useSelection(avatarIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const createAvatar = (e) => {

    // To make sure that the one creating the avatar is an admin
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
    const newAvatar = {
      name: document.getElementById("name").value,
      gender: selectedGender,
    };

    avatarCreate(newAvatar, token)
      .then((response) => {
        setAllAvatars([
          ...allAvatars,
          {
            id: response.data.id,
            name: newAvatar.name,
            gender: newAvatar.gender,
            model: response.data.model,
          },
          // Add new avatar
        ]);
        setOpenAvatarModal(false);
        setLoading(false);
        setShowSnackbar({
          openFlag: true,
          message: "Avatar Created Successfully",
          severity: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        setOpenAvatarModal(false);
        setLoading(false);
        setShowSnackbar({
          openFlag: true,
          message: "Failed To Create Avatar",
          severity: "error",
        });
      });
  };

  // Use Effects
  useEffect(() => {
    getAvatars();
  }, []);

  useEffect(() => {
    if(search) {
      searchAvatars(search);
    }else{
      getAvatars();
    }
    
  }, [search]);

  return (
    <>
      <Head>
        <title>Avatars</title>
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
                <Typography variant="h4">Avatars</Typography>
              </Stack>
              {/* <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => setOpenAvatarModal(true)}
                >
                  Add
                </Button>
              </div> */}
            </Stack>
            <AvatarSearch setSearch={setSearch} />
            <AvatarTable
              count={allAvatars?.length}
              items={avatar}
              onDeselectAll={avatarSelection.handleDeselectAll}
              onDeselectOne={avatarSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={avatarSelection.handleSelectAll}
              onSelectOne={avatarSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={avatarSelection.selected}
            />
          </Stack>
          <Dialog open={openAvatarModal} onClose={() => setOpenAvatarModal(false)}>
            <DialogTitle>
              <Typography color="primary" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Create Avatar - Approved by Unity Team
              </Typography>
            </DialogTitle>
            <form method="POST" onSubmit={(e) => createAvatar(e)}>
              <DialogContent>
                <TextField
                  label="Name"
                  id="name"
                  style={{ marginBottom: "2vh" }}
                  fullWidth
                  required
                />
                <FormControl fullWidth style={{ marginBottom: "2vh" }}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    label="Gender"
                    value={selectedGender}
                    onChange={handleGenderChange}
                    fullWidth
                    required
                  >
                    <MenuItem key={1} value={"male"}>
                      Male
                    </MenuItem>
                    <MenuItem key={2} value={"female"}>
                      Female
                    </MenuItem>
                  </Select>
                </FormControl>
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
