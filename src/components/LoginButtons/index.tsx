import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface LoginModalProps {
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  click: any;
}

export const GoogleLoginButton = ({ click }) => {
  return (
    <button
      type="button"
      className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
      onClick={click}
    >
      <svg
        className="mr-2 -ml-1 w-4 h-4"
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="google"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
      >
        <path
          fill="currentColor"
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        ></path>
      </svg>
      Sign up with Google
    </button>
  );
};

export const WaxLoginbutton = ({ click, setIsOpen }: LoginModalProps) => {
  return (
    <div
      className={`flex h-[54px] w-[235px] cursor-pointer items-center`}
      onClick={() => {
        click();
        if (setIsOpen) setIsOpen(false);
      }}
    >
      <div className={`h-full rounded-l-xl bg-[#92480c] px-3 py-3`}>
        <div className={`relative h-[30px] w-[30px]`}>
          <Image
            src={"/img/icons/cloudwallet.png"}
            objectFit={"contain"}
            layout={"fill"}
            alt={""}
          />
        </div>
      </div>
      <div
        className={`flex h-full w-full items-center justify-center rounded-r-xl bg-[#F89122]`}
      >
        <span className={`font-roboto font-semibold text-white`}>
          WAX Wallet
        </span>
      </div>
    </div>
  );
};

export const TwitterButton = ({ click }: any) => {
  return (
    <div
      className={`flex h-[54px] w-[235px] cursor-pointer items-center`}
      onClick={() => {
        click();
      }}
    >
      <div className={`h-full rounded-l-xl bg-[#000000] p-2`}>
        <div className={`relative h-[38px] w-[37px] text-white`}>
          <svg
            viewBox="0 0 1200 1227"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="none"
            color="white"
            className="text-white"
            fill="white"
          >
            <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
          </svg>
        </div>
      </div>
      <div
        className={`flex h-full w-full items-center justify-center rounded-r-xl bg-[#000000]`}
      >
        <span className={`font-roboto font-semibold text-white`}>
          Connect X/Twitter
        </span>
      </div>
    </div>
  );
};
