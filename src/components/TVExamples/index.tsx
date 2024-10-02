import dynamic from "next/dynamic";
import Script from "next/script";
import { useState } from "react";

const TVChartContainer = dynamic(
  () => import("../TVChartContainer").then(mod => mod.TVChartContainer),
  { ssr: false },
);

export default function TVExamples() {
  const [isScriptReady, setIsScriptReady] = useState(false);
  return (
    <>
      <Script
        // src="../../public/static/datafeeds/udf/dist/bundle.js"
        type="module"
        src="/static/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
        onReady={() => {
          setIsScriptReady(true);
        }}
        onError={(e: Error) => {
          console.error("Script failed to load", e);
        }}
      />
      {isScriptReady && <TVChartContainer />}
    </>
  );
}
