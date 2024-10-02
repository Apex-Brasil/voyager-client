import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { upperFirst } from "utils-react";

import { QueryCacheKeyGetters } from "../../../services/queryService";
import { SocialSalesItem } from "../../UI/Items/SocialSalesItem";

export const SocialActivity = ({
  collection,
  onlyMobile = false,
}: {
  collection: string;
  onlyMobile?: boolean;
}) => {
  const [type, setType] = useState("sales");

  const { data, isLoading, error } = useQuery({
    queryKey: ["sales", collection],
    queryFn: () => QueryCacheKeyGetters.getSales(collection as string),
  });

  const {
    data: auctionsData,
    isLoading: auctionsIsLoading,
    error: auctionsError,
  } = useQuery({
    queryKey: ["auctions", collection],
    queryFn: () => QueryCacheKeyGetters.getAuctions(collection as string),
  });

  const renderItems = (type: string) => {
    const dataSales = {
      renderingData: data || [],
      renderingIsLoading: isLoading,
      renderingError: error,
    };
    const dataAuctions = {
      renderingData: auctionsData || [],
      renderingIsLoading: auctionsIsLoading,
      renderingError: auctionsError,
    };

    const mappingAuctions =
      auctionsData && Array.isArray(auctionsData)
        ? auctionsData?.map(auction => auction)
        : [];
    const mappingSales =
      data && Array.isArray(data) ? data?.map(sale => sale) : [];
    const dataAuctionsAndSales = {
      renderingData: [...mappingAuctions, ...mappingSales] || [],
      renderingIsLoading: isLoading || auctionsIsLoading,
      renderingError: error || auctionsError,
    };

    const variables = {
      sales: dataSales,
      auctions: dataAuctions,
      all: dataAuctionsAndSales,
    };

    const { renderingData, renderingIsLoading, renderingError } =
      variables[type];

    if (renderingIsLoading) {
      return <div className="loading-circle mx-auto"></div>;
    }

    if (renderingError) {
      return <div className="mx-auto">Error getting {type} info</div>;
    }

    if (renderingData) {
      if (renderingData.length === 0) {
        return (
          <span className="text-center">
            Can&apos;t find any{" "}
            {type === "all"
              ? "sale or auction"
              : type.slice(0, type.length - 1)}
            . We may have a issue
          </span>
        );
      }

      return (
        <div className={`overflow-x-auto lg:overflow-visible w-full`}>
          <div
            className={`dark:bg-white/10 bg-[#9788f564] justify-between  py-5 px-6 border-2 border-[#a4a4a4] border-b-transparent border-t-transparent first-of-type:rounded-t-lg  first-of-type:border-t-[#a4a4a4] last-of-type:rounded-b-lg last-of-type:border-b-[#a4a4a4] xl:justify-between xl:w-full w-max min-w-full flex text-center gap-10 `}
          >
            <span className="hover:underline cursor-pointer font-semibold w-[100px]">
              Seller
            </span>
            <span className="hover:underline cursor-pointer font-semibold w-[125px]">
              Assets
            </span>
            <span className="hover:underline cursor-pointer font-semibold w-[100px]">
              Buyer
            </span>
            <span className="w-[75px] font-semibold whitespace-nowrap">
              Price
            </span>
            <span className="w-[110px] font-semibold">Time</span>
          </div>
          <div
            className={`  flex flex-col justify-between items-between w-full`}
          >
            {renderingData.slice(0, 10).map((item, index) => (
              <SocialSalesItem
                key={index}
                item={item}
                index={index}
                type={"sales"}
                onlyMobile={onlyMobile}
              />
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className={` w-[95%] flex flex-col justify-center items-center `}>
      <div className="w-full flex justify-between mb-4 ">
        <span>
          <p className="text-2xl font-bold text-primary">Social Activity</p>
        </span>
        <div>
          <select
            onChange={evt => setType(evt.target.value)}
            value={type}
            className={`drop-shadow-2xl h-full w-[100px] rounded-lg text-primary font-semibold p-2 outline-none dark:shadow-none box_shadow_light`}
          >
            {["sales", "auctions", "all"].map((e, _) => (
              <option key={_} value={e}>
                {upperFirst(e)}
              </option>
            ))}
          </select>
        </div>
      </div>
      {renderItems(type)}
    </div>
  );
};
