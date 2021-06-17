import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  UrlsContainer: { padding: 10 },
  addUrlButton: { marginTop: 5 },
  formFieldRow: { marginBottom: "0.8rem" },
  urlsContainer: {
    marginTop: 10,
    marginBottom: 30,
    padding: 10,
  },
  urlContainer: {
    marginTop: 5,
    "& .expired": {
      color: "tomato",
    },
    "& .never": {
      color: "navy",
    },
  },
  datepicker: {
    fontSize: "1rem",
    padding: "0.5rem",
  },
  table: {
    marginTop: "2rem",
  },
  expired: {
    color: "tomato",
  },
  loading: {
    fontSize: "2rem",
  },
  error: {
    fontSize: "2rem",
    color: "tomato",
    marginTop: "2rem",
  },
  modal: {
    fontFamily: "system-ui",
  },
  modalContent: {
    maxHeight: "500px",
  },
  modalContentInner: {
    maxHeight: "400px",
  },
  modalButtonClose: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "32px",
    height: "32px",
    opacity: 1,
    background: "none",
    border: "none",

    "&::before, &::after": {
      position: "absolute",
      left: "15px",
      top: 0,
      content: '" "',
      height: "33px",
      width: "2px",
      backgroundColor: "black",
    },

    "&:before": {
      transform: "rotate(45deg)",
    },

    "&:after": {
      transform: "rotate(-45deg)",
    },
  },
});
