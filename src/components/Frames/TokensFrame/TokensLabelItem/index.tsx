import { upperFirst } from "utils-react";

interface Props {
  label: string;
}

const TokensLabelItem = ({ label }: Props) => {
  return (
    <span
      className={` ${
        label === "Token"
          ? "min-w-[200px] w-[200px] "
          : " w-[160px] !min-w-[160px]"
      } h-[60px] flex items-center gap-2 font-bold whitespace-nowrap last-of-type:whitespace-normal`}
    >
      {upperFirst(label)}
    </span>
  );
};

export default TokensLabelItem;
