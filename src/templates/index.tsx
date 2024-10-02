import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

import ProtectedPage from "../components/ProtectedPage";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { publicRoutes } from "../utils/constants";
import { Footer } from "./partials/Footer";
import { Header } from "./partials/Header";

interface Props {
  children: ReactNode;
}

export const MainTemplate = ({ children }: Props) => {
  const [offset, setOffset] = useState(0);
  const router = useRouter();
  const { user, loading } = useGoogleAuth();

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!publicRoutes.includes(router.pathname) && loading) {
    return (
      <div className="min-h-screen min-w-screen justify-center items-center flex">
        <div className="loading-circle"></div>
      </div>
    );
  }

  return (
    <div>
      <Header offset={offset} />
      <div className=" flex min-h-screen flex-col">
        <div className="md:mt-[100px] mt-[50px] min-h-[calc(100vh-80px)] md:min-h-[calc(100vh - 100px)]">
          <ProtectedPage>{children}</ProtectedPage>
        </div>
        <Footer />
      </div>
    </div>
  );
};
