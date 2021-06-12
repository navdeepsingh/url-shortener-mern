import React, { useState } from "react";
import { useStyles } from "../styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { client, convertDate } from "../utils";
import { API_URL } from "../constants";

import {
  Button,
  Paper,
  Box,
  TextField,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useUrls } from "../context";

const UrlAdd = () => {
  const classes = useStyles();
  const { setError, shortUrls, setShortUrls } = useUrls();
  const [loading, setLoading] = useState(false);
  const [state, setState] = React.useState({
    fullUrl: "",
    enableLogging: false,
    expire: null,
  });

  const handleOnChange = (event) => {
    setState({
      ...state,
      [event.target.name]:
        event.target.name === "enableLogging"
          ? event.target.checked
          : event.target.value,
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const { fullUrl, enableLogging, expire } = state;
    setLoading(true);
    client(API_URL + "url", {
      data: { fullUrl, enableLogging, expire },
    })
      .then((shortUrl) => {
        setShortUrls([shortUrl, ...shortUrls]);
        setError(false);
        setLoading(false);
      })
      .catch(({ message }) => {
        setError(message);
        setLoading(false);
      });
    /**
     * Reset input fields
     */
    setState({
      fullUrl: "",
      enableLogging: false,
      expire: null,
    });
  };

  return (
    <Paper className={classes.UrlsContainer}>
      <Box display="flex" flexDirection="column">
        <form onSubmit={handleOnSubmit}>
          <Box flexGrow={1} className={classes.formFieldRow}>
            <TextField
              name="fullUrl"
              label="Full URL"
              fullWidth
              value={state.fullUrl}
              onChange={handleOnChange}
              placeholder="https://google.com"
            />
          </Box>
          <Box flexGrow={1} className={classes.formFieldRow}>
            <FormControlLabel
              control={
                <Switch
                  checked={state.enableLogging}
                  onChange={handleOnChange}
                  name="enableLogging"
                />
              }
              label="Enable Logging"
            />
          </Box>
          <Box flexGrow={1} className={classes.formFieldRow}>
            <DatePicker
              name="expire"
              placeholderText="Expiration Date"
              selected={state.expire}
              onChange={(pickedDate) => {
                setState({
                  ...state,
                  expire: convertDate(pickedDate),
                });
              }}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm:ss"
              className={classes.datepicker}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            className={classes.addUrlButton}
            startIcon={<CloudUploadIcon />}
            disabled={!state.fullUrl.length > 0}
          >
            {loading ? (
              <span aria-label="loading">Processing...</span>
            ) : (
              "Shrink"
            )}
          </Button>
        </form>
      </Box>
    </Paper>
  );
};

export default UrlAdd;
