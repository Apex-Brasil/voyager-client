import { IBalance } from "../../../../@types";

interface IProps {
  balance: IBalance;
}

const TokensItem = ({ balance }: IProps) => {
  const sumTotalToken =
    Number(balance.amount) +
    Number(balance.taco_LP.amount) +
    Number(balance.alcor_LP.amount);

  const renderTotalValue = () => {
    if (balance.currency === "WAX") {
      return sumTotalToken.toFixed(3);
    }

    const result = sumTotalToken * Number(balance.tokenInfos.token_last_price);

    if (isNaN(result)) {
      return <span className={`text-sm font-medium`}>Token Not Found </span>;
    }

    return result.toString().split(".").length === 1
      ? result
      : result.toFixed(3);
  };

  return (
    <div
      className={`flex w-max xl:w-full h-[90px] justify-start gap-10 items-center  px-2 rounded-sm xl:justify-between dark:even:bg-white/20 even:bg-[#9788f564]`}
    >
      <span className="min-w-[200px] w-[200px] flex gap-4 items-center">
        {/* <Image
          src={optimizedLoader(itemData?.img)}
          alt={itemData?.name}
          width={40}
          height={40}
          quality={15}
          className="rounded-full overflow-hidden"
        /> */}
        <span className="flex flex-col hover:underline hover:cursor-pointer font-semibold">
          {balance.currency}
          <span className={`text-sm font-normal`}>{balance.contract}</span>
        </span>
      </span>
      <span className="min-w-[160px] !w-[160px] font-semibold whitespace-nowrap">
        {Number(balance.amount).toFixed(3)}
      </span>
      <span className="min-w-[160px] w-[160px] max-w-[160px] font-semibold">
        {Number(balance.alcor_LP.amount).toFixed(3)}
      </span>
      <span className="min-w-[160px] w-[160px] font-semibold">
        {Number(balance.taco_LP.amount).toFixed(3)}
      </span>
      <span className="min-w-[160px] w-[160px] font-semibold">
        {sumTotalToken.toFixed(3)}
      </span>
      <span className="w-[160px] min-w-[160px] font-semibold">
        {renderTotalValue()}
      </span>
    </div>
  );
};

export default TokensItem;
