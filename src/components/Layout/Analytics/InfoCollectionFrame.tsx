import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { AiOutlineInfoCircle, AiFillInfoCircle } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";

import {
  ICollectionHolders,
  ICollectionStatus,
  IDataAlreadyVoted,
  IDataWashTrading,
  IVoyagerScoreData,
} from "../../../@types";
import { getValueByStringfyNumberEn } from "../../../utils";
import Modal from "../../Modal";
import { FullModal } from "../../Modal/FullModal";
import { HoldersChart } from "../../ModalContents/DistributionHolders/HoldersChart";
import VoyagerScoreFormModal from "../../ModalContents/VoyagerScoreFormModal";
import CollectionInfoDashboard from "../../UI/Dashboard/CollectionInfoDashboard";
import { WashTradingExplanation } from "../../UI/WashTradingExplanation";
import { OverviewFrame } from "./OverviewFrame";
import { PriceChartAnalyticsFrame } from "./PriceChartAnalytics";
import { SocialActivity } from "./SocialActivityFrame";
interface InfoCollectionFrameProps {
  dataStatus: ICollectionStatus | undefined;
  dataMarket: any;
  dataVoyagerScore: IVoyagerScoreData | undefined;
  dataHolders: ICollectionHolders | undefined;
  waxToDolarExchangeRate: number;
  dataWashTrading: IDataWashTrading | undefined;
  dataAlreadyVote: IDataAlreadyVoted | undefined | null;
}

