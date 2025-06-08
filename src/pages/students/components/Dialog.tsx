import React from "react";
import {
  Dialog as MaterialDialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type DialofProps = {
  handleClose: () => void;
  open: boolean;
  title: string;
  description: string;
};

const Dialog: React.FC<DialofProps> = ({
  open,
  handleClose,
  title,
  description,
}) => {
  return (
    <>
      {/* <Button
        variant="contained"
        startIcon={<InfoIncon />}
        onClick={handleClickOpen}
      >
        Show details
      </Button> */}

      <MaterialDialog
        open={open}
        onClose={handleClose}
        keepMounted
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              boxShadow: 10,
              backgroundImage: "linear-gradient(to right, #f0f2f5, #ffffff)",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 0,
            height: "8vh",
            display: "flex",
            paddingLeft: "0.5em",
            alignItems: "center",
          }}
        >
          {title}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography gutterBottom height={80} overflow="auto">
            <strong>{description}</strong>
          </Typography>

          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Close
            </Button>
            <Button disabled variant="contained" color="primary">
              Enroll
            </Button>
          </DialogActions>
        </DialogContent>
      </MaterialDialog>
    </>
  );
};

export default Dialog;
