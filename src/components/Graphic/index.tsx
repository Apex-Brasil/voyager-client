import { createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";

interface IGraphic {
  data: any[];
}

export function Graphic({ data }: IGraphic) {
  const chartContainerRef = useRef<any>(null);

  useEffect(() => {
    if (data) {
      const chart = createChart(chartContainerRef.current, {
        width: 900,
        height: 500,
      });

      const lineSeries = chart.addLineSeries();

      const tempArray: any[] = [];

      data.forEach((item: any) => {
        const tempObj = {
          time: item.time,
          value: item.median,
        };

        tempArray.push(tempObj);
      });

      lineSeries.setData(tempArray);

      return () => {
        chart.remove();
      };
    }
  }, [data]);

  return <div ref={chartContainerRef}></div>;
}
