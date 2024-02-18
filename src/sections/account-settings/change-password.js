import { useCallback, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { changePassword } from "@/axios";
import SnackbarComponent from "../../components/snackbar-component/snackbar-component";


export const ChangePassword = () => {
  const [passwordError, setPasswordError] = useState(false);
  const [emptyFieldEmptyError, setEmptyFieldEmptyError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState({
    openFlag: false,
    message: "error",
    severity: "error",
  });

  const handleConfirmPassword = useCallback(() => {
    // Check if the password and confirm password match
    if (document.getElementById("password").value !== document.getElementById("confirm").value) {
      setPasswordError(true);
    } else if (
      document.getElementById("password").value === "" ||
      document.getElementById("confirm").value === "" ||
      document.getElementById("old").value === ""
    ) {
      setEmptyFieldEmptyError(true);
    } else {
      setPasswordError(false);
      setEmptyFieldEmptyError(false);
      handleSubmit();
    }
  }, []);

  const handleSubmit = useCallback(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    changePassword({newPassword:document.getElementById("confirm").value, oldPassword:document.getElementById("old").value}, token)
      .then(() => {
        setLoading(false);
        document.getElementById("password").value = "";
        document.getElementById("confirm").value = "";
        document.getElementById("old").value = "";
        setShowSnackbar({
          openFlag: true,
          message: "Changed Password Successfully",
          severity: "success",
        });
      })
      .catch((error) => {
        setLoading(false);
        setShowSnackbar({
          openFlag: true,
          message: "Failed To Change Password",
          severity: "error",
        });
        console.log(error);
      });
  }, []);

  return (
    <>
      <SnackbarComponent
        openFlag={showSnackbar.openFlag}
        message={showSnackbar.message}
        severity={showSnackbar.severity}
        onClose={() => {
          setShowSnackbar({
            openFlage: false,
            message: "error",
            severity: "error",
          });
        }}
      />
      <form onSubmit={handleSubmit} method="PUT">
        <Card>
          <CardHeader subheader="Update password" title="Password" />
          <Divider />
          {emptyFieldEmptyError ? (
            <div>
              <p className="text-red-500 text-sm mb-0">No field can be left empty</p>
            </div>
          ) : null}
          <CardContent>
            <Stack spacing={3} sx={{ maxWidth: 400 }}>
              <TextField fullWidth label="Old Password" id="old" name="old" type="password" />
              <TextField fullWidth label="Password" id="password" name="password" type="password" />
              <TextField
                fullWidth
                label="Password (Confirm)"
                id="confirm"
                name="confirm"
                type="password"
              />
              {passwordError ? (
                <div>
                  <p className="text-red-500 text-sm mb-0">Passwords do not match</p>
                </div>
              ) : null}
            </Stack>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            {loading ? (
              <Button variant="contained" disabled>
                Update
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  handleConfirmPassword();
                }}
              >
                Update
              </Button>
            )}
          </CardActions>
        </Card>
      </form>
    </>
  );
};
