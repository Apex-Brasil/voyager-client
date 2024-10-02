import { useState } from "react";

const AnchorSwapEmbeded = () => {
  const [isLoading, setIsLoading] = useState(true);

  const onLoad = () => {
    return setIsLoading(false);
  };

  return (
    <div className="w-full min-h-screen h-full flex flex-col justify-center items-center gap-4 bg-image bg-cover bg-fixed py-6">
      <h1>Swap</h1>
      {isLoading ? <div className="loading-circle"></div> : null}
      <iframe
        onLoad={onLoad}
        src="https://alcor.exchange/swap-widget"
        width="445"
        height="600"
        className={isLoading ? "invisible" : ""}
      ></iframe>
    </div>
  );
};

export default AnchorSwapEmbeded;
