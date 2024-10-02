import { useTheme } from "next-themes";
import Image from "next/legacy/image";
import { FaDiscord, FaMediumM, FaTwitter } from "react-icons/fa";
import { toast } from "react-toastify";

export const Footer = () => {
  const { resolvedTheme } = useTheme();
  const getTheme = () => {
    if (resolvedTheme === "dark") {
      return true;
    } else {
      return false;
    }
  };
  return (
    <section
      className={`w-screen relative flex flex-col lg:flex-row justify-center gap-5 lg:gap-[150px] xl:gap-[350px] 2xl:gap-[500px] bg-header py-12 px-8 xl:px-10 2xl:px-24`}
    >
      <div className="flex flex-col items-center justify-center ">
        <div className="relative h-[53px] w-[100px] cursor-pointer ">
          <Image
            src={
              getTheme() === true
                ? "/img/logos/logo.png"
                : "/img/logos/black-logo.png"
            }
            alt={"Logo Voyager"}
            layout={"fill"}
            objectFit={"contain"}
          />
        </div>
        <span className={`text-secondary font-medium text-center`}>
          Designed & Engineered by{" "}
          <span
            className={`underline cursor-pointer`}
            onClick={() => open("https://apexnft.com.br/")}
          >
            Apex NFT Brasil
          </span>{" "}
          |{" "}
          <span
            className={`underline cursor-pointer`}
            onClick={() =>
              open("https://app.connect3.io/services/blockchain-apis")
            }
          >
            Blockchain APIs provided by Connect3.
          </span>
        </span>
      </div>
      <div
        className={`flex items-end justify-center gap-5 md:absolute md:bottom-[10%] right-[3%]`}
      >
        <FaDiscord
          size={30}
          onClick={() => toast.warn("Coming soon!")}
          className={`cursor-pointer hover:text-[#2400ff]`}
        />
        <FaTwitter
          size={30}
          onClick={() => toast.warn("Coming soon!")}
          className={`cursor-pointer hover:text-[#2400ff]`}
        />
        <FaMediumM
          size={30}
          onClick={() => toast.warn("Coming soon!")}
          className={`cursor-pointer hover:text-[#2400ff]`}
        />
      </div>
    </section>
  );
};
