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
import { UsersTable } from "../../../sections/users-table";
import { UsersSearch } from "../../../sections/users-search";
import { applyPagination } from "../../../utils/apply-pagination";
import {
  getAllRoles,
  getAllUsers,
  adminCreate,
  changeActivity,
  searchUserByName,
  updateUserTag,
  updateUserBalance,
  updateUserRole,
} from "@/axios";
import SnackbarComponent from "../../../components/snackbar-component/snackbar-component";

export default function Users() {
  const [allUsers, setAllUsers] = useState();
  const [allRoles, setAllRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [openUserModal, setOpenUserModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showSnackbar, setShowSnackbar] = useState({
    openFlag: false,
    message: "error",
    severity: "error",
  });
  const [toggleActivityModal, setToggleActivityModal] = useState(false);
  const [userActivityStatus, setUserActivityStatus] = useState();
  const [userRoleModal, setUserRoleModal] = useState(false);
  const [userTagModal, setUserTagModal] = useState(false);
  const [userBalanceModal, setUserBalanceModal] = useState(false);
  const [search, setSearch] = useState("");

  const useUsers = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(allUsers ? allUsers : [], page, rowsPerPage);
    }, [page, rowsPerPage, allUsers]);
  };

  const useUserIds = (users) => {
    return useMemo(() => {
      return users.map((users) => users.id);
    }, [users]);
  };

  const getUsers = async () => {
    const token = localStorage.getItem("token");
    const filter = JSON.stringify({ relations: ["role"] });
    const users = await getAllUsers(token, filter);
    setAllUsers(users);
  };

  const searchUsers = async (search) => {
    const token = localStorage.getItem("token");
    const users = await searchUserByName(token, search);
    setAllUsers(users);
  };

  const getRoles = async () => {
    const token = localStorage.getItem("token");
    const roles = await getAllRoles(token);
    setAllRoles(roles);
  };

  const users = useUsers(page, rowsPerPage);
  const usersIds = useUserIds(users);
  const usersSelection = useSelection(usersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const createUser = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(document.getElementById("emailAddress").value)) {
      setLoading(false);
      setShowSnackbar({
        openFlag: true,
        message: "Email must be valid",
        severity: "error",
      });
      throw new Error("Invalid email format");
    }
    const newUser = {
      email: document.getElementById("emailAddress").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      tag: document.getElementById("tag").value,
      roleId: selectedRole,
      isVerified: true,
    };

    adminCreate(newUser, token)
      .then((response) => {
        setAllUsers([
          ...allUsers,
          {
            id: response.data.id,
            username: newUser.username,
            email: newUser.email,
            role: { roleName: allRoles.find((role) => role.id === newUser.roleId).roleName },
            tag: newUser.tag,
            isActive: true,
            balance: response.data.balance,
          },
          // Add new user
        ]);
        setOpenUserModal(false);
        setLoading(false);
        setShowSnackbar({
          openFlag: true,
          message: "User Created Successfully",
          severity: "success",
        });
      })
      .catch((error) => {
        setOpenUserModal(false);
        setLoading(false);
        setShowSnackbar({
          openFlag: true,
          message: "Failed To Create User",
          severity: "error",
        });
      });
  };

  const toggleUserActivity = () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    const userId = usersSelection.selected[0].toString();
    changeActivity(!userActivityStatus, userId, token).then((response) => {
      const updatedUsers = allUsers.map((user) => {
        if (usersSelection.selected.includes(user.id)) {
          return {
            ...user,
            isActive: !userActivityStatus,
          };
        }
        return user;
      });
      setAllUsers(updatedUsers);
    });

    setToggleActivityModal(false);
    setUserActivityStatus(!userActivityStatus);
    setLoading(false);
    setShowSnackbar({
      openFlag: true,
      message: "User Activity Changed Successfully",
      severity: "success",
    });
  };

  const changeUserTag = () => {
    const token = localStorage.getItem("token");
    const tag = document.getElementById("tag").value;
    setLoading(true);
    const userId = usersSelection.selected[0].toString();
    updateUserTag(userId, tag, token).then((response) => {
      const updatedUsers = allUsers.map((user) => {
        if (usersSelection.selected.includes(user.id)) {
          return {
            ...user,
            tag: tag,
          };
        }
        return user;
      });
      setAllUsers(updatedUsers);
    });

    setUserTagModal(false);
    setLoading(false);
    setShowSnackbar({
      openFlag: true,
      message: "User Tag Changed Successfully",
      severity: "success",
    });
  };

  const changeUserBalance = () => {
    const token = localStorage.getItem("token");
    const balance = document.getElementById("balance").value;
    setLoading(true);
    const userId = usersSelection.selected[0].toString();
    updateUserBalance(userId, balance, token).then((response) => {
      const updatedUsers = allUsers.map((user) => {
        if (usersSelection.selected.includes(user.id)) {
          return {
            ...user,
            balance: balance,
          };
        }
        return user;
      });
      setAllUsers(updatedUsers);
    });

    setUserBalanceModal(false);
    setLoading(false);
    setShowSnackbar({
      openFlag: true,
      message: "User Balance Changed Successfully",
      severity: "success",
    });
  };

  const changeUserRole = () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    const userId = usersSelection.selected[0].toString();
    const roleId = selectedRole;
    updateUserRole(userId, roleId, token).then((response) => {
      const updatedUsers = allUsers.map((user) => {
        if (usersSelection.selected.includes(user.id)) {
          return {
            ...user,
            role: { roleName: allRoles.find((role) => role.id === roleId).roleName },
          };
        }
        return user;
      });
      setAllUsers(updatedUsers);
    });

    setUserRoleModal(false);
    setLoading(false);
    setShowSnackbar({
      openFlag: true,
      message: "User Role Changed Successfully",
      severity: "success",
    });
  };

  // Use Effects
  useEffect(() => {
    getUsers();
    getRoles();
  }, []);

  useEffect(() => {
    if (search) {
      searchUsers(search);
    } else {
      getUsers();
    }
  }, [search]);

  return (
    <>
      <Head>
        <title>Users</title>
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
                <Typography variant="h4">Users</Typography>
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
                  onClick={() => setOpenUserModal(true)}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <UsersSearch setSearch={setSearch} />
            <UsersTable
              count={allUsers?.length}
              items={users}
              onDeselectAll={usersSelection.handleDeselectAll}
              onDeselectOne={usersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={usersSelection.handleSelectAll}
              onSelectOne={usersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              setToggleActivityModal={setToggleActivityModal}
              setUserActivityStatus={setUserActivityStatus}
              setUserRoleModal={setUserRoleModal}
              setUserTagModal={setUserTagModal}
              setUserBalanceModal={setUserBalanceModal}
              selected={usersSelection.selected}
            />
          </Stack>
          <Dialog open={openUserModal} onClose={() => setOpenUserModal(false)}>
            <DialogTitle>
              <Typography color="primary" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Create User
              </Typography>
            </DialogTitle>
            <form method="POST" onSubmit={(e) => createUser(e)}>
              <DialogContent>
                <TextField
                  label="Email Address"
                  id="emailAddress"
                  style={{ marginBottom: "2vh" }}
                  fullWidth
                  required
                />
                <TextField
                  label="User Name"
                  id="username"
                  style={{ marginBottom: "2vh" }}
                  fullWidth
                  required
                />
                <TextField
                  label="Password"
                  id="password"
                  style={{ marginBottom: "2vh" }}
                  fullWidth
                  required
                />
                <TextField
                  label="Tag"
                  id="tag"
                  style={{ marginBottom: "2vh" }}
                  fullWidth
                  required
                />
                <FormControl fullWidth style={{ marginBottom: "2vh" }}>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    label="Role"
                    value={selectedRole}
                    onChange={handleRoleChange}
                    fullWidth
                    required
                  >
                    {allRoles?.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.roleName}
                      </MenuItem>
                    ))}
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
          <Dialog open={toggleActivityModal} onClose={() => setToggleActivityModal(false)}>
            <DialogTitle>
              <Typography color="primary" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Toggle User Activity
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Typography style={{ marginBottom: "2vh" }}>
                Are you sure you want to toggle the activity of the selected user?
              </Typography>
            </DialogContent>
            <DialogActions>
              {loading ? (
                <Button variant="contained" disabled={true}>
                  Toggle Activity
                </Button>
              ) : (
                <Button variant="contained" type="submit" onClick={() => toggleUserActivity()}>
                  Toggle Activity
                </Button>
              )}
            </DialogActions>
          </Dialog>

          <Dialog open={userTagModal} onClose={() => setUserTagModal(false)}>
            <DialogTitle>
              <Typography color="primary" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Change the Tag of the selected user
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Typography style={{ marginBottom: "2vh" }}>
                Only the admin can change the tag of the user
              </Typography>
            </DialogContent>
            <TextField
              label="New Tag"
              id="tag"
              name="newTag"
              type="string"
              style={{ width: "90%", maxWidth: "90%", margin: "auto", marginBottom: "10px" }}
            />
            <DialogActions>
              {loading ? (
                <Button variant="contained" disabled={true}>
                  Update Tag
                </Button>
              ) : (
                <Button variant="contained" type="submit" onClick={() => changeUserTag()}>
                  Update Tag
                </Button>
              )}
            </DialogActions>
          </Dialog>
          <Dialog open={userBalanceModal} onClose={() => setUserBalanceModal(false)}>
            <DialogTitle>
              <Typography color="primary" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Change the balance of the selected user
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Typography style={{ marginBottom: "2vh" }}>
                Balance of the user can only be positive
              </Typography>
            </DialogContent>
            <TextField
              label="New Balance"
              id="balance"
              name="newBalance"
              type="number"
              style={{ width: "90%", maxWidth: "90%", margin: "auto", marginBottom: "10px" }}
            />
            <DialogActions>
              {loading ? (
                <Button variant="contained" disabled={true}>
                  Update Balance
                </Button>
              ) : (
                <Button variant="contained" type="submit" onClick={() => changeUserBalance()}>
                  Update Balance
                </Button>
              )}
            </DialogActions>
          </Dialog>
          <Dialog open={userRoleModal} onClose={() => setUserRoleModal(false)}>
            <DialogTitle>
              <Typography color="primary" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Change the Role of the selected user
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Typography style={{ marginBottom: "2vh" }}>Can not choose the same role</Typography>
            </DialogContent>
            <Select
              label="New Role"
              id="role"
              value={selectedRole}
              onChange={handleRoleChange}
              fullWidth
              sx={{ width: "90%", maxWidth: "90%", margin: "auto", marginBottom: "10px" }}
            >
              {/* Here, replace "roles" with your array of available roles */}
              {allRoles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.roleName}
                </MenuItem>
              ))}
            </Select>{" "}
            <DialogActions>
              {loading ? (
                <Button variant="contained" disabled={true}>
                  Update Role
                </Button>
              ) : (
                <Button variant="contained" type="submit" onClick={() => changeUserRole()}>
                  Update Role
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  );
}
