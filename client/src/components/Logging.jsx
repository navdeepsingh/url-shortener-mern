import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { formatDate } from "../utils";
import { useStyles } from "../styles";

const Logging = ({ data: logging }) => {
  const classes = useStyles();
  return (
    <div className={classes.modalContent}>
      <h3>Logging</h3>
      <TableContainer component={Paper} className={classes.modalContentInner}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>IP Address</TableCell>
              <TableCell align="right">User Agent</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logging?.length > 0 ? (
              logging?.map(({ _id, ip_address, user_agent, createdAt }) => (
                <TableRow key={_id}>
                  <TableCell component="th" scope="row">
                    {ip_address}
                  </TableCell>
                  <TableCell align="right">{user_agent}</TableCell>
                  <TableCell align="right">{formatDate(createdAt)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell component="th" scope="row" colSpan="2">
                  Nothing Yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Logging;
