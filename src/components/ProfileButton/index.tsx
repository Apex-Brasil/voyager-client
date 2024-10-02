import { AiOutlineExclamationCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import { useGoogleAuth } from "../../hooks/useGoogleAuth";

interface Props {
  className?: string;
  handleOnClick: () => void;
}

const ProfileButton = ({ handleOnClick, className }: Props) => {
  const { user, loading: authLoading } = useGoogleAuth();
  return (
    <button
      onClick={handleOnClick}
      className={`${className} btn-outlined min-w-[150px] text-sm relative !z-10 uppercase !text-center justify-center !items-center !mr-6 ${
        user && !user?.account ? "!border-red-600" : ""
      }`}
      disabled={authLoading}
    >
      {user && !user?.account && (
        <div className="absolute w-[30px] h-[30px] bg-red-600 rounded-full -top-[6%] -left-[6%] flex justify-center items-center">
          <AiOutlineExclamationCircle size={20} />
        </div>
      )}
      {user ? (
        <span className="flex gap-2 whitespace-nowrap items-center">
          <CgProfile size={25} />
          {user.username}
        </span>
      ) : authLoading ? (
        <div className="loading-scale !w-[20px] !h-[20px] !bg-[#6c38ff] dark:!bg-white"></div>
      ) : (
        <span className="text-center">Login</span>
      )}
    </button>
  );
};

export default ProfileButton;
