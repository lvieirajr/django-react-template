import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCSRFQuery = () => {
  return useQuery({
    queryKey: ['csrf'],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND_URL}/csrf/`),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
