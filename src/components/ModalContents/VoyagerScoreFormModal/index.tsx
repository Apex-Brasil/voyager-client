import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { ICollectionStatus } from "../../../@types";
import { useAuth } from "../../../hooks/useAuth";
import { useGoogleAuth } from "../../../hooks/useGoogleAuth";
import { QueryCacheKeyGetters } from "../../../services/queryService";
import { WaxLoginbutton } from "../../LoginButtons";
import Form from "./Form";

interface Props {
  collection: ICollectionStatus;
}

const VoyagerScoreFormModal = ({ collection }: Props) => {
  const { user } = useGoogleAuth();
  const { signIn } = useAuth();
  const [showForm, setShowForm] = useState(true);

  const { data: dataAlreadyVote, isLoading: isLoadingAlreadyVote } = useQuery({
    queryKey: ["alreadyVote"],
    queryFn: () =>
      QueryCacheKeyGetters.consultAssessment(
        String(collection?.collection_name),
        String(user?.account || ""),
      ),
  });

  useEffect(() => {
    const res = !dataAlreadyVote?.id;
    setShowForm(res);
  }, [dataAlreadyVote, isLoadingAlreadyVote]);

  if (!user?.account) {
    return (
      <div className="text-center flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col justify-center items-center">
          <h4>Please Log In</h4>
          <h5>This feature is exclusive for WAX-validated accounts</h5>
        </div>
        <span className="flex">
          <div className="text-center">
            Connect Wallet
            <div className="flex gap-4">
              <WaxLoginbutton click={signIn} />
              <div className={`tooltip flex justify-center items-center`}>
                <span className="button !-right-[75px] !bottom-8">
                  Click to learn more about this wallet!
                </span>
              </div>
            </div>
          </div>
        </span>
        <div className={`flex flex-col items-center gap-1`}>
          <span className="text-[14px]">
            Don&apos;t have a wallet yet?{" "}
            <span
              className={`cursor-pointer underline hover:text-[#8549b6]`}
              onClick={() =>
                open("https://www.mycloudwallet.com/signin#create-account")
              }
            >
              Create one!
            </span>
          </span>
          <span className="text-[14px]">
            Need help?{" "}
            <span
              className={`cursor-pointer underline hover:text-[#8549b6]`}
              onClick={() => open("https://discord.gg/8K6q6YTCSQ")}
            >
              Join our Discord.
            </span>
          </span>
        </div>
      </div>
    );
  }

  if (isLoadingAlreadyVote) {
    return (
      <div className="w-full h-[200px] flex justify-center items-center">
        <div className="loading-circle"></div>
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className="text-center flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col justify-center items-center h-[200px]">
          <h4>Thank you for your feedback.</h4>
          <h5>
            You&apos;ve contributed to this collection&apos;s Voyager Score.
          </h5>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center md:w-[750px] mt-10">
      <h2 className="text-[24px] text-center">
        Tell us what you think about <br />{" "}
        <span className="text-[22px] font-bold">{collection.name}</span>
      </h2>
      <div className="flex justify-center items-center relative">
        <Form
          collection={collection.collection_name}
          setShowForm={setShowForm}
        />
      </div>
    </div>
  );
};

export default VoyagerScoreFormModal;
