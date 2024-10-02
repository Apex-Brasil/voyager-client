/* eslint-disable camelcase */

import { useQuery } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { BsArrowClockwise, BsArrowUp } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import { upperFirst } from "utils-react";

import { api } from "../../../services/api";
import { QueryCacheKeyGetters } from "../../../services/queryService";
import RankingItem from "../../UI/Items/RankingItem";
import RankingLabelItem from "../../UI/Items/RankingLabelItem";
import { filterOptions, labels, volumeFilterLabels } from "./dataLabes";

const RankingFrame = () => {
  const router = useRouter();
  const [dataFetch, setDataFetch] = useState<any>();
  const [sortBy, setSortBy] = useState<string>(filterOptions[0].value);
  const [currentIndexToPagination, setCurrentIndexToPagination] = useState(10);
  const [isLoadingFetch, setIsLoadingFetch] = useState(true);
  const [errorFetch, setErrorFetch] = useState<null | string>(null);

  const { data: dataAllVoyager } = useQuery({
    queryKey: ["allVoyager"],
    queryFn: () => QueryCacheKeyGetters.allVoyagerScore(),
  });

  console.log(`dataAllVoyager`, dataAllVoyager);

  const {
    data: medianData,
    isLoading: isLoadingMedianData,
    error: errorMedianData,
  } = useQuery({
    queryKey: ["medianData"],
    queryFn: () => QueryCacheKeyGetters.getMedian(),
  });

  useEffect(() => {
    const explorerRequest = async () => {
      setIsLoadingFetch(true);
      try {
        const response = await api.get(
          `/collection?whitelist=true&isRankedPage=true`,
        );
        const data = response.data;
        const formatedData = data.map(el => {
          const totalScore =
            dataAllVoyager?.find(
              elScore => el?.collection_name === elScore?.collection_name,
            )?.totalScore || 0;

          return { ...el, totalScore };
        });

        setDataFetch(formatedData);
      } catch (error) {
        setErrorFetch(error as string);
      }
      setIsLoadingFetch(false);
    };

    explorerRequest();
  }, [dataAllVoyager]);

  const queryVolumeFilter = String(router.query.filter);

  const filteredData = useMemo(() => {
    if (!isLoadingFetch && !isLoadingMedianData) {
      if (sortBy === "volume") {
        return dataFetch.sort((a, b) => {
          return (
            Number(b.volumeFilters?.[queryVolumeFilter]) -
            Number(a.volumeFilters?.[queryVolumeFilter])
          );
        });
      }

      if (sortBy === "sales") {
        return dataFetch.sort((a, b) => {
          return Number(b.sales) - Number(a.sales);
        });
      }
    }
    return [];
  }, [
    dataFetch,
    queryVolumeFilter,
    isLoadingFetch,
    isLoadingMedianData,
    sortBy,
  ]);
  const handleSortBy = (sort: { label: string; value: string }) => {
    if (sortBy === sort.value) return null;
    setSortBy(sort.value);
  };

  return (
    <main
      id="rankTop"
      className={`flex items-center justify-center bg-image bg-cover bg-fixed py-10`}
    >
      <section
        className={`flex flex-col gap-5 min-h-screen min-w-screen bg-image bg-cover bg-fixed w-full xl:max-w-[90%] px-2`}
      >
        <div className="flex justify-between">
          <h4>Ranking per Collection</h4>
          {sortBy === "volume" && (
            <aside className={`flex flex-col gap-1`}>
              <span className={`text-primary font-semibold`}>Sort by:</span>
              <select
                className={`drop-shadow-2xl w-[120px] h-[48px] rounded-lg text-primary font-semibold p-2 outline-none box_shadow_light dark:shadow-none`}
                onChange={evt =>
                  router.push({
                    query: {
                      ...router.query,
                      filter: evt.target.value,
                    },
                  })
                }
                value={queryVolumeFilter}
              >
                {volumeFilterLabels.map(item => (
                  <option key={item.label} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </aside>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <ul className="flex gap-6">
              {filterOptions.map((e, index) => (
                <li
                  key={index}
                  onClick={() => handleSortBy(e)}
                  className={` ${
                    sortBy === e.value
                      ? "border-[#614cea] bg-[#614cea23]"
                      : "border-transparent"
                  } border-2 border-solid cursor-pointer font-bold hover:text-[#9788f5] rounded-lg hover:shadow-[#9788f5] hover:shadow-md transition_time p-3 hover:border-[#614cea] `}
                >
                  {upperFirst(e.label)}
                </li>
              ))}
            </ul>
          </div>
          <div className={`overflow-x-auto `}>
            <div className="xl:w-full w-max flex justify-start gap-10 border-b border-[#333] dark:border-[#a4a4a4] xl:justify-between px-2">
              {labels.map(label => (
                <RankingLabelItem key={label} label={label} />
              ))}
            </div>

            <div>
              <RenderItems
                currentIndexToPagination={currentIndexToPagination}
                errorFetch={errorFetch}
                errorMedianData={errorMedianData}
                isLoadingFetch={isLoadingFetch}
                isLoadingMedianData={isLoadingMedianData}
                medianData={medianData?.median}
                filteredData={filteredData}
              />
            </div>

            {!isLoadingMedianData && !isLoadingFetch ? (
              <div className={`mt-4 justify-center flex items-center gap-2 `}>
                <button
                  className="btn  flex items-center justify-center gap-2 "
                  onClick={() => {
                    setCurrentIndexToPagination(prev => prev + 10);
                  }}
                >
                  <BsArrowClockwise className="font-bold" /> Load more
                </button>
                <button
                  className={`btn !rounded-full !p-3`}
                  onClick={() => {
                    setCurrentIndexToPagination(10);
                    router.push("#rankTop");
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

export default RankingFrame;

const RenderItems = ({
  isLoadingFetch,
  isLoadingMedianData,
  errorFetch,
  errorMedianData,
  medianData,
  currentIndexToPagination,
  filteredData,
}) => {
  const { theme } = useTheme();
  if (isLoadingFetch || isLoadingMedianData) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from([0, 1, 2, 3, 4, 5, 6, 7]).map((_, index) => (
          <div
            key={index}
            className={`flex w-max xl:w-full h-[100px] justify-start gap-10 items-center  px-2 rounded-sm xl:justify-between dark:even:bg-white/20 even:bg-[#9788f564]`}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7].map(item => (
              <span key={item} className="!w-[60px] min-w-[60px] font-bold">
                <Skeleton
                  baseColor={`${theme === "dark" ? "#00000030" : "#ffffff50"}`}
                  highlightColor={`${
                    theme === "dark" ? "#00000030" : "#ffffff50"
                  }`}
                  borderRadius={18}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (errorFetch || errorMedianData) {
    return "Fetch Error";
  }

  if (filteredData && medianData) {
    return filteredData
      .slice(0, currentIndexToPagination)
      .map((e, index) => (
        <RankingItem
          position={index + 1}
          key={index}
          itemData={e}
          medianRate={medianData}
        />
      ));
  }

  return null;
};
