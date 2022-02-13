import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Button,
  Stack,
  Divider,
  Box,
} from "@mui/material";
import { SortableHeader } from "ui/SortableHeader";
import { User } from "models/User";
import { getComparator, stableSort } from "utils";

interface Props {
  users: User[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

const headers = [
  {
    id: "id",
    label: "Id",
    sortable: false,
  },
  {
    id: "name",
    label: "Name",
    sortable: false,
  },
  {
    id: "username",
    label: "Username",
    sortable: true,
  },
  {
    id: "city",
    label: "City",
    sortable: false,
  },
  {
    id: "email",
    label: "Email",
    sortable: false,
  },
  {
    id: "edit",
    label: "Edit",
    sortable: false,
  },
  {
    id: "delete",
    label: "Delete",
    sortable: false,
  },
];

export const UserList: FC<Props> = ({ users, onEdit, onDelete, onAdd }) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState("username");

  const handleRequestSort = (property: string) => {
    console.log("handle sort");
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Paper elevation={4}>
      <Box px={4} py={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
        >
          <Typography variant="h5">User List</Typography>
          <Button variant="contained" onClick={onAdd}>
            Add New
          </Button>
        </Stack>
      </Box>
      <Divider />
      <Box p={2}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <SortableHeader
              headers={headers}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(users, getComparator(order, orderBy)).map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{user.id}</TableCell>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">{user.address?.city}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => onEdit(user.id)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => onDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};