export const InfoCollectionFrame = ({
  dataStatus,
  // dataAccounts,
  dataMarket,
  dataVoyagerScore,
  dataHolders,
  waxToDolarExchangeRate,
  dataWashTrading,
  dataAlreadyVote,
}: InfoCollectionFrameProps) => {
  const [selectButton, setSelectButton] = useState<string>("Analytics");
  const [rateIsOpen, setRateIsOpen] = useState<boolean>(false);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const [toggleUSD, setToggleUSD] = useState<boolean>(false);
  const [distributionHoldersIsOpen, setDistributionHoldersIsOpen] =
    useState<boolean>(false);
  const [openWashTradingInfo, setOpenWashTradingInfo] =
    useState<boolean>(false);

  const [infoCollection, setInfoCollection] = useState<any>([
    {
      id: 1,
      name: "Voyager score",
      value: 0,
    },
    {
      id: 2,
      name: "Total Volume",
      value: 0,
    },
    {
      id: 3,
      name: "Total NFTs",
      value: 0,
    },
    {
      id: 4,
      name: "Holders",
      value: 0,
    },
  ]);

  useEffect(() => {
    if (dataVoyagerScore) {
      setInfoCollection(prevState => {
        const currentState = prevState.find(item => item.id === 1);
        currentState.value =
          +dataVoyagerScore?.totalScore?.toLocaleString("en-us", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) || 0;
        const filteredValue = prevState.filter(item => item.id !== 1);

        return [currentState, ...filteredValue];
      });
    }

    if (dataMarket) {
      setInfoCollection(prevState => {
        const currentState = prevState.find(item => item.id === 2);
        currentState.value =
          getValueByStringfyNumberEn(dataMarket?.volume)?.toLocaleString(
            "en-us",
            {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            },
          ) || 0;
        const filteredValue = prevState.filter(item => item.id !== 2);

        return [currentState, ...filteredValue];
      });
    }

    if (dataHolders) {
      setInfoCollection(prevState => {
        const currentState = prevState.find(item => item.id === 4);
        currentState.value =
          (+dataHolders?.owners)?.toLocaleString("en-us") || 0;
        const filteredValue = prevState.filter(item => item.id !== 4);

        return [currentState, ...filteredValue];
      });
    }
    if (dataHolders) {
      setInfoCollection(prevState => {
        const currentState = prevState.find(item => item.id === 3);
        currentState.value =
          (+dataHolders?.totalAssetsCirculating)?.toLocaleString("en-us") || 0;
        const filteredValue = prevState.filter(item => item.id !== 3);

        return [currentState, ...filteredValue];
      });
    }
  }, [dataHolders, dataMarket]);

  if (!dataStatus) {
    return (
      <div
        className={`flex justify-center items-center flex-col text-primary mt-40 mb-40`}
      >
        Collection info is loading
        <div className="loading-circle">
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <main
        className={
          "min-h-screen w-full flex justify-start items-center flex-col gap-5 pb-20 relative bg-[url(/img/background/white-background.webp)] box_shadow_light dark:bg-[url(/img/background/background.webp)] dark:shadow-none"
        }
      >
        <section className={`w-full px-8 border-b border-b-[#a4a4a4] `}>
          <div className="flex flex-col lg:flex-row gap-5 md:gap-10 md:justify-between justify-center items-center py-10">
            <aside className="flex lg:justify-between items-center gap-4 w-full justify-center lg:w-2/4 ">
              <div className="flex flex-col gap-1 py-2">
                <div
                  className="flex justify-start items-center gap-2"
                  onClick={() => setTooltipOpen(prevState => !prevState)}
                >
                  <div className="relative block rounded-full overflow-hidden md:w-[100px] md:h-[100px] w-[80px] h-[80px]">
                    <Image
                      src={dataStatus.img}
                      alt={`Little Monster Pink`}
                      objectFit={"contain"}
                      layout={"fill"}
                    />
                  </div>
                  <h4 className="md:text-[24px] text-[20px] text-primary gap-2">
                    <div className="flex justify-start items-center gap-2">
                      {dataStatus.collection_name}

                      {tooltipOpen && !distributionHoldersIsOpen ? (
                        <AiFillInfoCircle className="block lg:hidden" />
                      ) : (
                        <AiOutlineInfoCircle className="block lg:hidden" />
                      )}
                    </div>
                    <div className={`text-sm dark:text-[#FFFFFFB3]`}>
                      {dataStatus.name}
                    </div>
                  </h4>
                </div>
                <span
                  className={`dark:text-[#FFFFFFB3] font-medium h-[120px] md:h-[96px] 2xl:w-full w-full overflow-scroll md:overflow-auto text-left mt-1`}
                >
                  {dataStatus.data?.description || ""}
                </span>

                {tooltipOpen && !distributionHoldersIsOpen && (
                  <div
                    className={`absolute block top-5 md:top-0 z-[99] left-0 p-4 text-xs text-center dark:bg-black/95 dark:shadow-none bg-white shadow-xl`}
                    onClick={() => setTooltipOpen(false)}
                  >
                    <div
                      className={`rounded-[20px] p-5 dark:bg-[#181a1b] bg-white`}
                    >
                      {dataStatus.data?.description || ""}
                    </div>
                    <div>
                      <div
                        className={`w-full p-5 grid grid-rows-2 grid-flow-col gap-4 justify-center items-center mt-4 rounded-[20px]`}
                      >
                        <CollectionInfoDashboard
                          infoCollection={infoCollection}
                          waxToDolarExchangeRate={waxToDolarExchangeRate}
                          toggleUSD={toggleUSD}
                          setDistributionHoldersIsOpen={
                            setDistributionHoldersIsOpen
                          }
                          setRateIsOpen={setRateIsOpen}
                          setToggleUSD={setToggleUSD}
                          dataAlreadyVote={dataAlreadyVote}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </aside>

            <aside className={`flex flex-col items-center gap-5`}>
              <div
                className={`min-w-[360px] px-5 py-2 hidden lg:flex flex-wrap justify-center items-start md:justify-start md:flex-nowrap gap-4 md:gap-10 lg:gap-4 xl:gap-10 rounded-3xl dark:bg-[#00000099] dark:shadow-none bg-white box_shadow_light`}
              >
                <CollectionInfoDashboard
                  infoCollection={infoCollection}
                  waxToDolarExchangeRate={waxToDolarExchangeRate}
                  toggleUSD={toggleUSD}
                  setDistributionHoldersIsOpen={setDistributionHoldersIsOpen}
                  setRateIsOpen={setRateIsOpen}
                  setToggleUSD={setToggleUSD}
                  dataAlreadyVote={dataAlreadyVote}
                />
              </div>
              <span
                className={`font-bold text-xl flex items-center gap-1.5 p-2 dark:bg-white/20 bg-[#9788f564] rounded-xl`}
              >
                Wash Trading score:{" "}
                <span>
                  {dataWashTrading?.wash_trading_score.toFixed(2) || 0}
                </span>{" "}
                <BsInfoCircle
                  onClick={() => setOpenWashTradingInfo(true)}
                  size={17}
                  className="cursor-pointer"
                />
              </span>
            </aside>
          </div>
          <div className="explorer-nav w-full">
            <div className="flex justify-start gap-10 items-end h-[44px]">
              {/* "overview" tab below */}
              {["Analytics", "Social Activity"].map((title, index) => (
                <span
                  key={index}
                  className={` ${
                    selectButton === title
                      ? "border-[#614cea] bg-[#614cea23] "
                      : "border-transparent"
                  } border-2 border-solid cursor-pointer font-bold hover:text-[#9788f5] rounded-t-lg hover:shadow-[#9788f5] hover:shadow-md transition_time p-3 hover:border-[#614cea] text-sm md:text-base whitespace-nowrap`}
                  onClick={() => setSelectButton(title)}
                >
                  {title}
                </span>
              ))}
            </div>
          </div>
        </section>

        {selectButton === "Overview" && <OverviewFrame />}

        {selectButton === "Social Activity" && dataHolders && (
          <SocialActivity collection={dataHolders.collectionName} />
        )}
        {selectButton === "Analytics" && <PriceChartAnalyticsFrame />}
      </main>
      {dataHolders && (
        <Modal
          isOpen={distributionHoldersIsOpen}
          setIsOpen={setDistributionHoldersIsOpen}
        >
          <HoldersChart data={dataHolders} />
        </Modal>
      )}
      {dataStatus && (
        <Modal isOpen={rateIsOpen} setIsOpen={setRateIsOpen} scroll>
          <VoyagerScoreFormModal collection={dataStatus} />
        </Modal>
      )}

      {openWashTradingInfo && (
        <FullModal
          setIsOpen={setOpenWashTradingInfo}
          isOpen={openWashTradingInfo}
        >
          <WashTradingExplanation />
        </FullModal>
      )}
    </>
  );
};
