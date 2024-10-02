import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

import { useAuth } from "../../../hooks/useAuth";
import { useGoogleAuth } from "../../../hooks/useGoogleAuth";
import useWax from "../../../hooks/useWax";
import { TwitterButton, WaxLoginbutton } from "../../LoginButtons";

interface ProfileModalProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ProfileModal = ({ setModalIsOpen }: ProfileModalProps) => {
  const { user, setUser, handleLogout, handleTwitterLogin } = useGoogleAuth();
  const { signIn } = useAuth();
  const { contractConnectWallet } = useWax();
  const router = useRouter();

  console.log(user, "user");

  const logout = () => {
    setModalIsOpen(false);
    handleLogout();
    router.push("/");
  };

  const handleSignIn = async () => {
    setModalIsOpen(false);
    signIn().then(async res => {
      console.log("res", res);
      await contractConnectWallet(user?.email, setUser);
    });
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <h4>Your Profile</h4>

      <div className="flex flex-col gap-5 items-start justify-center">
        <span className="self-start flex flex-col md:justify-start justify-center gap-5">
          <span className="flex md:flex-row flex-col gap-2 text-[18px]">
            User: <span>{user?.username}</span>
          </span>
          <span className="flex md:flex-row flex-col gap-2 text-[18px]">
            Email: <span>{user?.email}</span>
          </span>
          {user?.twitter_id && (
            <span className="self-start flex md:flex-row flex-col gap-2 text-[18px]">
              Twitter: <span>{user?.twitter_username}</span>
            </span>
          )}
          {user?.account && (
            <span className="self-start flex md:flex-row flex-col gap-2 text-[18px]">
              Wallet: <span>{user?.account}</span>
            </span>
          )}
        </span>
        {(!user?.twitter_id || !user?.account) && (
          <span className="flex gap-4">
            <div className="text-center flex flex-col gap-4">
              Connect Accounts
              {!user?.twitter_id && (
                <span className="flex justify-center">
                  <div className="text-center">
                    <div className="flex gap-4">
                      <TwitterButton click={handleTwitterLogin} />
                    </div>
                  </div>
                </span>
              )}
              {!user?.account && (
                <div className={`flex flex-col items-center gap-1`}>
                  <span className="flex justify-center">
                    <div className="flex flex-col gap-2 text-center">
                      <div className="flex gap-4">
                        <WaxLoginbutton click={handleSignIn} />
                      </div>
                    </div>
                  </span>
                  <span>
                    Don&apos;t have a wallet yet?{" "}
                    <span
                      className={`cursor-pointer underline hover:text-yellow-500`}
                      onClick={() =>
                        open(
                          "https://www.mycloudwallet.com/signin#create-account",
                        )
                      }
                    >
                      Create one!
                    </span>
                  </span>
                  <span>
                    Need help?{" "}
                    <span
                      className={`cursor-pointer underline hover:text-yellow-500`}
                      onClick={() => open("https://discord.gg/8K6q6YTCSQ")}
                    >
                      Join our Discord.
                    </span>
                  </span>
                </div>
              )}
            </div>
          </span>
        )}
        <div className="flex justify-center items-center w-full">
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
