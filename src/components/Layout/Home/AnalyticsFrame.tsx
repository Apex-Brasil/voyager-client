import { useTheme } from "next-themes";
import Image from "next/legacy/image";
import { useRouter } from "next/router";

import { useGoogleAuth } from "../../../hooks/useGoogleAuth";

export const AnalyticsFrame = () => {
  const { handleLogin, user, handleLogout } = useGoogleAuth();
  const { resolvedTheme } = useTheme();

  const handleTheme = () => {
    if (resolvedTheme === "dark") {
      return true;
    } else {
      return false;
    }
  };
  const router = useRouter();
  return (
    <section
      className={`relative flex min-h-screen flex-col gap-16 md:gap-28 items-center py-10`}
    >
      <div
        className={`flex flex-col md:flex-row items-center justify-between w-[350px] md:w-auto gap-10 xl:gap-20 drop-shadow-xl bg-container rounded-2xl pt-7 md:pt-16 md:px-0`}
      >
        <aside
          className={`flex flex-col items-center md:items-start gap-6 md:ml-[50px] xl:ml-[100px] md:mb-16`}
        >
          <div className="relative h-[53px] w-[100px] cursor-pointer ">
            <Image
              src={
                handleTheme() === true
                  ? "/img/logos/logo.png"
                  : "/img/logos/black-logo.png"
              }
              alt={"Logo Voyager"}
              layout={"fill"}
              objectFit={"contain"}
              priority
            />
          </div>
          <span
            className={`w-[320px] text-center md:text-left md:w-[400px] lg:w-[500px] text-2xl lg:text-4xl font-medium`}
          >
            Discover the{" "}
            <span className={`uppercase font-black`}>
              wax blockchain with us
            </span>
          </span>
          <span
            className={`text-secondary text-center md:text-left w-[320px] md:w-[400px] lg:w-[500px] text-base md:text-xl font-medium`}
          >
            Voyager offers users all the tools to navigate though WAX
          </span>
          <div
            className={`flex flex-col md:flex-row gap-5 w-[200px] md:w-auto`}
          >
            <button
              className={`btn uppercase`}
              onClick={() => router.push("/explorer")}
            >
              discover tools
            </button>
            {!user && (
              <button className={`btn uppercase`} onClick={handleLogin}>
                <span>Login</span>
              </button>
            )}
          </div>
        </aside>
        <aside
          id="planets-image-Mobile"
          className={`relative w-[276px] mb-0.5 -mr-0.5 h-[100px] md:self-end md:hidden`}
        >
          <Image
            src={"/img/layout/home/planetsMobile.webp"}
            alt={"planets for mobile"}
            layout={"fill"}
            objectFit={"contain"}
            priority
          />
        </aside>
        <aside
          id="planets-image-tablet"
          className={`relative w-[200px] mb-0.5 -mr-0.5 h-[247px] self-end hidden md:flex lg:hidden`}
        >
          <Image
            src={"/img/layout/home/planetsTablet.webp"}
            alt={"plannets for tablets"}
            layout={"fill"}
            objectFit={"contain"}
            priority
          />
        </aside>
        <aside
          id="planets-image-xl"
          className={`relative lg:w-[400px] xl:-mr-0.5 lg:h-[348px] xl:w-[510px] xl:h-[444px] self-end hidden lg:flex`}
        >
          <Image
            src={"/img/layout/home/planets.webp"}
            alt={"planets for desktop"}
            layout={"fill"}
            objectFit={"contain"}
            priority
          />
        </aside>
      </div>
      <div
        className={`flex flex-col-reverse md:flex-row items-center gap-10 md:gap-24 lg:gap-32`}
      >
        <aside
          className={`relative w-[300px] h-[300px] xl:w-[420px] xl:h-[420px]`}
        >
          <Image
            src={"/img/layout/home/analyticsScreen.webp"}
            alt={"mockup for analytics screen"}
            layout={"fill"}
            objectFit={"contain"}
            priority
          />
        </aside>
        <aside
          className={`flex flex-col justify-center gap-5 text-center md:text-left w-[300px] lg:w-[500px]`}
        >
          <span className={`font-bold text-3xl lg:text-4xl`}>Analytics</span>
          <span className={`text-secondary text-xl font-medium`}>
            The stats table is a great tool to spot trending collections.{" "}
            <span className={`text-primary`}>
              Create your personal collection Stats watchlist.
            </span>
          </span>
          <span className={`text-primary text-xl font-medium`}>
            Explore the WAX blockchain with simple and easy data at the palm of
            your hand!
          </span>
        </aside>
      </div>
    </section>
  );
};
