import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

import { useGoogleAuth } from "../../../hooks/useGoogleAuth";

interface ConfirmLoginModalProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ConfirmLoginModal = ({
  setModalIsOpen,
}: ConfirmLoginModalProps) => {
  const { handleLogout, handleTermsaccepted, loading } = useGoogleAuth();
  const router = useRouter();

  const logout = () => {
    setModalIsOpen(false);
    handleLogout();
    router.push("/");
  };

  if (loading) {
    <div>
      <div className="loading-circle"></div>
    </div>;
  }

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <h4>Welcome!</h4>
      <div className="flex text-center flex-col gap-5 items-start justify-center">
        <span className="text-lg font-medium">
          Upon creating your account you agree <br />
          with our{" "}
          <Link
            className=" dark:!text-white hover:!text-primary underline"
            href={"/terms"}
          >
            terms of service.
          </Link>
        </span>
        <div className="flex gap-4 justify-center items-center w-full">
          <button className="btn" onClick={logout}>
            Cancel
          </button>
          <button className="btn" onClick={handleTermsaccepted}>
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
};
