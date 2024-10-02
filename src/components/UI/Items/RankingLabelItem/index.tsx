import { upperFirst } from "utils-react";

interface Props {
  label: string;
}

const RankingLabelItem = ({ label }: Props) => {
  return (
    <span
      className={` ${
        label === "collection"
          ? "min-w-[200px] w-[200px] "
          : "first-of-type:!min-w-[60px] first-of-type:!w-[60px] w-[160px] !min-w-[160px]"
      } first h-[60px] flex items-center gap-2 font-bold whitespace-nowrap`}
    >
      {upperFirst(label)}
    </span>
  );
};

export default RankingLabelItem;
