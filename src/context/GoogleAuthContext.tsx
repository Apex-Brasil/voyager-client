import axios from "axios";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

import { IVoyagerScoreObj } from "../@types";
import { GOOGLE_PATH } from "../utils/constants";

interface IGoogleContextProvider {
  children: ReactNode;
}

export interface IUser {
  username: string;
  twitter_id?: string;
  twitter_username?: string;
  email: string;
  account?: string;
  permission?: string;
}

interface GoogleAuthContextProps {
  user: IUser | undefined;
  handleLogin: () => Promise<void>;
  handleLogout: () => void;
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
  loading: boolean;
  handleTwitterLogin: () => Promise<void>;
  openTermsModal: boolean;
  sendFeedback: (
    dataObj: IVoyagerScoreObj,
    sucessFunction: () => void,
  ) => Promise<void>;
  handleTermsaccepted: () => Promise<void>;
}

export const GoogleAuthContext = createContext({} as GoogleAuthContextProps);

export const GoogleAuthProvider = ({ children }: IGoogleContextProvider) => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | undefined>();
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openTermsModal, setOpenTermsModal] = useState(false);

  const handleTermsaccepted = async () => {
    const tokenData = localStorage.getItem("voyager-token");

    if (!tokenData) return;
    const { token } = JSON.parse(tokenData);
    try {
      const res = await axios.post(
        `${GOOGLE_PATH}/termsaccepted`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Terms accepted successfully.");
      router.push("/explorer");
    } catch (error: any) {
      toast.warn(error.message);
    }
  };
  const handleLogin = async () => {
    setLoading(true);

    const popup = open(
      `${GOOGLE_PATH}/google`,
      "popup",
      "popup=true,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600,left=100,top=100",
    );

    const checkPopup = setInterval(() => {
      if (popup?.window?.location?.href?.includes("?token=")) {
        const token = popup.window.location.search
          .split("?token=")[1]
          .split("&")[0];
        const dueDate = popup.window.location.search.split("&dueDate=")[1];
        if (token && dueDate) {
          localStorage.setItem(
            "voyager-token",
            JSON.stringify({ token, dueDate }),
          );
        }

        setTimeout(() => router.push("/explorer"), 2000);
        setUpdate(e => !e);
        popup.close();
        location.reload();
      }
      if (!popup || !popup.closed) {
        // eslint-disable-next-line no-useless-return
        setLoading(false);

        return;
      }
      clearInterval(checkPopup);
    }, 1000);
  };

  const handleTwitterLogin = async () => {
    const tokenData = localStorage.getItem("voyager-token");

    if (!tokenData) return;
    const popup = open(
      `${GOOGLE_PATH}/twitter`,
      "popup",
      "popup=true,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600,left=100,top=100",
    );
    const email = user?.email;
    let twitterId;
    let twitterUsername;
    const checkPopup = setInterval(async () => {
      if (popup?.window?.location?.href?.includes("?twitter_id=")) {
        twitterId = popup?.window?.location?.search
          ?.split("?twitter_id=")[1]
          ?.split("&")[0];
        twitterUsername = popup?.window?.location?.search
          ?.split("&twitter_username=")[1]
          ?.split("&")[0];

        if (email && twitterId && twitterUsername) {
          const { token } = JSON.parse(tokenData);
          handleTwitterConnection(token, twitterId, twitterUsername);
        }
        popup.close();
      }
      if (!popup || !popup.closed) {
        // eslint-disable-next-line no-useless-return
        return;
      }
      clearInterval(checkPopup);
    }, 1000);
  };

  const handleTwitterConnection = async (token, twitterId, twitterUsername) => {
    try {
      const res = await fetch(`${GOOGLE_PATH}/connecttwitter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          twitter_id: twitterId,
          twitter_username: twitterUsername,
        }),
      });

      const data = await res.json();
      if (data?.error) {
        toast.error(data.error);
        return;
      }

      setUser(data);
      toast.success("Twitter connected successfully.");
    } catch (error: any) {
      toast.warn(error.message);
    }
  };

  const handleLogout = async () => {
    setUser(undefined);
    localStorage.removeItem("voyager-token");
  };

  const getUserByToken = async (token: string, dueDate: number) => {
    if (token && dueDate) {
      localStorage.setItem("voyager-token", JSON.stringify({ token, dueDate }));
    }

    try {
      const res = await fetch(`${GOOGLE_PATH}/token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      const { newToken, tempUser } = data;
      if (token && dueDate) {
        localStorage.setItem("voyager-token", JSON.stringify(newToken));
      }

      setUser(tempUser);
      setOpenTermsModal(!tempUser?.terms_accepted);
    } catch (error: any) {
      console.log(error.message);
      if (error.message === "user not found") {
        localStorage.removeItem("voyager-token");
      }
    }
  };

  const sendFeedback = async (
    dataObj: IVoyagerScoreObj,
    sucessFunction: () => void,
  ) => {
    try {
      const tokenData = localStorage.getItem("voyager-token");
      if (!tokenData) return;
      const { token } = JSON.parse(tokenData);
      const bodyContent = JSON.stringify(dataObj);

      const res = await axios.post(
        `${process.env.apiEndpoint}/collection/assessments`,
        dataObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Your feedback has been send. Thank you!");
      sucessFunction();
    } catch (error: any) {
      toast.warn(error.message);
    }
  };

  useEffect(() => {
    const voyagerToken = localStorage.getItem("voyager-token");

    if (voyagerToken) {
      const tokenData: { dueDate: string; token: string } = JSON.parse(
        voyagerToken as string,
      );
      const dueDate: number = +tokenData?.dueDate;

      if (dueDate > Date.now()) {
        const token = tokenData.token;

        getUserByToken(token as string, dueDate);
      } else {
        localStorage.removeItem("voyager-token");
        setOpenTermsModal(false);
      }
    } else {
      setOpenTermsModal(false);
    }
    setTimeout(() => setLoading(false), 1000);
  }, [router, update]);

  return (
    <GoogleAuthContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        handleLogout,
        loading,
        handleTwitterLogin,
        openTermsModal,
        sendFeedback,
        handleTermsaccepted,
      }}
    >
      {children}
    </GoogleAuthContext.Provider>
  );
};
