const { Snackbar, Alert } = require("@mui/material");

const SnackbarComponent = ({ openFlag, onClose, message, severity }) => {
  return (
    <Snackbar
      open={openFlag}
      autoHideDuration={3000}
      variant="filled"
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;