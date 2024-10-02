/* eslint-disable camelcase */

import { useQuery } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";
import { BsArrowClockwise, BsArrowUp } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";

import { IBalance, ISpecificToken } from "../../../@types";
import { useGoogleAuth } from "../../../hooks/useGoogleAuth";
import { QueryCacheKeyGetters } from "../../../services/queryService";
import { waxInDollarValues } from "../../../utils/prices";
import TokensItem from "./TokensItem";
import TokensLabelItem from "./TokensLabelItem";
const TokensFrame = () => {
  const [currentIndexPagination, setCurrentIndexPagination] = useState(10);
  const [isHideSmallBalances, setIsHideSmallBalances] = useState(false);
  const { user } = useGoogleAuth();
  const labels = [
    "Token",
    "wallet",
    "Alcor LP Balance",
    "Taco LP Balance",
    "Total Tokens",
    "Total Value (WAX)",
  ];

  const {
    data: dataUserBalances,
    error: errorUserBalances,
    isLoading: isLoadingUserBalances,
  } = useQuery({
    queryKey: ["userBalances"],
    queryFn: () => QueryCacheKeyGetters.getUserBalances(user?.account || ""),
  });

  const {
    data: dataTokensMarket,
    error: errorTokensMarket,
    isLoading: isLoadingTokensMarket,
  } = useQuery({
    queryKey: ["tokensMarket"],
    queryFn: () => QueryCacheKeyGetters.getTokensMarket(),
  });

  const { data: medianData } = useQuery({
    queryKey: ["medianData"],
    queryFn: () => QueryCacheKeyGetters.getMedian(),
  });

  const onlyWaxBaseToken = dataTokensMarket?.filter(
    (token: ISpecificToken) => token.base_token.symbol.name === "WAX",
  );

  const isDataVerify =
    !isLoadingUserBalances &&
    dataUserBalances &&
    !isLoadingTokensMarket &&
    onlyWaxBaseToken;

  const dataBalancesWithTotalValue = useMemo(() => {
    if (!isDataVerify) {
      return [];
    }

    const dataBalances = dataUserBalances.map((balance: IBalance) => {
      const token = onlyWaxBaseToken.find(
        (token: ISpecificToken) =>
          token.quote_token.symbol.name === balance.currency,
      );

      return {
        ...balance,
        tokenInfos: {
          token_currency: token?.quote_token.symbol.name || balance.currency,
          token_last_price: token?.last_price || 0,
        },
      };
    });

    const temp = dataBalances.map((balance: IBalance) => {
      const getTacoLPinWax =
        Number(balance.taco_LP.amount) *
        Number(balance.tokenInfos.token_last_price);

      const getAlcorLPinWax =
        Number(balance.alcor_LP.amount) *
        Number(balance.tokenInfos.token_last_price);

      const getWalletInWax =
        Number(balance.amount) * Number(balance.tokenInfos.token_last_price);

      if (balance.currency !== "WAX") {
        return {
          ...balance,
          taco_LP: {
            ...balance.taco_LP,
            wax: getTacoLPinWax,
          },
          alcor_LP: {
            ...balance.alcor_LP,
            wax: getAlcorLPinWax,
          },
          amountInwax: getWalletInWax,
        };
      }
      return {
        ...balance,
        taco_LP: {
          ...balance.taco_LP,
          wax: balance.taco_LP.amount,
        },
        alcor_LP: {
          ...balance.alcor_LP,
          wax: balance.alcor_LP.amount,
        },
        amountInwax: balance.amount,
      };
    });

    return temp.filter(val => Number(val.amount) > 0);
  }, [onlyWaxBaseToken, dataUserBalances]);

  return (
    <main
      id="rankTop"
      className={`flex items-center justify-center bg-image bg-cover bg-fixed py-10`}
    >
      <section
        className={`flex flex-col gap-10 min-h-screen min-w-screen bg-image bg-cover bg-fixed w-full xl:max-w-[90%] px-2`}
      >
        <div className="flex flex-col self-center items-center gap-5">
          <h4>User Balances</h4>{" "}
          <UserInfos
            dataBalancesWithTotalValue={dataBalancesWithTotalValue}
            medianData={medianData}
          />
          <span
            onClick={() => setIsHideSmallBalances(prev => !prev)}
            className={`underline -mb-6 cursor-pointer text-[#9788f5] font-semibold`}
          >
            {isHideSmallBalances ? "Show" : "Hide"} Small balances
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <div className={`overflow-x-auto `}>
            <div className="xl:w-full w-max flex justify-start gap-10 border-b border-[#333] dark:border-[#a4a4a4] xl:justify-between px-2">
              {labels.map(label => (
                <TokensLabelItem key={label} label={label} />
              ))}
            </div>

            <div>
              <RenderItems
                currentIndexPagination={currentIndexPagination}
                errorTokensMarket={errorTokensMarket}
                errorUserBalances={errorUserBalances}
                filteredBalances={
                  isHideSmallBalances
                    ? dataBalancesWithTotalValue.filter(
                        val => Number(val.amountInwax) > 1,
                      )
                    : dataBalancesWithTotalValue
                }
                isLoadingTokensMarket={isLoadingTokensMarket}
                isLoadingUserBalances={isLoadingUserBalances}
              />
            </div>

            {!isLoadingUserBalances &&
            dataBalancesWithTotalValue.length > 10 ? (
              <div className={`mt-4 justify-center flex items-center gap-2 `}>
                <button
                  className="btn  flex items-center justify-center gap-2 "
                  onClick={() => {
                    setCurrentIndexPagination(prev => prev + 10);
                  }}
                >
                  <BsArrowClockwise className="font-bold" /> Load more
                </button>
                <button
                  className={`btn !rounded-full !p-3`}
                  onClick={() => {
                    setCurrentIndexPagination(10);
                  }}
                >
                  <BsArrowUp size={20} />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
};

export default TokensFrame;

function RenderItems({
  isLoadingUserBalances,
  isLoadingTokensMarket,
  errorUserBalances,
  errorTokensMarket,
  filteredBalances,
  currentIndexPagination,
}) {
  const { theme } = useTheme();
  if (isLoadingUserBalances || isLoadingTokensMarket) {
    return (
      <div className="flex flex-col">
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={index}
            className={`flex w-max xl:w-full h-[90px] justify-start gap-10 items-center  px-2 rounded-sm xl:justify-between dark:even:bg-white/20 even:bg-[#9788f564]`}
          >
            <span className="min-w-[200px] w-[200px] flex gap-4 items-center">
              <Skeleton
                width={108}
                height={44}
                baseColor={`${theme === "dark" ? "#0E0A24" : ""}`}
                highlightColor={`${theme === "dark" ? "#0B0B0D" : ""}`}
                borderRadius={18}
              />
            </span>
            <span className="min-w-[160px] !w-[160px] font-semibold whitespace-nowrap">
              <Skeleton
                baseColor={`${theme === "dark" ? "#0E0A24" : ""}`}
                highlightColor={`${theme === "dark" ? "#0B0B0D" : ""}`}
                borderRadius={18}
              />
            </span>
            <span className="min-w-[160px] w-[160px] max-w-[160px] font-semibold">
              <Skeleton
                baseColor={`${theme === "dark" ? "#0E0A24" : ""}`}
                highlightColor={`${theme === "dark" ? "#0B0B0D" : ""}`}
                borderRadius={18}
              />
            </span>
            <span className="min-w-[160px] w-[160px] font-semibold">
              <Skeleton
                baseColor={`${theme === "dark" ? "#0E0A24" : ""}`}
                highlightColor={`${theme === "dark" ? "#0B0B0D" : ""}`}
                borderRadius={18}
              />
            </span>
            <span className="min-w-[160px] w-[160px] font-semibold">
              <Skeleton
                baseColor={`${theme === "dark" ? "#0E0A24" : ""}`}
                highlightColor={`${theme === "dark" ? "#0B0B0D" : ""}`}
                borderRadius={18}
              />
            </span>
            <span className="w-[160px] min-w-[160px] font-semibold">
              <Skeleton
                baseColor={`${theme === "dark" ? "#0E0A24" : ""}`}
                highlightColor={`${theme === "dark" ? "#0B0B0D" : ""}`}
                borderRadius={18}
              />
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (errorUserBalances || errorTokensMarket) {
    return "Fetch Error";
  }

  if (filteredBalances) {
    return filteredBalances
      .sort((a, b) => b.amountInwax - a.amountInwax)
      .slice(0, currentIndexPagination)
      .map((balance, index) => <TokensItem key={index} balance={balance} />);
  }

  return null;
}

function UserInfos({ dataBalancesWithTotalValue, medianData }) {
  const totalLPInWax = dataBalancesWithTotalValue
    .filter(val => val.tokenInfos.token_last_price >= 0)
    .reduce(
      (acc, balance) =>
        acc + Number(balance.alcor_LP.wax) + Number(balance.taco_LP.wax),
      0,
    );

  const totalInWalletInWax = dataBalancesWithTotalValue
    .filter(val => val.tokenInfos.token_last_price >= 0)
    .reduce((acc, balance) => acc + Number(balance.amountInwax), 0);

  const totalSums = totalLPInWax + totalInWalletInWax;

  console.log(medianData, "medianData");

  const [, listingPriceTotalSumsDollarFormatted] = waxInDollarValues(
    totalSums.toString(),
    1,
    medianData?.median,
  );

  const [, listingPriceTotalLPDollarFormatted] = waxInDollarValues(
    totalLPInWax.toString(),
    1,
    medianData?.median,
  );

  const [, listingPriceTotalWalletDollarFormatted] = waxInDollarValues(
    totalInWalletInWax.toString(),
    1,
    medianData?.median,
  );
  return (
    <>
      <section
        className={`hidden md:flex justify-center gap-36  rounded-lg dark:bg-white/20 bg-[#9788f564] p-10`}
      >
        <aside className={`flex flex-col gap-1`}>
          <span className={`text-sm font-regular`}>Portfolio Value: </span>
          <span className={`text-lg font-semibold`}>
            {totalSums.toFixed(4)} WAX
          </span>
          <span className={`font-medium`}>
            = {listingPriceTotalSumsDollarFormatted}
          </span>
        </aside>
        <aside className={`flex flex-col gap-1`}>
          <span className={`text-sm font-regular`}>Wallet: </span>
          <span className={`text-lg font-semibold`}>
            {totalInWalletInWax.toFixed(4)} WAX
          </span>
          <span className={`font-medium`}>
            = {listingPriceTotalWalletDollarFormatted}
          </span>
        </aside>
        <aside className={`flex flex-col gap-1`}>
          <span className={`text-sm font-regular`}>Liquidity Pools: </span>
          <span className={`text-lg font-semibold`}>
            {totalLPInWax.toFixed(4)} WAX
          </span>
          <span className={`font-medium`}>
            = {listingPriceTotalLPDollarFormatted}
          </span>
        </aside>
      </section>

      <section className={`md:hidden flex flex-col justify-center gap-5`}>
        <aside
          className={`flex flex-col gap-1 dark:bg-white/20 bg-[#9788f564] p-5 rounded-lg`}
        >
          <span className={`text-sm font-regular`}>Portfolio Value: </span>
          <span className={`text-lg font-semibold`}>
            {totalSums.toFixed(4)} WAX
          </span>
          <span className={`font-medium`}>
            = {listingPriceTotalSumsDollarFormatted}
          </span>
        </aside>
        <div className={`flex items-center gap-5`}>
          <aside
            className={`flex flex-col gap-1 dark:bg-white/20 bg-[#9788f564] p-5 rounded-lg`}
          >
            <span className={`text-sm font-regular`}>Wallet: </span>
            <span className={`text-lg font-semibold`}>
              {totalInWalletInWax.toFixed(4)} WAX
            </span>
            <span className={`font-medium`}>
              = {listingPriceTotalWalletDollarFormatted}
            </span>
          </aside>
          <aside
            className={`flex flex-col gap-1 dark:bg-white/20 bg-[#9788f564] p-5 rounded-lg`}
          >
            <span className={`text-sm font-regular`}>Liquidity Pools: </span>
            <span className={`text-lg font-semibold`}>
              {totalLPInWax.toFixed(4)} WAX
            </span>
            <span className={`font-medium`}>
              = {listingPriceTotalLPDollarFormatted}
            </span>
          </aside>
        </div>
      </section>
    </>
  );
}
