import { NextPage } from "next";

import { DashboardFrame } from "../components/Frames/DashboardFrame";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { Meta } from "../layout/Meta";
import { allowedWallets } from "../utils/constants";

const Dashboard: NextPage = () => {
  const { user } = useGoogleAuth();

  const validatingUser =
    user?.account && allowedWallets.includes(user?.account);
  return (
    <>
      <Meta title="WAX Swap" description="Swap yours tokens here!" />
      {validatingUser ? (
        <DashboardFrame />
      ) : (
        <div className={`pt-10 text-center `}>
          <h1 className={`text-2xl`}>
            Your wallet is not allowed to see this route.
          </h1>
        </div>
      )}
    </>
  );
};

export default Dashboard;
