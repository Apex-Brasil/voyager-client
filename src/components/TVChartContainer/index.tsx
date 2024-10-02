import { useEffect, useRef } from "react";
import { getStorage } from "utils-react";

import { widget } from "../../../public/static/charting_library/charting_library";
import feedData from "../../lib/feed";
import styles from "./index.module.css";

export const TVChartContainer = () => {
  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const id = getStorage("selectedTemplate")?.name;
    const widgetOptions: any = {
      symbol: id,
      datafeed: feedData,
      interval: "W",
      container: chartContainerRef.current,
      library_path: "/static/charting_library/",
      fullscreen: false,
      autosize: true,
      theme: "Dark",
    };

    // eslint-disable-next-line new-cap
    const tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute("title", "Click to show a notification popup");
        button.classList.add("apply-common-tooltip");
        button.addEventListener("click", () =>
          tvWidget.showNoticeDialog({
            title: "Notification",
            body: "TradingView Charting Library API works correctly",
            callback: () => {
              console.log("Noticed!");
            },
          }),
        );

        button.innerHTML = "Check API";
      });
    });

    return () => {
      tvWidget.remove();
    };
  }, [feedData]);

  return (
    <>
      <div ref={chartContainerRef} className={styles.TVChartContainer} />
    </>
  );
};
