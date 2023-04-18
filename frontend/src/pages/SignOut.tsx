import React, { useEffect } from 'react';

import useAuthentication from '../contexts/authentication';

const SignOutPage: React.FC = () => {
  const { signOut } = useAuthentication();

  useEffect(() => signOut(), []);

  return <></>;
};

export default SignOutPage;
