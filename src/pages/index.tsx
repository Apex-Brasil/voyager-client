import { HomePageLayout } from "../components/Layout/Home/HomePageLayout";
import { Meta } from "../layout/Meta";

const Home = () => {
  return (
    <>
      <Meta
        title="WAX Voyager"
        description="A new tool for NFT analysis on the WAX Blockchain"
      />
      <HomePageLayout />
    </>
  );
};

export default Home;
