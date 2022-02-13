import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { FC } from "react";

const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey["100"],
    padding: "40px 40px"
  }
}));

interface Header {
  id: string;
  label: string;
  sortable: boolean;
}

interface Props {
  headers: Header[];
  order: "asc" | "desc";
  orderBy: string;
  onRequestSort: (property: string) => void;
}

export const SortableHeader: FC<Props> = ({
  headers,
  order,
  orderBy,
  onRequestSort
}) => {
  const createSortHandler = (header: any) => {
    if (header?.sortable) onRequestSort(header.id);
  };

  return (
    <TableHead>
      <TableRow>
        {headers.map((headCell) => (
          <StyledHeaderCell
            key={headCell.id}
            align="center"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id && headCell?.sortable}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={() => createSortHandler(headCell)}
              hideSortIcon={!headCell?.sortable}
            >
              {headCell.label}
            </TableSortLabel>
          </StyledHeaderCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
