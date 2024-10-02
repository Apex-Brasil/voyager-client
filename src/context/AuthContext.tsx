import SessionKit, { Session } from "@wharfkit/session";
import { ReactNode, createContext, useEffect, useState } from "react";

import { createSessionKit } from "../config/initWharfkit";

type AuthContextData = {
  signIn(): Promise<void>;
  signOut(): Promise<void>;
  activeUserData: Session | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [activeUserData, setActiveUserData] = useState<Session | null>(null);
  const [sessionKit, setSessionKit] = useState<SessionKit | null>(null);

  useEffect(() => {
    async function initSession() {
      const newSessionKit = await createSessionKit();
      setSessionKit(newSessionKit);
    }
    initSession();
  }, []);

  useEffect(() => {
    if (sessionKit) {
      sessionKit.restore().then(restoredSession => {
        if (!restoredSession) return;
        setActiveUserData(restoredSession);
      });
    }
  }, [sessionKit]);

  const signIn = async () => {
    if (!sessionKit) return;
    const { session } = await sessionKit.login();
    setActiveUserData(session);
  };

  const signOut = async () => {
    if (!sessionKit) return;
    await sessionKit.logout();
    setActiveUserData(null);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, activeUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
