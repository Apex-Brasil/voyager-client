import { ExplorerFrame } from "../../components/Frames/ExplorerFrame";
import { Meta } from "../../layout/Meta";

const Explorer = () => {
  return (
    <>
      <Meta
        title="WAX Voyager - Explorer"
        description="Your favorite NFT price analysis tool on the WAX Blockchain!"
      />
      <ExplorerFrame />
    </>
  );
};

export default Explorer;
