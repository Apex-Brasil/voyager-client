import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { ICollectionHolders } from "../../../@types";

ChartJS.register(ArcElement, Tooltip, Legend);

export const HoldersChart = ({ data }: { data: ICollectionHolders }) => {
  const percentage = dataSlice => {
    const percent = (dataSlice / +data.owners) * 100;
    return `${percent.toFixed(1)}%`;
  };

  const newObject = {};
  Object.keys(data)
    .filter(key => /^(1-10|11-20|21-30|31-40|51\+)$/.test(key))
    .forEach(key => {
      newObject[`${key} ${percentage(data[key])}`] = data[key];
    });

  const dataChart = {
    labels: Object.keys(newObject).map(
      e => `${e.split(" ")[0]} (${e.split(" ")[1]})`,
    ),
    datasets: [
      {
        label: `Holders`,
        data: Object.values(newObject),
        backgroundColor: [
          "rgba(255, 99, 132,0.8)",
          "rgba(54, 162, 235,0.8)",
          "rgba(255, 206, 86,0.8)",
          "rgba(75, 192, 192,0.8)",
          "rgba(153, 102, 255,0.8)",
          "rgba(255, 159, 64,0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  const optionsDesktop: any = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#ffffff",
          font: {
            size: 16,
          },
        },
      },
    },
  };
  const optionsMobile: any = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 14,
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
      },
    },
  };
  return (
    <section className={`flex flex-col items-center gap-5`}>
      <h2 className="font-bold text-center text-sm md:text-lg  ">
        Holders Distribution <br />
        (Total: {(+data.owners).toLocaleString()} Assets)
      </h2>
      {/* desktop */}
      <div className={`hidden md:block md:w-[500px] md:h-[500px]`}>
        <Pie
          data={dataChart}
          fallbackContent={"Error on Loading chart"}
          options={optionsDesktop}
        />
      </div>
      {/* mobile */}
      <div className={`w-[350px] h-[350px] md:hidden`}>
        <Pie
          data={dataChart}
          fallbackContent={"Error on Loading chart"}
          options={optionsMobile}
        />
      </div>
    </section>
  );
};
