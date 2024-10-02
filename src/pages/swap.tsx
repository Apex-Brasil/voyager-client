import AnchorSwapEmbeded from "../components/AnchorSwapEmbeded";
import { Meta } from "../layout/Meta";

const Swap = () => {
  return (
    <>
      <Meta title="WAX Swap" description="Swap yours tokens here!" />
      <AnchorSwapEmbeded />
    </>
  );
};

export default Swap;
