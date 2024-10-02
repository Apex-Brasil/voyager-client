import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { InfoCollectionFrame } from "../../components/Layout/Analytics/InfoCollectionFrame";
import TVExamples from "../../components/TVExamples";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { Meta } from "../../layout/Meta";
import { QueryCacheKeyGetters } from "../../services/queryService";

const Analytics = () => {
  const router = useRouter();
  const { user } = useGoogleAuth();

  const { id } = router.query;

  const idValidation = id => {
    if (id !== "example" && (id?.length > 12 || id !== id?.toLowerCase())) {
      return false;
    }

    return true;
  };

  const { data: dataAlreadyVote } = useQuery({
    queryKey: ["alreadyVote"],
    queryFn: () =>
      QueryCacheKeyGetters.consultAssessment(
        String(id),
        String(user?.account || ""),
      ),
    enabled: !!id && !!user?.account,
  });

  const {
    data: dataStatus,
    error: errorStatus,
    isLoading: isLoadingStatus,
  } = useQuery({
    queryKey: ["collectionStatus"],
    queryFn: () => QueryCacheKeyGetters.collectionStatus(id as string),
    enabled: !!id,
  });

  const {
    data: dataVoyagerScore,
    error: errorDataVoyagerScore,
    isLoading: isLoadingDataVoyagerScore,
  } = useQuery({
    queryKey: ["voyagerScore"],
    queryFn: () => QueryCacheKeyGetters.voyagerScore(id as string),
    enabled: !!id,
  });

  const {
    data: dataMarket,
    error: errorMarket,
    isLoading: isLoadingMarket,
  } = useQuery({
    queryKey: ["collectionMarket"],
    queryFn: () => QueryCacheKeyGetters.collectionMarket(id as string),
    enabled: !!id,
  });

  const { data: medianData, isLoading: isLoadingMedianData } = useQuery({
    queryKey: ["medianData"],
    queryFn: () => QueryCacheKeyGetters.getMedian(),
  });

  const {
    data: dataHolders,
    error: errorHolders,
    isLoading: isLoadingHolders,
  } = useQuery({
    queryKey: ["collectionHolders"],
    queryFn: () => QueryCacheKeyGetters.collectionHolders(id as string),
    enabled: !!id,
  });

  const { data: dataWashTrading } = useQuery({
    queryKey: ["collectionWashTrading"],
    queryFn: () => QueryCacheKeyGetters.collectionWashTrading(id as string),
    enabled: !!id,
  });

  if (!idValidation(id)) {
    return (
      <div className={`min-h-screen flex justify-center items-center`}>
        <span className={`text-primary`}> Collection info not found</span>
      </div>
    );
  }

  if (id === "example") {
    return (
      <div className={`min-h-screen flex justify-center items-center`}>
        <span className={`text-primary`}>
          <TVExamples />
        </span>
      </div>
    );
  }

  if (
    isLoadingStatus ||
    isLoadingMarket ||
    isLoadingHolders ||
    isLoadingMedianData ||
    isLoadingDataVoyagerScore
  ) {
    return (
      <div className={`min-h-screen flex justify-center items-center`}>
        <div
          className={`flex justify-center items-center flex-col text-primary mt-40 mb-40`}
        >
          Collection info is loading
          <div className="loading-circle">
            <div></div>
          </div>
        </div>
      </div>
    );
  }

  if (errorStatus) {
    return (
      <div className={`min-h-screen flex justify-center items-center`}>
        <span className={`text-primary`}>Collection not found</span>
      </div>
    );
  }

  if (errorMarket) {
    return (
      <div className={`min-h-screen flex justify-center items-center`}>
        <span className={`text-primary`}>Collection info error</span>
      </div>
    );
  }

  const median = medianData?.median || 0;
  const exchangeRate = median / 10000;

  return (
    <>
      <Meta
        title="WAX Voyager"
        description="A new tool for NFT analysis on the WAX Blockchain"
      />

      <InfoCollectionFrame
        dataStatus={dataStatus}
        dataHolders={dataHolders}
        dataMarket={dataMarket}
        dataVoyagerScore={dataVoyagerScore}
        dataWashTrading={dataWashTrading}
        waxToDolarExchangeRate={exchangeRate || 0}
        dataAlreadyVote={dataAlreadyVote}
      />
    </>
  );
};

export default Analytics;
