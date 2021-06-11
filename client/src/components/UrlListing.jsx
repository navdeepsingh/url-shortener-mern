import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Icon,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { API_URL, SERVER_URL } from "../constants";
import { useStyles } from "../styles";
import { client, expiresIn } from "../utils";

const UrlListing = ({ loading, error, shortUrls, setShortUrls }) => {
  const classes = useStyles();

  function deleteUrl(id) {
    client(`${API_URL}${id}`, {
      method: "DELETE",
    }).then(() => setShortUrls(shortUrls.filter((url) => url._id !== id)));
  }
  return (
    <>
      {shortUrls.length > 0 && (
        <TableContainer className={classes.table} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Long URL</TableCell>
                <TableCell align="right">Short URL</TableCell>
                <TableCell align="right">Expires In</TableCell>
                <TableCell align="right">Logging</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shortUrls.map(
                ({ _id, full, short, expire, logging_enabled }) => (
                  <TableRow key={_id}>
                    <TableCell component="th" scope="row">
                      {full}
                    </TableCell>
                    <TableCell align="right">
                      <a
                        target="_blank"
                        href={`${SERVER_URL}${short}`}
                        rel="noreferrer"
                      >
                        {short}
                      </a>
                    </TableCell>
                    <TableCell align="right">
                      {expire !== null ? expiresIn(expire) : "Never"}
                    </TableCell>
                    <TableCell align="right">
                      {logging_enabled ? <Box>View</Box> : "Disabled"}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        startIcon={<DeleteIcon>delete</DeleteIcon>}
                        onClick={() => deleteUrl(_id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {loading && <Box className={classes.loading}>Loading..</Box>}
      {error && <Box className={classes.error}>Oops! Something Went Wrong</Box>}
    </>
  );
};

export default UrlListing;
