import { useTheme } from "next-themes";
import Image from "next/legacy/image";

export const PortfolioFrame = () => {
  return (
    <section className={`flex min-h-screen flex-col gap-10 items-center py-10`}>
      <div
        className={`flex flex-col-reverse items-center md:flex-row-reverse gap-10 md:gap-16 lg:gap-32`}
      >
        <aside
          className={`relative w-[300px] h-[300px] xl:w-[420px] xl:h-[420px]`}
        >
          <Image
            src={"/img/layout/home/voyager.webp"}
            alt={"mockups in tablet"}
            layout={"fill"}
            objectFit={"contain"}
          />
        </aside>
        <aside
          className={`flex flex-col justify-center text-center md:text-left gap-5 w-[350px] lg:w-[500px]`}
        >
          <span className={`font-bold text-3xl lg:text-4xl`}>
            NFT Price charts
          </span>
          <span className={`text-secondary text-xl font-medium`}>
            Advanced price charts help to analyze trends and{" "}
            <span className={`text-primary`}>
              make it easier to time buying and selling.
            </span>
          </span>

          <span className={`text-secondary text-xl font-medium`}>
            Our integration with{" "}
            <span className={`text-primary`}>TradingView</span> —{" "}
            <a
              href="https://www.tradingview.com/screener/"
              className="underline cursor-pointer hover:text-primary"
            >
              charts and stock screeners
            </a>
            , allows you to use our tools, such as purchasing on social media,
            and performing complex technical analysis.
          </span>
        </aside>
      </div>
      <div
        className={`flex flex-col-reverse items-center md:flex-row gap-10 md:gap-16 lg:gap-32`}
      >
        <aside
          className={`relative w-[300px] h-[300px] xl:w-[420px] xl:h-[420px]`}
        >
          <Image
            src={"/img/layout/home/maleta.webp"}
            alt={"suitcase image"}
            layout={"fill"}
            objectFit={"contain"}
          />
        </aside>
        <aside
          className={`flex flex-col justify-center text-center md:text-left gap-5 w-[350px] lg:w-[500px]`}
        >
          <span className={`font-bold text-3xl lg:text-4xl`}>
            Portfolio tracker
          </span>
          <span className={`text-secondary text-xl font-medium`}>
            Our portfolio tracker gives you an{" "}
            <span className={`text-primary`}>
              up-to-date value estimate of your NFT holdings
            </span>{" "}
            (only for tracked collections). You can add several wallet addresses
            to your portfolio.
          </span>
        </aside>
      </div>
    </section>
  );
};
