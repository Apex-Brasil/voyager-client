import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { useWidth } from "utils-react";

import ProfileButton from "../../../components/ProfileButton";
import { SearchBar } from "../../../components/UI/Buttons/SearchBar";
import { useGoogleAuth } from "../../../hooks/useGoogleAuth";
import { dataHeader } from "../Header/data";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleOnClick: () => void | Promise<void>;
}

export const DropDown = ({ isOpen, setIsOpen, handleOnClick }: Props) => {
  const {
    user,
    handleLogin,
    handleLogout,
    loading: authLoading,
  } = useGoogleAuth();
  const widthSize = useWidth();

  return (
    <div
      className={`absolute top-[70px] md:top-[100px] z-50 h-[100vh] w-screen !border-0  transition-all dark:bg-[#0b0b0d] bg-white ${
        isOpen ? " right-0" : " right-[101vw] hidden"
      }`}
    >
      <div className={`w-full flex flex-col py-6 gap-2`}>
        <div className={`self-center`}>
          {user && widthSize <= 1050 && <SearchBar />}
        </div>
        <div className="mt-5 mx-10 flex flex-col items-start justify-center space-y-5 text-3xl font-medium">
          {dataHeader.map((item, index) => {
            if (item.link.startsWith("https")) {
              return (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`cursor-pointer text-center text-[17px]`}
                >
                  {item.name}
                </a>
              );
            } else {
              return (
                <Link key={index} href={item.link} passHref>
                  <span
                    className={`flex cursor-pointer items-center justify-center rounded-md text-center text-[17px] text-primary `}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            }
          })}

          <div>
            <ProfileButton
              className="!text-[17px] w-full mx-auto"
              handleOnClick={() => {
                setIsOpen(false);
                handleOnClick();
              }}
            />
          </div>
        </div>
        <hr className="my-4 bg-[#254244]" />
      </div>
    </div>
  );
};
