import React, { useState } from "react";
import { useStyles } from "../styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { client } from "../utils";
import { useGetShortUrls } from "../hooks/use-get-short-urls";
import { API_URL } from "../constants";

import {
  Button,
  Icon,
  Paper,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const UrlAdd = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    fullUrl: "",
    enableLogging: false,
    expire: null,
  });
  const { loading, error, shortUrls, setShortUrls } = useGetShortUrls();

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

    console.log(fullUrl, enableLogging, expire);
    console.log(API_URL);

    client(API_URL + "url", {
      data: { fullUrl, enableLogging, expire },
    }).then((shortUrl) => {
      setShortUrls([shortUrl, ...shortUrls]);
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
              onChange={handleOnChange}
              showTimeSelect
              dateFormat="yyyy-mm-dd hh:mm:ss"
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
            {loading ? <span aria-label="loading">...</span> : "Shrink"}
          </Button>
        </form>
      </Box>
    </Paper>
  );
};

export default UrlAdd;
