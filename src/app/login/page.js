"use client";

import React, { useState } from "react";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Box, Button, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { login } from "@/axios";


export default function Login(props) {
  const [method, setMethod] = useState("username");
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "MTUser123",
      password: "Password123!",
      submit: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("Username is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await login(values.username, values.password)
          .then((response) => {
            const token = response.token;
            localStorage.setItem("token", token);
            document.cookie = `token=${token}`;
          })
          .then(() => {
            router.push("/dashboard");
          })
          .catch((error) => {
            setLoginError(true);
            console.log("Login failed: ", error);
          });
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box
        sx={{
          //   backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
            </Stack>
            <Tabs sx={{ mb: 3 }} value={method}>
              <Tab label="Username" value="username" />
            </Tabs>
            {method === "username" && (
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.username && formik.errors.username)}
                    fullWidth
                    helperText={formik.touched.username && formik.errors.username}
                    label="Username"
                    name="username"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="username"
                    value={formik.values.username}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}
                {loginError ? (
                  <div>
                    <p className="text-red-500 text-sm mb-0">Wrong credentials</p>
                  </div>
                ) : null}
                <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                  Continue
                </Button>
                <Alert color="primary" severity="info" sx={{ mt: 3 }}>
                  <div>
                    You can't create an <b>account</b>, admins are preselected with specific
                    <b> accounts</b>
                  </div>
                </Alert>
              </form>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
}
