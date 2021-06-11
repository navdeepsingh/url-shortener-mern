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
    borderTop: "1px solid #bfbfbf",
    marginTop: 5,
    "&:first-child": {
      margin: 0,
      borderTop: "none",
    },
    "&:hover": {
      "& $deleteTodo": {
        visibility: "visible",
      },
    },
  },
  datepicker: {
    fontSize: "1rem",
    padding: "0.5rem",
  },
  todoTextCompleted: {
    textDecoration: "line-through",
  },
  deleteTodo: {
    visibility: "hidden",
  },
  loading: {
    fontSize: "2rem",
  },
  error: {
    fontSize: "2rem",
    color: "tomato",
  },
});
