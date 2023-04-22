import React, { createContext, useContext, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import type { User } from '../api/authentication';
import { useSignInMutation, useSignOutMutation, useSignUpMutation, useWhoAmIQuery } from '../api/authentication';
import { useCSRFQuery } from '../api/csrf';

type Authentication = {
  user?: User;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (name: string, email: string, password: string) => Promise<void>;
};

const AuthenticationContext = createContext<Authentication>({} as Authentication);

export const AuthenticationProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [user, setUser] = useState<User>({} as User);
  const queryClient = useQueryClient();

  const signInMutation = useSignInMutation();
  const signOutMutation = useSignOutMutation();
  const signUpMutation = useSignUpMutation();

  const csrfQuery = useCSRFQuery();
  const whoamiQuery = useWhoAmIQuery(setUser);

  const signIn = (email: string, password: string): Promise<void> => {
    return signInMutation.mutateAsync({ email, password }).then((response) => {
      setUser(response.data);
      queryClient.setQueryData(['user'], response.data);
    });
  };

  const signOut = () => {
    signOutMutation.mutateAsync().then(() => {
      setUser({} as User);
      queryClient.setQueryData(['user'], {} as User);
    });
  };

  const signUp = (name: string, email: string, password: string): Promise<void> => {
    return signUpMutation.mutateAsync({ name, email, password }).then((response) => {
      setUser(response.data);
      queryClient.setQueryData(['user'], response.data);
    });
  };

  return (
    <AuthenticationContext.Provider value={useMemo(() => ({ user, signUp, signIn, signOut }), [user])}>
      <React.Suspense fallback={<></>}>{!csrfQuery.isLoading && !whoamiQuery.isLoading && children}</React.Suspense>
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};
