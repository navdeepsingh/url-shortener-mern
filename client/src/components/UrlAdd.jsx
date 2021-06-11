import React, { useState } from "react";
import { useStyles } from "../styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Container,
  Typography,
  Button,
  Icon,
  Paper,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";

const UrlAdd = () => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(null);
  const [fullUrl, setFullUrl] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Paper className={classes.UrlsContainer}>
      <Box display="flex" flexDirection="column">
        <Box flexGrow={1} className={classes.formFieldRow}>
          <TextField
            label="Full URL"
            fullWidth
            value={fullUrl}
            onChange={(e) => {
              setFullUrl(e.target.value);
            }}
          />
        </Box>
        <Box flexGrow={1} className={classes.formFieldRow}>
          <FormControlLabel
            value={false}
            control={<Checkbox color="primary" />}
            label="Enable Logging"
            labelPlacement="end"
          />
        </Box>
        <Box flexGrow={1} className={classes.formFieldRow}>
          <DatePicker
            placeholderText="Expiration Date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="yyyy-mm-dd hh:mm:ss"
            className={classes.datepicker}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.addUrlButton}
          startIcon={<CloudUploadIcon />}
        >
          {loading ? <span aria-label="loading">...</span> : "Shrink"}
        </Button>
      </Box>
    </Paper>
  );
};

export default UrlAdd;
