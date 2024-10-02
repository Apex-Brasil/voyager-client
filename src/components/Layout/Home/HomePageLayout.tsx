import { AnalyticsFrame } from "./AnalyticsFrame";
import { PortfolioFrame } from "./portfolioFrame";
import { WashTradingFrame } from "./WashTradingFrame";

export const HomePageLayout = () => {
  return (
    <section className={`bg-cover bg-image bg-fixed`}>
      <AnalyticsFrame />
      <PortfolioFrame />
      <WashTradingFrame />
    </section>
  );
};
