"use client";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Collectable,
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

export const CollectableTable = (props) => {
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
    setCollectableNameModal,
    setCollectableDescriptionModal,
    setCollectableValueModal
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  const changeCollectableName = () => {
    if (selected.length == 1) {
      setCollectableNameModal(true);
    }
  }

  const changeCollectableDescription = () => {
    if (selected.length == 1) {
      setCollectableDescriptionModal(true);
    }
  }

  const changeCollectableValue = () => {
    if (selected.length == 1) {
      setCollectableValueModal(true);
    }
  }

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
              <TableCell>Description</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((collectable) => {
              const isSelected = selected.includes(collectable.id);
              const createdAt = "";

              return (
                <TableRow hover key={collectable.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onSelectOne?.(collectable.id);
                        } else {
                          onDeselectOne?.(collectable.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell onClick={() => {changeCollectableName()}}>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <Typography variant="subtitle2">{collectable.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell onClick={() => {changeCollectableDescription()}}>{collectable.description}</TableCell>
                  <TableCell onClick={() => {changeCollectableValue()}}>{collectable.value}</TableCell>
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

CollectableTable.propTypes = {
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
