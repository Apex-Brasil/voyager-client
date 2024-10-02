import { toast } from "react-toastify";

import { roundedNumber } from "../../../../utils/truncNumber";
import { StarSelect } from "../../Buttons/StarSelect";

const CollectionInfoDashboard = ({
  infoCollection,
  waxToDolarExchangeRate,
  toggleUSD,
  setDistributionHoldersIsOpen,
  setRateIsOpen,
  setToggleUSD,
  dataAlreadyVote,
}) => {
  function formatterInNumber(item) {
    if (typeof item === "number") {
      return item;
    } else if (typeof item === "string") {
      const mumberFormatter = parseFloat(item.replace(/,/g, ""));
      return roundedNumber(mumberFormatter);
    }
    return NaN;
  }

  return (
    <>
      {infoCollection
        .sort((a, b) => a.id - b.id)
        .map((item, i) => {
          let dolar = "0";
          if (i === 1) {
            dolar =
              typeof item.value === "string"
                ? `$${
                    (
                      +item?.value.replaceAll(",", "") * waxToDolarExchangeRate
                    ).toLocaleString("en-us", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || 0
                  }`
                : "0";
          }

          return (
            <div
              className="flex flex-col justify-center items-center gap-2"
              key={i}
            >
              <span className="text-primary font-bold text-sm whitespace-nowrap md:text-base">
                {item.name}
              </span>
              <span className="text-primary text-xs font-medium flex flex-col justify-center items-center gap-2">
                {item.id > 2 && (
                  <div>
                    {item.value}
                    {item.id === 1 && `/ ${(5).toFixed(1).toLocaleString()}`}
                  </div>
                )}
                {item.id === 1 && (
                  <div>
                    <StarSelect rate={parseFloat(item.value) * 100} />
                  </div>
                )}
                {item.id === 2 && (
                  <div>
                    {!toggleUSD
                      ? item.id === 2 && waxToDolarExchangeRate && item?.value
                        ? parseInt(
                            dolar.replace(/[^0-9.]/g, ""),
                          ).toLocaleString("en-us", {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                          })
                        : 0
                      : formatterInNumber(item.value).toLocaleString("en-us", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })}{" "}
                  </div>
                )}
              </span>
              {item.name === "Voyager score" && (
                <span
                  onClick={() => {
                    if (dataAlreadyVote === null) {
                      return setRateIsOpen(true);
                    }

                    return toast.warning("You already rated this collection");
                  }}
                  className="hover:underline tiny font-semibold  cursor-pointer"
                >
                  {dataAlreadyVote === null ? "Rate Now" : "Aleady Rated"}
                </span>
              )}
              {item.name === "Holders" && (
                <span
                  onClick={() => setDistributionHoldersIsOpen(true)}
                  className="hover:underline tiny font-semibold cursor-pointer text-center"
                >
                  View Holders
                </span>
              )}
              {item.name === "Total Volume" && (
                <span
                  onClick={() => setToggleUSD(e => !e)}
                  className="hover:underline tiny cursor-pointer"
                >
                  <span className={toggleUSD ? "font-bold" : "font-normal"}>
                    WAX
                  </span>
                  /
                  <span className={!toggleUSD ? "font-bold" : "font-normal"}>
                    USD
                  </span>
                </span>
              )}
            </div>
          );
        })}
    </>
  );
};

export default CollectionInfoDashboard;
