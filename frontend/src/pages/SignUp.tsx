import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AxiosError, AxiosResponse } from 'axios';
import { z } from 'zod';

import { useAuthentication } from '../contexts/authentication';

type SignUpFormFields = 'name' | 'email' | 'password' | 'agreedToTerms';

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  agreedToTerms: boolean;
}

const signUpFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is a required field' }),
  email: z.string().min(1, { message: 'Email is a required field' }).email('Invalid email'),
  password: z.string().min(8, { message: 'Password needs to be at least 8 characters long' }),
  agreedToTerms: z.boolean().refine((value) => value, { message: 'Must agree to the terms and conditions' }),
});

const SignUpPage: React.FC = () => {
  const { signUp } = useAuthentication();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<SignUpForm>({
    defaultValues: { name: '', email: '', password: '', agreedToTerms: false },
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit: SubmitHandler<SignUpForm> = ({ name, email, password }) => {
    return signUp(name, email, password).catch((error: AxiosError) => {
      const response = error.response as AxiosResponse;

      Object.keys(response.data).forEach((key) => {
        response.data[key].forEach((message: string) => {
          setError(key as SignUpFormFields, { message });
        });
      });
    });
  };

  return (
    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component="h1" variant="h5">
        <img src="/logo.svg" alt="logo" height={100} width={200} />
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              required
              margin="normal"
              id="name"
              label="Full name"
              autoComplete="name"
              error={!!errors?.name?.message}
              helperText={errors?.name?.message}
              {...field}
            />
          )}
        />

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
              autoComplete="new-password"
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="agreedToTerms"
          control={control}
          render={({ field }) => (
            <>
              <FormControlLabel
                control={<Checkbox value="agreedToTerms" color="primary" />}
                label={
                  <span>
                    I agree to the{' '}
                    <Link href={import.meta.env.VITE_TERMS_AND_CONDITIONS_URL}>Terms and conditions</Link>.
                  </span>
                }
                {...field}
              />
              {!!errors?.agreedToTerms?.message && (
                <FormHelperText error={true}>{errors?.agreedToTerms?.message}</FormHelperText>
              )}
            </>
          )}
        />

        <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign Up
        </Button>
      </Box>

      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link component={RouterLink} to="/sign-in" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUpPage;
