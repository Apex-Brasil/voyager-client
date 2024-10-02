import { useRouter } from "next/router";
import React from "react";

import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import LoginRequest from "../../templates/partials/LoginRequest";
import { publicRoutes, waxRoutes } from "../../utils/constants";

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, loading } = useGoogleAuth();

  if (!loading && !publicRoutes.includes(router.pathname) && !user) {
    return (
      <div>
        <LoginRequest />
      </div>
    );
  }
  if (waxRoutes.includes(router.pathname) && !user?.account) {
    return (
      <div>
        <LoginRequest waxRouter={true} />
      </div>
    );
  }
  return <div>{children}</div>;
};

export default ProtectedPage;
