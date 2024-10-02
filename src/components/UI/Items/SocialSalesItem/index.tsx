import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { IAtomicAsset } from "../../../../@types/atomicassets";
import { timeSinceTimestamp } from "../../../../utils";
import { IFPS_URL } from "../../../../utils/constants";

export const SocialSalesItem = ({ item, index, type, onlyMobile }) => {
  const [assetData, setAssetData] = useState<IAtomicAsset>();

  const ref: any = useRef(null);

  const [FormatedDate, setFormatedDate] = useState("");
  const showUserAtomic = (wallet: string) => {
    return open(
      `https://wax.atomichub.io/profile/wax-mainnet/${wallet}?blockchain=wax-mainnet&order=desc&sort=transferred`,
    );
  };

  const showUserX = (wallet: string) => {
    return open(`https://twitter.com/${wallet}`);
  };

  const showProduct = (id: string) => {
    return open(`https://wax.atomichub.io/explorer/asset/wax-mainnet/${id}`);
  };

  const fetchAsset = async (id: string) => {
    const response = await axios.get(
      `https://wax.api.atomicassets.io/atomicmarket/v1/assets/${id}`,
    );
    const data = response.data.data;

    setAssetData(data as IAtomicAsset);
  };

  useEffect(() => {
    const obterDataFormatada = () => {
      // Obtém a data atual
      const dataAtual = new Date();

      // Obtém o formato de data de acordo com a linguagem do navegador
      const formatoData = new Intl.DateTimeFormat(undefined, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      // Formata a data de acordo com o formato obtido
      const dataFormatada = formatoData.format(dataAtual);

      // Define a data formatada no estado do componente
      setFormatedDate(dataFormatada);
    };

    // Chama a função para obter a data formatada
    obterDataFormatada();
    fetchAsset(item?.assets?.[0]);
  }, []);

  const hasTwitterSeller = item?.seller_twitter !== null;
  const hasTwitterBuyer = item?.buyer_twitter !== null;
  const itemWidth = ref.current ? ref.current.offsetWidth : 0;

  return (
    <div
      ref={ref}
      className={`flex justify-between min-w-[722px] w-max py-5 px-2 border-2 border-[#a4a4a4] border-b-transparent border-t-transparent first-of-type:border-t-[#a4a4a4] last-of-type:border-b-[#a4a4a4] last-of-type:rounded-b-lg even:bg-[#9788f564] dark:even:bg-white/10 md:px-6 xl:w-full  md:min-w-full`}
    >
      <div className={`tooltip w-[110px]`}>
        {hasTwitterSeller && (
          <span
            onClick={() => showUserAtomic(item?.seller)}
            className={`button !font-semibold !bottom-10 !-right-7 hover:cursor-pointer`}
          >
            wallet: <span className={`underline`}>{item?.seller}</span>
          </span>
        )}
        <span
          className={`hover:underline cursor-pointer max-w-[100px]`}
          onClick={() => {
            if (hasTwitterSeller) {
              return showUserX(item?.seller_twitter);
            }
            if (!hasTwitterSeller) {
              return showUserAtomic(item?.seller);
            }
          }}
        >
          {hasTwitterSeller ? `@${item.seller_twitter}` : item?.seller}{" "}
        </span>
      </div>

      <div className={`tooltip w-[185px]`}>
        <div
          className={`button !flex flex-col !items-center !justify-center !bottom-10 !-left-8 !z-[98]`}
        >
          <div>
            {assetData?.data?.img ? (
              <figure className={`relative w-[100px] h-[150px]`}>
                <Image
                  alt="asset"
                  src={IFPS_URL + assetData?.data?.img}
                  objectFit="contain"
                  layout="fill"
                />
              </figure>
            ) : (
              <video
                className={`relative w-[100px] h-[150px]`}
                src={IFPS_URL + assetData?.data?.video}
              />
            )}
          </div>
          <div>{assetData?.asset_id}</div>
          <div>{assetData?.data?.name || null}</div>
        </div>
        <span
          className={`hover:underline cursor-pointer w-[125px]`}
          onClick={() => showProduct(item?.assets?.[0])}
        >
          {assetData?.data?.name ||
            assetData?.immutable_data?.name ||
            item?.assets?.[0]}
          {item.assets.length > 0 && <span className="">... </span>}
        </span>
      </div>

      <div className={`tooltip`}>
        {hasTwitterBuyer && (
          <span
            onClick={() => showUserAtomic(item?.buyer)}
            className={`button !font-semibold !bottom-10 !-right-7 hover:cursor-pointer`}
          >
            wallet:{" "}
            <span className={`font-normal underline`}>{item?.buyer}</span>
          </span>
        )}
        <span
          className={` hover:underline cursor-pointer w-[100px]`}
          onClick={() => {
            if (hasTwitterBuyer) {
              return showUserX(item?.buyer_twitter);
            }
            if (!hasTwitterBuyer) {
              return showUserAtomic(item?.buyer);
            }
          }}
        >
          {hasTwitterBuyer ? `@${item.buyer_twitter}` : item?.buyer}{" "}
        </span>
      </div>
      <span
        className={` ${onlyMobile ? "!w-auto" : ""} w-[75px] whitespace-nowrap`}
      >
        {item?.price} {item?.price?.token_symbol}
      </span>
      <span className={` ${onlyMobile ? "!w-auto" : ""} w-[110px]`}>
        {FormatedDate}
      </span>
    </div>
  );
};
