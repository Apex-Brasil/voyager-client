import { useTheme } from "next-themes";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { ThemeSwitch } from "../../../components";
import Modal from "../../../components/Modal";
import { ConfirmLoginModal } from "../../../components/Modals/ConfirmLoginModal";
import { ProfileModal } from "../../../components/Modals/ProfileModal";
import ProfileButton from "../../../components/ProfileButton";
import { SearchBar } from "../../../components/UI/Buttons/SearchBar";
import { useGoogleAuth } from "../../../hooks/useGoogleAuth";
import { allowedWallets } from "../../../utils/constants";
import { useWidth } from "../../../utils/responsiveHook";
import { DropDown } from "../HeaderMobile";
import { dataHeader } from "./data";

interface Props {
  className?: string;
  offset: number;
}
interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Header = ({ offset }: Props) => {
  const router = useRouter();
  const {
    user,
    handleLogin,
    loading: authLoading,
    openTermsModal,
  } = useGoogleAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const widthSize = useWidth();

  function toggleMobileMenu(): void {
    !isOpen ? setIsOpen(true) : setIsOpen(false);
  }

  const toggleModal = () => {
    setModalIsOpen(prevState => !prevState);
  };

  const onHandleLogin = async () => {
    await handleLogin();
  };

  const handleOnClick = () => {
    return user ? toggleModal() : onHandleLogin();
  };

  const { resolvedTheme } = useTheme();

  const getTheme = () => {
    if (resolvedTheme === "dark") {
      return true;
    } else {
      return false;
    }
  };

  const validatingUser =
    user?.account && allowedWallets.includes(user?.account);
  return (
    <>
      <header
        className={`fixed z-[100] flex h-[70px] w-screen items-center justify-between bg-header text-[#ccc] md:h-[100px]
        ${isOpen ? " !border-0 !border-b-0" : ""}`}
      >
        <div className={`flex items-center gap-5`}>
          <div className="relative flex items-center gap-10 ">
            <Link href={"/"} passHref>
              <div className="relative ml-5 h-[63px] w-[100px] scale-50 md:scale-100 cursor-pointer md:h-[48px] md:w-[150px]">
                <Image
                  src={
                    getTheme() === true
                      ? "/img/logos/logo.png"
                      : "/img/logos/black-logo.png"
                  }
                  alt={"Logo Voyager"}
                  layout={"fill"}
                  objectFit={"contain"}
                  priority
                />
              </div>
            </Link>
          </div>
          <nav className="mr-20 hidden items-center space-x-4 xl:flex md:space-x-4">
            {dataHeader
              .filter(val => (validatingUser ? val : val.name !== "Dashboard"))
              .map((item, index) => {
                if (item.link.startsWith("https")) {
                  return (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className={` ${
                        router.asPath === item.link && "text-purple"
                      } cursor-pointer text-center text-secodary font-semibold md:text-xl`}
                    >
                      {item.name}
                    </a>
                  );
                } else {
                  return (
                    <Link key={index} href={item.link} passHref>
                      <span
                        className={`${
                          router.asPath === item.link && "text-purple"
                        } transition-time-text-header cursor-pointer text-secondary font-semibold transition-all delay-100 ease-in-out  md:text-xl`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  );
                }
              })}
          </nav>
        </div>
        <div className={`flex relative items-center justify-center gap-5 mr-5`}>
          {user && widthSize > 1050 && <SearchBar />}

          <ThemeSwitch />

          <ProfileButton
            className={"hidden lg:flex "}
            handleOnClick={handleOnClick}
          />

          <label className="burger xl:!hidden !z-10" htmlFor="burger">
            <input
              checked={isOpen}
              onChange={toggleMobileMenu}
              type="checkbox"
              id="burger"
            />
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <DropDown
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleOnClick={handleOnClick}
        />
      </header>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <ProfileModal setModalIsOpen={setModalIsOpen} />
      </Modal>
      <Modal
        isOpen={openTermsModal && router.pathname !== "/terms"}
        isLogin
        setIsOpen={() => false}
      >
        <ConfirmLoginModal setModalIsOpen={() => false} />
      </Modal>
    </>
  );
};
