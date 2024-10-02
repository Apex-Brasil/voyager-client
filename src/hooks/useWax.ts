import { AnyAction } from "@wharfkit/session";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

import { IUser } from "../context/GoogleAuthContext";
import { GOOGLE_PATH } from "../utils/constants";
import { useAuth } from "./useAuth";

const useWax = () => {
  const { activeUserData } = useAuth();

  const accountName = activeUserData?.actor.toString();
  const requestPermission =
    activeUserData?.permissionLevel.permission.toString();

  if (!activeUserData) {
    throw new Error("No active user data found");
  }

  const contractConnectWallet = async (
    email: string | undefined,
    setUser: Dispatch<SetStateAction<IUser | undefined>>,
  ) => {
    const action = {
      account: process.env.contractAccount,
      name: "noop",
      authorization: [
        {
          actor: accountName,
          permission: requestPermission,
        },
      ],
      data: {},
    } as AnyAction;

    try {
      activeUserData
        ?.transact({
          action,
        })
        .then(async () => {
          try {
            const res = await fetch(`${GOOGLE_PATH}/wax`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                account: accountName,
                permission: requestPermission,
              }),
            });

            const data = await res.json();
            if (data?.error) {
              return toast.error(data.error);
            }

            setUser(data);

            toast.success("Wallet connected successfully.");
          } catch (error: any) {
            toast.warn(error.message);
          }
        })
        .catch((e: any) => {
          toast.error(
            e.message?.split("message:")[1]
              ? e.message?.split("message:")[1]
              : e.message,
          );
          console.log(e);
        });
    } catch (error: any) {
      toast.error(
        JSON.parse(
          JSON.stringify(error),
        ).cause?.json?.error.details[0]?.message.split("message:")[1],
      );
    }
  };

  return { contractConnectWallet };
};

export default useWax;
