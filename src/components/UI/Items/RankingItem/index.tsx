import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";

import { ICollectionItemRanking } from "../../../../@types";
import { QueryCacheKeyGetters } from "../../../../services/queryService";
import { formatVolume, optimizedLoader } from "../../../../utils";
import { StarSelect } from "../../Buttons/StarSelect";

interface Props {
  itemData: ICollectionItemRanking;
  position: number;
  medianRate: number;
}

const RankingItem = ({ position, itemData, medianRate }: Props) => {
  const id = itemData.collection_name;

  const { data: dataHolders } = useQuery({
    queryKey: ["collectionHolders"],
    queryFn: () => QueryCacheKeyGetters.collectionHolders(id as string),
  });

  const router = useRouter();
  const query = String(router.query.filter);

  return (
    <div
      className={`flex w-max xl:w-full h-[100px] justify-start gap-10 items-center  px-2 rounded-sm xl:justify-between dark:even:bg-white/20 even:bg-[#9788f564]`}
    >
      <span className="!w-[60px] min-w-[60px] font-bold">{position}</span>

      <span className="min-w-[200px] w-[200px] flex gap-4 items-center">
        <Image
          src={optimizedLoader(String(itemData?.img))}
          alt={itemData?.name}
          width={40}
          height={40}
          quality={15}
          className="rounded-full overflow-hidden"
        />
        <span
          className="hover:underline hover:cursor-pointer font-semibold"
          onClick={() => router.push(`/explorer/${itemData.collection_name}`)}
        >
          {itemData.name}
        </span>
      </span>
      <span className="min-w-[160px] !w-[160px] font-semibold whitespace-nowrap">
        {formatVolume(itemData?.volumeFilters[query], medianRate, false)} WAX
      </span>
      <span className="min-w-[160px] w-[160px] font-semibold">
        ${formatVolume(itemData?.volumeFilters[query], medianRate, true)}
      </span>
      <span className="min-w-[160px] w-[160px] font-semibold">
        {parseInt(itemData?.sales)?.toLocaleString("en-us") || 0}
      </span>

      <span className="w-[160px] min-w-[160px]">
        <StarSelect rate={parseFloat(String(itemData.totalScore)) * 100} />
      </span>
    </div>
  );
};

export default RankingItem;
