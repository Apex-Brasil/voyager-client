import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

import { IVoyagerScoreObj } from "../../../@types";
import { useGoogleAuth } from "../../../hooks/useGoogleAuth";
import StarRates from "./StarRates";

interface Props {
  collection: string;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

const Form = ({ collection, setShowForm }: Props) => {
  const [commentText, setCommentText] = useState<string>("");
  const { sendFeedback } = useGoogleAuth();
  const { user } = useGoogleAuth();
  const [formSteps, setFormSteps] = useState({
    0: {
      title: "Innovation",
      rate: null,
      description:
        "How unique and groundbreaking is the project's concept, technology, or features?",
    },
    1: {
      title: "Experience",
      rate: null,
      description:
        "How intuitive and user-friendly is the project's platform or application?",
    },
    2: {
      title: "Support",
      rate: null,
      description:
        "How responsive and helpful is the project's support team in addressing user inquiries or issues?",
    },
    3: {
      title: "Engagement",
      rate: null,
      description:
        "How active and involved is the project's community in discussions, events, or promotions?",
    },
    4: {
      title: "Art Work",
      rate: null,
      description: "Do you value the projects artwork?",
    },
    5: {
      title: "Reliability",
      rate: null,
      description:
        "Does the team have a clear path or do they rely on hype to sell their collection?",
    },
  });

  const collectRates = (id: number) => {
    return (starPos: number) => {
      setFormSteps(prevState => {
        const newState = JSON.parse(JSON.stringify(prevState));
        newState[id].rate = starPos;
        return newState;
      });
    };
  };

  const handleSendFeedback = async () => {
    const missiedField = Object.entries(formSteps).find(
      el => el[1].rate === null,
    );

    if (missiedField) {
      toast.warn("Please fill all the fields");
    } else {
      const voyagerScoreObj: IVoyagerScoreObj = {
        collection_name: collection,
        wallet: user?.account || "",
        user_experience_score: formSteps[1].rate || 0,
        innovation_score: formSteps[0].rate || 0,
        community_engagement_score: formSteps[3].rate || 0,
        art_work_score: formSteps[4].rate || 0,
        reliability_score: formSteps[5].rate || 0,
        support_score: formSteps[2].rate || 0,
        comment: commentText,
      };

      await sendFeedback(voyagerScoreObj, () => {
        setShowForm(false);
        location.reload();
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-5">
      <div className=" flex flex-col flex-wrap md:grid md:grid-cols-3 md:grid-flow-row gap-[20px] justify-center items-center text-center">
        {Object.values(formSteps).map(({ title, rate, description }, index) => (
          <StarRates
            key={index}
            title={title}
            description={description}
            fn={(starPos: number) => collectRates(index)(starPos)}
            alreadyRated={typeof rate === "number" || false}
            noStars={rate === "N/A"}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2 justify-center items-center">
        <h3 className="text-[18px] text-center">Leave a Comment</h3>
        <textarea
          className="md:w-[400px] w-[320px] h-[120px] p-2"
          value={commentText}
          onChange={evt => setCommentText(evt.target.value)}
        ></textarea>
      </div>
      <button className="btn mb-5 !w-[130px]" onClick={handleSendFeedback}>
        Send
      </button>
    </div>
  );
};

export default Form;
