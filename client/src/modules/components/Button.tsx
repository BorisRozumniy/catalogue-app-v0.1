import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}));

export const PrimaryButton: React.FC<{}> = ({ children, ...props }) => {
  const styles = useStyles();

  return (
    <Button
      variant="contained"
      className={styles.root}
      {...props}
    >
      {children}
    </Button>
  );
};
