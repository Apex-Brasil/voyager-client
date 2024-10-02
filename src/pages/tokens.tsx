import { NextPage } from "next";

import TokensFrame from "../components/Frames/TokensFrame";
import { Meta } from "../layout/Meta";

const Balances: NextPage = () => {
  return (
    <>
      <Meta
        title={"Voyager - User Balances"}
        description={"See Your balances in wallet and staked"}
      />
      <TokensFrame />
    </>
  );
};

export default Balances;
