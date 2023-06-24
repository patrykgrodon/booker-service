import {
  Paper,
  PaperProps,
  Table,
  TableContainer,
  TableContainerProps,
  TableProps,
} from "@mui/material";

type StickyHeaderTableProps = {
  children: React.ReactNode;
  tableContainerProps?: TableContainerProps;
  paperProps?: PaperProps;
  tableProps?: TableProps;
};

const StickyHeaderTable = ({
  tableContainerProps,
  paperProps,
  tableProps,
  children,
}: StickyHeaderTableProps) => {
  return (
    <TableContainer
      {...tableContainerProps}
      sx={{
        flex: 1,
        ...tableContainerProps?.sx,
      }}
    >
      <Paper
        {...paperProps}
        sx={{
          maxHeight: "100%",
          overflow: "auto",
          "& th": {
            backgroundColor: (theme) => theme.palette.background.paper,
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
          },
          ...paperProps?.sx,
        }}
      >
        <Table stickyHeader {...tableProps}>
          {children}
        </Table>
      </Paper>
    </TableContainer>
  );
};

export default StickyHeaderTable;
