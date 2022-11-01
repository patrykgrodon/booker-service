import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const BoxFlexEnd = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>{children}</Box>
);

const MyServicesTableSkeleton = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {new Array(5).fill(0).map((_, i) => (
              <TableCell key={i} align={i === 0 ? "left" : "right"}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: i === 0 ? "flex-start" : "flex-end",
                  }}>
                  <Skeleton variant="text" sx={{ width: "70px" }} />
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {new Array(8).fill(0).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton variant="text" sx={{ width: "70px" }} />
              </TableCell>
              <TableCell align="right">
                <BoxFlexEnd>
                  <Skeleton variant="text" sx={{ width: "70px" }} />
                </BoxFlexEnd>
              </TableCell>
              <TableCell align="right">
                <BoxFlexEnd>
                  <Skeleton variant="text" sx={{ width: "70px" }} />
                </BoxFlexEnd>
              </TableCell>
              <TableCell align="right">
                <BoxFlexEnd>
                  <Skeleton variant="text" sx={{ width: "70px" }} />
                </BoxFlexEnd>
              </TableCell>
              <TableCell align="right">
                <BoxFlexEnd>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: "15px",
                      marginRight: (theme) => theme.spacing(1),
                    }}
                  />
                  <Skeleton variant="rectangular" sx={{ width: "15px" }} />
                </BoxFlexEnd>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyServicesTableSkeleton;
