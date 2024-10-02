import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineEnter } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

import { api } from "../../../../services/api";
import { optimizedLoader } from "../../../../utils";

export const SearchBar = () => {
  const router = useRouter();
  const [setOpenSearch, setIsOpenSearch] = useState(false);
  const [inputSearch, setInputSearch] = useState<string | undefined>();
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [data, setData] = useState<any[] | undefined>();
  const [error, setError] = useState<any | undefined>();

  const searchRequest = async () => {
    setLoadingFetch(true);
    try {
      const response = await api.get(
        `collection?find=${inputSearch}&whitelist=1&limit=25`,
      );
      const data = response.data;

      setData(data);
    } catch (error) {
      setError(error);
    }
    setLoadingFetch(false);
  };

  const handleKeyPress = (e: any, clicked: boolean) => {
    if (!clicked) {
      if (e.key === "Enter") {
        if (inputSearch && inputSearch !== "") {
          searchRequest();
          setIsOpenSearch(true);
        }
      }
    }

    if (clicked) {
      if (inputSearch && inputSearch !== "") {
        searchRequest();
        setIsOpenSearch(true);
      }
    }
  };

  return (
    <div
      className={`shadow_search_bar placeholder-black text-black dark:text-white dark:placeholder-white dark:bg-[#3c3c3df4] w-[335px] relative gap-2 p-2 flex justify-start items-center ${
        data && setOpenSearch ? "rounded-t-lg" : "rounded-lg"
      } `}
      onMouseLeave={() => setIsOpenSearch(false)}
    >
      {loadingFetch ? (
        <div className="loading-circle !w-[25px] !h-[25px] !border-t-black dark:!border-t-white"></div>
      ) : (
        <CiSearch className=" text-primary text-[25px] " />
      )}
      <input
        type="text"
        className="bg-transparent outline-none w-[90%] "
        placeholder="Search for a Collection"
        onKeyDown={e => handleKeyPress(e, false)}
        onChange={evt => setInputSearch(evt.target.value)}
        value={inputSearch}
      />
      {inputSearch && inputSearch !== "" && (
        <button
          id="entermouse"
          className="text-xs flex items-center p-2 bg-black/25 dark:bg-white/25 text-black dark:text-white rounded-lg cursor-pointer active:translate-y-2 transition_time font-semibold"
          onClick={click => handleKeyPress(click, true)}
        >
          Enter <AiOutlineEnter />
        </button>
      )}
      {data && setOpenSearch && (
        <div className="flex flex-col bg-white dark:bg-[#3c3c3df4] rounded-b-lg absolute left-0 top-full w-full gap-2 p-3 z-[98] ">
          {data.slice(0, 10).map((item, index) => {
            return (
              <div key={index} className="flex whitespace-nowrap gap-2">
                <span className="relative rounded-lg overflow-hidden">
                  <Image
                    src={optimizedLoader(item?.img)}
                    width={25}
                    height={25}
                    alt={`${item.collection_name}'s image`}
                  />{" "}
                </span>
                <Link
                  className={`hover:underline`}
                  href={`/explorer/${item.collection_name}`}
                  onClick={() => {
                    setIsOpenSearch(false);
                    setInputSearch("");
                  }}
                >
                  {item.collection_name}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
