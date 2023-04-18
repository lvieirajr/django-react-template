import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AxiosError, AxiosResponse } from 'axios';
import { z } from 'zod';

import useAuthentication from '../contexts/authentication';

export interface SignInForm {
  email: string;
  password: string;
}

const signInFormSchema = z.object({
  email: z.string().min(1, { message: 'Email is a required field' }).email('Invalid email'),
  password: z.string().min(8, { message: 'Password needs to be at least 8 characters long' }),
});

const SignInPage: React.FC = () => {
  const { signIn } = useAuthentication();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<SignInForm>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit: SubmitHandler<SignInForm> = ({ email, password }) => {
    return signIn(email, password).catch((error: AxiosError) => {
      const response = error.response as AxiosResponse;
      setError('root.submitError', { message: response.data.detail });
    });
  };

  return (
    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component="h1" variant="h5">
        <img src="/logo.svg" alt="logo" height={100} width={200} />
      </Typography>

      <Box noValidate component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              required
              margin="normal"
              id="email"
              label="Email"
              autoComplete="email"
              error={!!errors?.email?.message}
              helperText={errors?.email?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              required
              margin="normal"
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
              {...field}
            />
          )}
        />

        {errors?.root?.submitError && (
          <FormHelperText error id="submit-error">
            {errors.root.submitError.message}
          </FormHelperText>
        )}

        <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
      </Box>

      <Grid container>
        <Grid item>
          <Link component={RouterLink} to="/sign-up" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignInPage;
