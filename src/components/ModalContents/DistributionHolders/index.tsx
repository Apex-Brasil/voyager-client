import { Chart } from "react-google-charts";

import { ICollectionHolders } from "../../../@types";

interface Props {
  dataHolders: ICollectionHolders;
}

const DistributionHolderModal = ({ dataHolders }: Props) => {
  //   const data: string = dataHolders?.["1-10"];

  const percentage = dataSlice => {
    const percent = (dataSlice / +dataHolders.owners) * 100;
    return percent.toFixed(1);
  };

  const data = [
    [`Holders Distribution ${(+dataHolders.owners).toLocaleString()}`, "NFTs"],
    ...Object.entries(dataHolders)
      .filter(e => e[0].includes("-") || e[0].includes("+"))
      .map(e => [`${e[0]} (${percentage(+e[1])}%)`, +e[1]]),
  ];
  const options = {
    title: `Holders Distribution ${(+dataHolders.owners).toLocaleString()}`,
    titlePosition: "none",
    titleTextStyle: {
      textAlignment: "center",
      fontSize: 18,
      bold: true,
    },
    backgroundColor: "transparent",
    // legend: { position: "bottom" },
    chartArea: { width: "85%", height: "60%" },
    legend: {
      position: "bottom",
      maxLines: 6,
      // textStyle: { marginBottom: "50px" },
    },
    // outerHeight: "200px",
    // innerHeight: "400px",
  };
  return (
    <div className="flex items-center flex-col">
      <h2 className="font-bold text-center text-[14px] md:text-[18px] absolute z-[99] top-[10%] m-auto ">
        Holders Distribution <br />
        (Total: {(+dataHolders.owners).toLocaleString()} Assets)
      </h2>
      <div className="w-full">
        <Chart
          graphID="holder-chart"
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          //   height={"500px"}
          className="h-[600px] md:h-[85vh] "
        />
      </div>
    </div>
  );
};

export default DistributionHolderModal;
