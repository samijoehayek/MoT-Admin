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
import { getInitials } from "../../utils/get-initials";

export const AvatarTable = (props) => {
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
    setAvatarActivityStatus,
    setAvatarNameModal
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  const toggleIsActive = (isActive) => {
    if (selected.length == 1) {
      setAvatarActivityStatus(isActive);
      setToggleActivityModal(true);
    }
  };

  const changeAvatarName = () => {
    if (selected.length == 1) {
      setAvatarNameModal(true);
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
              <TableCell>Gender</TableCell>
              <TableCell>User Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((avatar) => {
              const isSelected = selected.includes(avatar.id);
              const createdAt = "";

              return (
                <TableRow hover key={avatar.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onSelectOne?.(avatar.id);
                        } else {
                          onDeselectOne?.(avatar.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell onClick={() => {changeAvatarName()}}>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      {/* <Avatar src={avatar.avatar}>{getInitials(avatar.name)}</Avatar> */}
                      <Typography variant="subtitle2" >{avatar.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{avatar.gender}</TableCell>
                  <TableCell>{avatar.userNumber}</TableCell>
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

AvatarTable.propTypes = {
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
