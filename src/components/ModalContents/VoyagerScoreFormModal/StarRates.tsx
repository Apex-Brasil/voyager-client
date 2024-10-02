import { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";

interface Props {
  title: string;
  fn: (rate: number) => void;
  alreadyRated: boolean;
  noStars: boolean;
  description: string;
}

const StarRates = ({
  title,
  fn,
  alreadyRated,
  noStars,
  description,
}: Props) => {
  const [rate, setRate] = useState<number>(0);
  const [rated, setRated] = useState<boolean>(alreadyRated || false);
  const handleClickStart = (starPosition: number) => {
    setRate(starPosition);
    fn(rate);
    setRated(true);
  };
  const handleHoverStar = (starPosition: number, type: string) => {
    if (!rated) {
      if (type === "enter") {
        setRate(starPosition);
      } else {
        setRate(0);
      }
    }
  };
  const renderStars = () => {
    const filledStars = new Array(rate).fill(
      <AiFillStar className="w-[30px] h-[30px]" />,
    );
    const emptlyStarts = new Array(5 - rate).fill(
      <AiOutlineStar className="w-[30px] h-[30px]" />,
    );
    const stars = [...filledStars, ...emptlyStarts];
    return (
      <div className="flex justify-center items-center flex-wrap">
        <div className="flex flex-col justify-center items-center gap-3">
          <h3 className="text-[18px] group flex gap-2 justify-center items-center">
            {title}
            <div className={`tooltip flex justify-center items-center`}>
              <BsInfoCircle size={20} color="#8549b6" />
              <span className="button group-hover:visible !-right-[75px] !bottom-8 tiny">
                {description}
              </span>
            </div>
          </h3>
          {!noStars && (
            <div className="w-[200px] flex justify-center items-center mt-4">
              {stars.map((elem, i) => (
                <div
                  className="cursor-pointer w-[100px]"
                  key={i}
                  onMouseEnter={() => handleHoverStar(i + 1, "enter")}
                  onMouseLeave={() => handleHoverStar(i + 1, "leave")}
                  onClick={() => handleClickStart(i + 1)}
                >
                  {elem}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return <div>{renderStars()}</div>;
};

export default StarRates;
