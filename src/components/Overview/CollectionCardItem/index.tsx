import Image from "next/image";
import { useRouter } from "next/router";

import { CollectionCard } from "../../../@types";
import { optimizedLoader } from "../../../utils";
import { roundedNumber } from "../../../utils/truncNumber";

interface Props {
  item: CollectionCard;
  ctaMessage: string;
  redirectsTo: string;
}

const CollectionCardItem = ({ item, ctaMessage, redirectsTo }: Props) => {
  const router = useRouter();

  const handleRecents = () => {
    const recents = JSON.parse(localStorage.getItem("recents") ?? "[]");
    if (recents.map(e => e.collection_name).includes(item.collection_name)) {
      return;
    }
    if (recents.length > 5) {
      recents.shift();
    }
    recents.push(item);
    localStorage.setItem("recents", JSON.stringify(recents));
  };

  function formatterInNumber(item) {
    if (typeof item === "number") {
      return item;
    } else if (typeof item === "string") {
      const mumberFormatter = parseFloat(item.replace(/,/g, ""));
      return roundedNumber(mumberFormatter);
    }
    return NaN;
  }

  const handleClick = () => {
    router.push(`/${redirectsTo}/${item.collection_name}`);
    handleRecents();
  };

  return (
    <div
      className={`w-[310px] h-[200px] bg-white dark:bg-[#35333F] rounded-[18px] overflow-hidden flex flex-col shadow_search_bar dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] group`}
    >
      <div className="flex-1 flex p-[25px] justify-center items-end hover:scale-110 transition-all">
        <div
          className="relative cursor-pointer w-[250px] h-[100px]"
          onClick={() => {
            handleClick();
          }}
        >
          <div className="relative flex z-20 justify-center items-center gap-5 h-full">
            {item?.img && (
              <div className="max-w-[60px] max-h-[60px] min-w-[60px] min-h-[60px] rounded-xl overflow-hidden flex justify-center items-center bg-black/20 dark:bg-transparent">
                <Image
                  src={optimizedLoader(item?.img)}
                  alt={item?.name}
                  width={60}
                  height={60}
                />
              </div>
            )}

            <aside
              className={`flex flex-col justify-start items-start text-primary`}
            >
              {item.collection_name && (
                <span className={` text-xl font-bold`}>
                  {item.collection_name}
                </span>
              )}
              {item.name && <span className={` text-sm`}>{item.name} </span>}
              {item.name && (
                <span className={`text-sm`}>
                  Volume: $
                  {(Number(item.volume) / Math.pow(10, 8)).toLocaleString(
                    "en-us",
                    {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    },
                  )}
                </span>
              )}
            </aside>
          </div>
          <div></div>
        </div>
      </div>
      <div
        className="relative overflow-hidden transition-all bg-black/30 dark:bg-black/80 cursor-pointer"
        onClick={handleClick}
      >
        <div className="transition-all z-10 left-[100%] group-hover:left-[0%] bg-gradient-to-r from-violet-500 to-fuchsia-500 absolute w-[100%] h-[100%]"></div>
        <div className="relative z-20">
          <p className="text-white text-center uppercase p-2 text-lg font-medium">
            {ctaMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CollectionCardItem;
