import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type SignInData = {
  email: string;
  password: string;
};

export type SignUpData = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  created: string;
  modified: string;
  name: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
};

export const useSignInMutation = () => {
  const signIn = (data: SignInData) => {
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/authentication/sign-in/`, data);
  };

  return useMutation({ mutationFn: signIn });
};

export const useSignOutMutation = () => {
  const signOut = () => {
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/authentication/sign-out/`);
  };

  return useMutation({ mutationFn: signOut });
};

export const useSignUpMutation = () => {
  const signUp = (data: SignUpData) => {
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/authentication/sign-up/`, data);
  };

  return useMutation({ mutationFn: signUp });
};

export const useWhoAmIQuery = (setUser: (user: User) => void) => {
  const whoami = () => {
    return axios.get(`${import.meta.env.VITE_BACKEND_URL}/authentication/whoami/`);
  };

  return useQuery({
    queryKey: ['user'],
    queryFn: whoami,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (response) => setUser(response.data),
  });
};
