import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AiOutlineEnter } from "react-icons/ai";
import { BsArrowClockwise, BsSearch } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";

import { CollectionCardItem } from "../..";
import { api } from "../../../services/api";

export const ExplorerFrame = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingFetch, setLoadingFetch] = useState<boolean>(true);
  const [error, setError] = useState<any | undefined>();
  const [inputSearch, setInputSearch] = useState<string>("");
  const [filterData, setFilterData] = useState<any[]>(data);
  const [sortingParam, setSortingParam] = useState<string>("a-z");
  const [toggleWhitelist, setToggleWhitelist] = useState<boolean>(true);
  const [recentsData, setRecentsData] = useState([]);
  const { theme } = useTheme();
  useEffect(() => {
    setRecentsData(JSON?.parse(localStorage?.getItem("recents") ?? "[]") || []);
  }, []);

  const explorerRequest = async (page: number) => {
    setLoadingFetch(true);
    try {
      const response = await api.get(`/collection?page=${page}&whitelist=true`);
      const data = response.data;

      if (page === 1) {
        setData(data);
      } else {
        setData(prevState => [...prevState, ...data]);
      }
      setPage(prevState => prevState + 1);
    } catch (error) {
      setError(error);
    }
    setLoadingFetch(false);
  };

  const searchRequest = async () => {
    setLoadingFetch(true);
    try {
      const response = await api.get(
        `/collection?find=${inputSearch}${
          toggleWhitelist ? "&whitelist=1" : ""
        }`,
      );
      const data = response.data;

      setData(data);
    } catch (error) {
      setError(error);
    }
    setLoadingFetch(false);
  };

  useEffect(() => {
    explorerRequest(1);
  }, []);

  const handleKeyPress = (e: any, clicked: boolean) => {
    if (!clicked) {
      if (e.key === "Enter") {
        if (inputSearch && inputSearch !== "") {
          searchRequest();
        } else {
          explorerRequest(1);
        }
      }
    }

    if (clicked) {
      if (inputSearch && inputSearch !== "") {
        searchRequest();
      } else {
        explorerRequest(1);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    if (data) {
      const filteredDataTmp = data.sort((a, b) => {
        switch (sortingParam) {
          case "a-z":
            return a.name >= b.name ? 1 : -1;
          case "z-a":
            return a.name <= b.name ? 1 : -1;
          case "sales_desc":
            return +a.sales <= +b.sales ? 1 : -1;
          case "sales_asc":
            return +a.sales >= +b.sales ? 1 : -1;
          case "volume_desc":
            return +a.volume <= +b.volume ? 1 : -1;
          case "volume_asc":
            return +a.volume >= +b.volume ? 1 : -1;
          default:
            return a.name >= b.name ? 1 : -1;
        }
      });
      setFilterData(filteredDataTmp);
      setLoading(false);
    }
  }, [data, inputSearch, sortingParam]);

  const renderCards = type => {
    let cards;

    switch (type) {
      case "recents":
        cards = recentsData;
        break;
      case "collections":
        cards = filterData;
        break;
      default:
        cards = filterData;
        break;
    }

    if (error) {
      return <div>Error</div>;
    }

    if (cards) {
      if (!cards?.length) {
        return type === "recents" ? null : (
          <span role="status">Nothing to show here.</span>
        );
      }

      return (
        <div
          className={`grid justify-items-center md:justify-items-start grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-4`}
        >
          {cards.map((item, index) => {
            return (
              <CollectionCardItem
                key={index}
                item={item}
                ctaMessage="View Analytics"
                redirectsTo="explorer"
              />
            );
          })}
        </div>
      );
    }
  };

  const handleSearch = (param: string) => {
    setInputSearch(param);
  };

  const handleSortingParam = param => {
    setSortingParam(param);
  };
  const handleToggleWhitelist = () => {
    // TODO: setToggleWhitelist(prevState => !prevState);
  };

  return (
    <main
      className={`flex items-center justify-center bg-image bg-cover bg-fixed py-10`}
    >
      <section
        className={`flex flex-col gap-5 min-h-screen min-w-screen bg-image bg-cover bg-fixed w-full md:max-w-[90%] px-2`}
      >
        <div
          className={`flex flex-col-reverse md:flex-row items-center gap-5 w-full`}
        >
          <div className="relative flex justify-center !cursor-not-allowed group items-center gap-[10px]">
            <div className="hidden !text-white text-center absolute top-[45px] rounded-[20px] left-[25px] right-[-75px] group-hover:block bg-black before:content-[' '] before:w-[0] before:h-[0] before:bg-transparent before:border-[5px] before:border-l-transparent before:border-r-transparent before:border-b-[#000] before:border-t-0 before:border-b-[10px] before:border-l-[5px] before:border-r-[5px] before:absolute before:border-solid before:top-[-10px] before:left-[50%]">
              Collections approved by AtomicHub or Voyager
            </div>
            Only Badged
            <label className="switch">
              <input
                type="checkbox"
                onChange={handleToggleWhitelist}
                checked={toggleWhitelist}
                className="!cursor-not-allowed"
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="relative shadow_search_bar md:!w-[215px] !h-[48px] w-full cursor-pointer overflow-hidden rounded-lg ">
            <select
              className={` md:!w-[215px] !h-[48px] w-full !rounded-lg !text-primary !font-semibold !p-2 !outline-none`}
              onChange={evt => handleSortingParam(evt.target.value)}
              value={sortingParam}
            >
              <option value="a-z">A - Z</option>
              <option value="z-a">Z - A</option>
              <option value="sales_desc">Sales Descending</option>
              <option value="sales_asc">Sales Ascending</option>
              <option value="volume_desc">Volume Descending</option>
              <option value="volume_asc">Volume Ascending</option>
            </select>
          </div>
          <ExplorerSearchBarWrapper
            handleKeyPress={handleKeyPress}
            handleSearch={handleSearch}
            inputSearch={inputSearch}
          />
        </div>
        {!loading && !loadingFetch ? (
          <>
            {recentsData.length > 0 && inputSearch === "" && (
              <div className="mb-10">
                <h2 className="text-[32px] mb-4">
                  Recent Searches{" "}
                  <span className="text-[24px] text-[#a4a4a4]">
                    {recentsData.length}
                  </span>
                </h2>
                {renderCards("recents")}
              </div>
            )}
            <div>
              <h2 className="text-[32px] mb-4">
                Collections{" "}
                <span className="text-[24px] text-[#a4a4a4]">
                  {filterData.length}
                </span>
              </h2>
              {renderCards("collections")}
            </div>
            {(!inputSearch || inputSearch === "") && (
              <button
                className="btn mx-auto flex items-center justify-center gap-2"
                onClick={() => explorerRequest(page)}
              >
                <BsArrowClockwise className="font-bold" /> Load more
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col">
            <Skeleton
              width={170}
              height={32}
              baseColor={`${theme === "dark" ? "#0E0A24" : ""}`}
              highlightColor={`${theme === "dark" ? "#0B0B0D" : ""}`}
              className="mb-4"
              borderRadius={18}
            />
            <div className="grid justify-items-center md:justify-items-start grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-4">
              {Array.from([0, 1, 2, 3, 4]).map((_, index) => {
                return (
                  <Skeleton
                    key={index}
                    count={4}
                    width={310}
                    height={190}
                    baseColor={`${theme === "dark" ? "#0E0A24" : ""}`}
                    highlightColor={`${theme === "dark" ? "#0B0B0D" : ""}`}
                    className="mt-3"
                    borderRadius={18}
                  />
                );
              })}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

interface ExplorerSearchBarWrapperProps {
  handleSearch: (param: string) => void;
  inputSearch: string;
  handleKeyPress: (e: any, clicked: boolean) => void;
}

const ExplorerSearchBarWrapper = ({
  handleSearch,
  inputSearch,
  handleKeyPress,
}: ExplorerSearchBarWrapperProps) => {
  return (
    <div className="relative md:flex-1 w-full flex">
      <input
        className={`shadow_search_bar w-full h-[48px] !drop-shadow-2xl rounded-lg text-primary font-semibold pl-8 outline-none`}
        placeholder="Search Collections By Name"
        onChange={evt => handleSearch(evt.target.value)}
        value={inputSearch}
        onKeyDown={evt => handleKeyPress(evt, false)}
      />
      <div className="absolute left-3 top-[33%]">
        <BsSearch />
      </div>
      {inputSearch && inputSearch !== "" && (
        <button
          id="entermouse"
          className="text-xs absolute right-2 top-2 flex items-center p-2 bg-black/25 dark:bg-white/25 text-black dark:text-white rounded-lg cursor-pointer active:translate-y-2 transition_time font-semibold"
          onClick={click => handleKeyPress(click, true)}
        >
          Enter <AiOutlineEnter />
        </button>
      )}
    </div>
  );
};
