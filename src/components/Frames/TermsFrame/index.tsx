/* eslint-disable camelcase */

import { useRouter } from "next/router";

import { useGoogleAuth } from "../../../hooks/useGoogleAuth";

const TermsFrame = () => {
  const { handleLogout, handleTermsaccepted } = useGoogleAuth();
  const router = useRouter();

  const logout = () => {
    handleLogout();
    router.push("/");
  };

  return (
    <main
      id="termsOfService"
      className={`flex items-center justify-center bg-image bg-cover bg-fixed py-10`}
    >
      <section
        className={`max-w-[1024px] flex flex-col gap-5 min-h-screen  bg-image bg-cover bg-fixed w-full  px-2`}
      >
        <div className="flex justify-between">
          <h4>Terms Of Service</h4>
        </div>
        <span className={`font-medium`}>
          Upon signing in with your gmail, we will collect that information and
          you authorize us to send marketing materials. Some features require
          your WAX cloud wallet to also be connected. Again, we will collect
          that data for future promotions like airdrops and free NFTs.
        </span>
        <div className="flex gap-4 justify-center items-center w-full">
          <button className="btn" onClick={logout}>
            Cancel
          </button>
          <button className="btn" onClick={handleTermsaccepted}>
            I Agree
          </button>
        </div>
      </section>
    </main>
  );
};

export default TermsFrame;
