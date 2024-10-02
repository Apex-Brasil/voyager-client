import { IoStarSharp, IoStarOutline, IoStarHalfSharp } from "react-icons/io5";

interface Props {
  rate: number;
  hover?: (arg0: any, arg1: any) => any;
  click?: (arg0: any) => any;
}

const handleHalfStars = (rate: number) => {
  if (rate % 100 >= 75) {
    return <IoStarSharp className="w-[20px] h-[20px]" />;
  }
  if (rate % 100 <= 25) {
    return <IoStarOutline className="w-[20px] h-[20px]" />;
  }
  return <IoStarHalfSharp className="w-[20px] h-[20px]" />;
};

export const StarSelect = ({ rate, hover, click }: Props) => {
  const filledStars = new Array(Math.trunc(rate / 100)).fill(
    <IoStarSharp className="w-[20px] h-[20px]" />,
  );
  const halfStars = new Array(rate % 100 > 0 ? 1 : 0).fill(
    handleHalfStars(rate),
  );
  const emptlyStarts = new Array(
    5 - (filledStars.length + halfStars.length),
  ).fill(<IoStarOutline className="w-[20px] h-[20px]" />);
  const stars = [...filledStars, ...halfStars, ...emptlyStarts];

  function handleHover(i, type) {
    if (!hover) {
      return;
    }
    return hover(i + 1, type);
  }
  function handleClick(i) {
    if (!click) {
      return;
    }
    return click(i + 1);
  }

  return (
    <div className="w-[100px] flex justify-center items-center gap-1">
      {stars.map((elem, i) => (
        <div
          className="w-[20px]"
          key={i}
          onMouseEnter={() => handleHover(i, "enter")}
          onMouseLeave={() => handleHover(i, "leave")}
          onClick={() => handleClick(i + 1)}
        >
          {elem}
        </div>
      ))}
    </div>
  );
};
