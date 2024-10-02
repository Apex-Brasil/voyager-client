import {
  GoogleLoginButton,
  WaxLoginbutton,
} from "../../../components/LoginButtons";
import { useAuth } from "../../../hooks/useAuth";
import { useGoogleAuth } from "../../../hooks/useGoogleAuth";

interface Props {
  waxRouter?: boolean;
}

const LoginRequest = ({ waxRouter }: Props) => {
  const { handleLogin } = useGoogleAuth();
  const { signIn } = useAuth();

  return (
    <div
      className={`flex flex-col items-center justify-center mt-12 gap-10 text-primary`}
    >
      <div className="flex flex-col p-7 items-center justify-between w-[350px] md:w-auto gap-10 xl:gap-20 drop-shadow-xl bg-container rounded-2xl">
        <div className={`flex flex-col items-center gap-2 text-center`}>
          <span className={`text-2xl font-bold md:text-3xl`}>
            Welcome to <span className={`gold-text`}>Voyager.</span>
          </span>
          <span className={`text-lg font-medium md:text-xl`}>
            {waxRouter
              ? "Link a Wax Cloud Wallet to your account to navigate futher"
              : "Login to your account to navigate further."}
          </span>
        </div>
        <div className={`flex w-full flex-col items-center gap-5`}>
          <div
            className={`flex flex-col w-full items-center justify-center gap-6`}
          >
            <div className="px-6 sm:px-0 max-w-sm">
              {waxRouter ? (
                <div className={`flex flex-col gap-2 items-center`}>
                  <WaxLoginbutton click={signIn} />
                </div>
              ) : (
                <GoogleLoginButton click={handleLogin} />
              )}
            </div>
          </div>
        </div>
        <div className={`flex flex-col items-center gap-1`}>
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
      </div>
    </div>
  );
};

export default LoginRequest;
