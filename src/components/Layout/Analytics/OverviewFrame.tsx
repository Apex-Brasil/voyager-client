import { useTheme } from "next-themes";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";

import { useWidth } from "../../../utils/responsiveHook";
import { littleMonsters } from "./data";

export const OverviewFrame = () => {
  const [pagination, setPagination] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  const { resolvedTheme } = useTheme();
  const widthSize = useWidth();

  useEffect(() => {
    if (!widthSize) return;

    widthSize > 1305 ? setItemsPerPage(3) : setItemsPerPage(2);

    widthSize < 1015 && setItemsPerPage(2);

    if (widthSize < 665) setItemsPerPage(1);
  }, [widthSize]);

  const handlePagination = (action: number) => {
    const factor = littleMonsters.length / itemsPerPage;

    if (pagination + action * itemsPerPage < 0) {
      if (Number.isInteger(factor))
        return setPagination(littleMonsters.length - itemsPerPage);
      else {
        if (pagination === 0) {
          setPagination(
            littleMonsters.length -
              Math.round(littleMonsters.length % itemsPerPage),
          );
        } else setPagination(0);
      }
    } else if (pagination + action * itemsPerPage >= littleMonsters.length) {
      return setPagination(0);
    } else {
      return setPagination(pagination + action * itemsPerPage);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center gap-5">
      <section
        className={`dark:bg-[#1A0E2A] dark:shadow-2xl bg-white shadow_search_bar flex justify-center items-center rounded-[20px] min-h-[170px] md:min-w-[700px] lg:min-w-[900px] w-[350px]`}
      >
        <div
          className={`bg-[#00000099] flex justify-center items-center rounded-[20px] min-h-[110px] md:min-w-[600px] lg:min-w-[850px]  w-[300px] text-white`}
        >
          Promo banner will go here
        </div>
      </section>

      <section
        className={`dark:bg-[#201E28] dark:shadow-2xl bg-white shadow_search_bar flex flex-col gap-2 justify-center items-center rounded-[20px] md:min-w-[700px] lg:min-w-[900px] w-[350px] p-5`}
      >
        <h3 className="md:self-start text-start md:ml-5 md:text-[30px] text-[24px] text-primary font-bold">
          Price and sales
        </h3>
        <div className="bg-[#00000099] flex justify-center items-center rounded-[20px] min-h-[120px] md:min-w-[600px] lg:min-w-[850px]  w-[300px]"></div>
      </section>

      <div className="flex lg:flex-row flex-col justify-center items-center gap-5">
        <section
          className={`dark:bg-[#201E28] dark:shadow-2xl bg-white shadow_search_bar flex flex-col gap-2 justify-center items-center rounded-[20px] min-h-[200px] md:min-w-[400px] lg:min-w-[430px] w-[350px] p-3`}
        >
          <h3 className="md:self-start text-start md:ml-5 md:text-[30px] text-[24px] text-primary font-bold">
            Featured NFTs
          </h3>

          <div className="flex justify-center items-center gap-3">
            <div onClick={() => handlePagination(-1)} className="lg:hidden">
              <MdOutlineArrowLeft size={35} color="#2400FF" />
            </div>
            {littleMonsters
              .slice(pagination, pagination + itemsPerPage)
              .map((item, i) => (
                <div
                  key={i}
                  className={`dark:bg-[#35333F] bg-[#00000099] rounded-[20px] p-5 `}
                >
                  <div className="relative w-[80px] h-[80px]">
                    <Image
                      src={item.img}
                      alt="xx"
                      objectFit="contain"
                      layout="fill"
                    />
                  </div>
                </div>
              ))}

            <div onClick={() => handlePagination(1)} className="lg:hidden">
              <MdOutlineArrowRight size={35} color="#2400FF" />
            </div>
          </div>
        </section>

        <section
          className={`dark:bg-[#201E28] dark:shadow-2xl bg-white shadow_search_bar flex flex-col gap-2 justify-center items-center rounded-[20px] min-h-[200px] md:min-w-[400px] lg:min-w-[450px] w-[350px] p-5`}
        >
          <h3 className="md:self-start text-start md:ml-5 md:text-[30px] text-[24px] text-primary font-bold">
            Listing Data
          </h3>
          <div className="bg-[#00000099] flex justify-center items-center rounded-[20px] min-h-[110px] md:min-w-[300px] lg:min-w-[400px]  w-[300px]"></div>
        </section>
      </div>
    </section>
  );
};
