import { getStorage } from "utils-react";

const configurationData = {
  supported_resolutions: ["1", "5", "15", "30", "60"],
  supports_group_request: false,
  supports_marks: true,
  supports_search: true,
  supports_time: false,
  supports_timescale_marks: false,
};

export default {
  onReady: (callback: any) => {
    console.log("[onReady]: Method call");
    setTimeout(() => callback(configurationData));
  },
  searchSymbols: async (
    userInput: any,
    exchange: any,
    symbolType: any,
    onResultReadyCallback: any,
  ) => {
    console.log("[searchSymbols]: Method call");
    const { name, description } = await symbolRequest();

    const searchResults = [
      { symbol: name, full_name: description },
      // Adicione mais resultados conforme necessário
    ];
    onResultReadyCallback(searchResults);
  },
  resolveSymbol: async (
    symbolName: any,
    onSymbolResolvedCallback: any,
    onResolveErrorCallback: any,
    extension: any,
  ) => {
    const { name, description } = await symbolRequest();
    console.log("[resolveSymbol]: Method call", name);
    // Symbol information object
    const symbolInfo = {
      name,
      ticker: name,
      description,
      session: "24x7",
      timezone: "Etc/UTC",
      minmov: 1,
      pricescale: 100,
      has_intraday: true,
      intraday_multipliers: ["1", "5", "15", "30", "60"],
      supported_resolution: configurationData.supported_resolutions,
      data_status: "streaming",
    };
    console.log("[resolveSymbol]: Symbol resolved", name);
    onSymbolResolvedCallback(symbolInfo);
  },
  getBars: async (
    symbolInfo: any,
    resolution: any,
    periodParams: any,
    onHistoryCallback: any,
    onErrorCallback: any,
  ) => {
    try {
      const response = await fetch(
        `${process.env.API_ENDPOINT}/assets/graph/${symbolInfo.name}`,
      );
      const data = await response.json();
      const historyData: any = [];

      if (data.data.length === 0) {
        console.log("[getBars]: Get empty history data");
        onHistoryCallback([], { noData: true });
      } else {
        data.data.forEach((element: any) => {
          historyData.push({
            time: element.time * 1000,
            open: element.open,
            high: element.high,
            low: element.low,
            close: element.close,
            volume: element.volume,
          });
        });

        const filteredData = historyData.filter(
          (item: any) =>
            Math.floor(item.time / 1000) >= periodParams.from &&
            Math.floor(item.time / 1000) <= periodParams.to,
        );

        if (filteredData.length === 0) {
          console.log("[getBars]: Get empty history data");
          onHistoryCallback([], { noData: true });
        } else {
          onHistoryCallback(filteredData);
        }
      }
    } catch (error) {
      console.log("[getBars]: Get error", error);
      onErrorCallback(error);
    }
  },
  subscribeBars: (
    symbolInfo: any,
    resolution: any,
    onRealtimeCallback: any,
    subscriberUID: any,
    onResetCacheNeededCallback: any,
  ) => {
    console.log(
      "[subscribeBars]: Method call with subscriberUID:",
      subscriberUID,
    );
  },
  unsubscribeBars: (subscriberUID: any) => {
    console.log(
      "[unsubscribeBars]: Method call with subscriberUID:",
      subscriberUID,
    );
  },
};

function generateRandomData(from: any, to: number, resolution: string) {
  const data: any = [];
  let time = from;

  while (time < to) {
    const bar: any = {
      time,
      open: Math.random() * 100,
      high: Math.random() * 110,
      low: Math.random() * 90,
      close: Math.random() * 100,
      volume: Math.random() * 1000,
    };
    data.push(bar);

    // Avança o tempo com base na resolução
    if (resolution === "D") {
      time += 24 * 60 * 60; // Avança um dia
    } else {
      time += parseInt(resolution) * 60; // Avança de acordo com a resolução em minutos
    }
  }

  return data;
}

// Função para gerar atualizações aleatórias para dados em tempo real
function generateRandomUpdateData() {
  const updateData = {
    time: Math.floor(Date.now() / 1000),
    open: Math.random() * 100,
    high: Math.random() * 110,
    low: Math.random() * 90,
    close: Math.random() * 100,
    volume: Math.random() * 1000,
  };
  return updateData;
}

const symbolRequest = async () => {
  const locationPathname = getStorage("selectedTemplate");

  return locationPathname;
};
