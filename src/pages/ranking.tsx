import RankingFrame from "../components/Frames/RankingFrame";
import { Meta } from "../layout/Meta";

const Ranking = () => {
  return (
    <>
      <Meta
        title={"Voyager - Top Ranking"}
        description={"See the top collections by volume or sales"}
      />
      <RankingFrame />
    </>
  );
};

export default Ranking;
