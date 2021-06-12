import React, { useState, useEffect } from "react";
import { Modal } from "@navdeepsingh/bit-components.modal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { API_URL, SERVER_URL } from "../constants";
import { useStyles } from "../styles";
import { client, expiresIn } from "../utils";
import Logging from "./Logging";
import { useUrls } from "../context";

const UrlListing = () => {
  const classes = useStyles();
  const { loading, error, shortUrls, setShortUrls } = useUrls();
  const [showDialog, setShowDialog] = useState(false);
  const [urlLoggingId, setUrlLoggingId] = useState(undefined);
  const [dialogData, setDialogData] = useState(null);

  function deleteUrl(id) {
    client(`${API_URL}url/${id}`, {
      method: "DELETE",
    }).then(() => setShortUrls(shortUrls.filter((url) => url.id !== id)));
  }

  useEffect(() => {
    // send request to get Log data
    if (showDialog) {
      client(`${API_URL}logging/${urlLoggingId}`).then((logging) => {
        setDialogData(logging);
      });
    }
  }, [showDialog, urlLoggingId]);

  return (
    <>
      {error && (
        <Box className={classes.error}>
          Oops! Something Went Wrong: <code>{error}</code>
        </Box>
      )}
      {loading && <Box className={classes.loading}>Loading..</Box>}
      {shortUrls.length > 0 && (
        <>
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
                  ({ _id, id, full, short, expire, logging_enabled }) => (
                    <TableRow key={id} className={classes.urlContainer}>
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
                        {expire !== null ? (
                          expiresIn(expire)
                        ) : (
                          <span className="never">Never</span>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {logging_enabled ? (
                          <Button
                            variant="contained"
                            onClick={() => {
                              setShowDialog(true);
                              setUrlLoggingId(_id);
                            }}
                          >
                            View
                          </Button>
                        ) : (
                          "Disabled"
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          startIcon={<DeleteIcon>delete</DeleteIcon>}
                          onClick={() => deleteUrl(id)}
                          variant="contained"
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
          <Modal isOpen={showDialog}>
            <Box className={classes.modal}>{<Logging data={dialogData} />}</Box>
            <button
              className={classes.modalButtonClose}
              onClick={() => {
                setDialogData(null);
                setShowDialog(false);
              }}
            ></button>
          </Modal>
        </>
      )}
    </>
  );
};

export default UrlListing;
