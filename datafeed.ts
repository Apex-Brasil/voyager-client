/* eslint-disable n/no-callback-literal */
// Exemplo de objeto de teste para o datafeed da TradingView API com dados simulados para WESLEYCOIN

import fetchData from "./fetch-data.json";

const customDataFeed = {
  onReady: callback => {
    // Lógica para inicialização do feed de dados
    // Chame o callback quando estiver pronto
    callback({
      supported_resolutions: ["1", "5", "15", "30", "60", "D"],
      supports_group_request: false,
      supports_marks: true,
      supports_search: true,
      supports_time: true,
    });
  },

  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    // Lógica para pesquisa de símbolos com base na entrada do usuário
    // Chame onResultReadyCallback com os resultados da pesquisa
    const searchResults = [
      { symbol: "WESLEYCOIN", full_name: "WesleyCoin" },
      // Adicione mais resultados conforme necessário
    ];
    onResultReadyCallback(searchResults);
  },

  resolveSymbol: (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback,
  ) => {
    // Lógica para resolver um símbolo específico
    // Chame onSymbolResolvedCallback com os detalhes do símbolo ou onResolveErrorCallback em caso de erro
    const symbolInfo = {
      name: symbolName,
      ticker: symbolName,
      description: "WesleyCoin - Moeda Fictícia",
      session: "24x7",
      timezone: "Etc/UTC",
      minmov: 1,
      pricescale: 100,
      has_intraday: true,
      intraday_multipliers: ["1", "5", "15", "30", "60"],
      supported_resolution: ["1D"],
      data_status: "streaming",
    };
    onSymbolResolvedCallback(symbolInfo);
  },

  getBars: (
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    firstDataRequest,
  ) => {
    // Lógica para obter os dados do gráfico (barras de preço)
    // Chame onHistoryCallback com os dados do gráfico ou onErrorCallback em caso de erro
    // Os dados do gráfico devem estar no formato { time, open, high, low, close, volume }
    // Aqui, estamos gerando dados aleatórios apenas para ilustração
    const historyData = generateRandomData(from, to, resolution);
    onHistoryCallback(fetchData, { noData: false });
  },

  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback,
  ) => {
    // Lógica para se inscrever em atualizações em tempo real das barras de preço
    // Como estamos usando dados simulados, você pode gerar atualizações aleatórias aqui
    setInterval(() => {
      const updateData = generateRandomUpdateData();
      onRealtimeCallback(fetchData);
    }, 5000); // Simulando atualizações a cada 5 segundos
  },

  unsubscribeBars: subscriberUID => {
    // Lógica para cancelar a inscrição de atualizações em tempo real
  },
};

// Função para gerar dados aleatórios de gráfico
function generateRandomData(from, to, resolution) {
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

export default customDataFeed;
