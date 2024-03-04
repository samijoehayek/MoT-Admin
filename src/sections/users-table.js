"use client";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
// import { Scrollbar } from '../components/scrollbar/scrollbar';
import { getInitials } from "../utils/get-initials";

export const UsersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    setToggleActivityModal,
    setUserActivityStatus,
    setUserRoleModal,
    setUserBalanceModal,
    setUserTagModal,
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  const toggleIsActive = (isActive) => {
    if (selected.length == 1) {
      setUserActivityStatus(isActive);
      setToggleActivityModal(true);
    }
  };

  const changeUserRole = () => {
    if (selected.length == 1) {
      setUserRoleModal(true);
    }
  };

  const changeUserBalance = () => {
    if (selected.length == 1) {
      setUserBalanceModal(true);
    }
  };

  const changeUserTag = () => {
    if (selected.length == 1) {
      console.log(1);
      setUserTagModal(true);
    }
  };

  return (
    <Card>
      {/* <Scrollbar> */}
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onSelectAll?.();
                    } else {
                      onDeselectAll?.();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>isActive</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((user) => {
              const isSelected = selected.includes(user.id);
              const createdAt = "";

              return (
                <TableRow hover key={user.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onSelectOne?.(user.id);
                        } else {
                          onDeselectOne?.(user.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <Avatar src={user.avatar}>{getInitials(user.username)}</Avatar>
                      <Typography variant="subtitle2">{user.username}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell onClick={() => changeUserTag()}>{user.tag}</TableCell>
                  <TableCell onClick={() => changeUserBalance()}>{user.balance}</TableCell>
                  <TableCell onClick={() => changeUserRole()}>
                    {user.role ? user.role.roleName : ""}
                  </TableCell>
                  <TableCell onClick={() => toggleIsActive(user.isActive)}>
                    {user.isActive ? "Yes" : "No"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      {/* </Scrollbar> */}
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

UsersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
