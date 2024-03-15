import { PropsWithChildren, JSX } from "react";
import { Auth0Provider as BaseAuth0Provider, AppState } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import { AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN } from "@/environment";

export function Auth0Provider({ children }: PropsWithChildren): JSX.Element {
  const navigate = useNavigate();

  return (
    <BaseAuth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        audience: AUTH0_AUDIENCE,
        redirect_uri: window.location.origin,
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      onRedirectCallback={(appState?: AppState) =>
        navigate(appState?.returnTo || window.location.pathname)
      }
    >
      {children}
    </BaseAuth0Provider>
  );
}

export { useAuth0 } from "@auth0/auth0-react";
