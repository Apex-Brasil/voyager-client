import axios from "axios";
import { useState, useEffect } from "react";

import { CollectionCard } from "../../@types";
import { CollectionCardItem } from "../../components";

const Overview = () => {
  const [collectionCards, setCollectionCards] = useState<CollectionCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      // TODO: Replace for a voyager backend API
      const response = await axios.get(
        "https://test.wax.api.atomicassets.io/atomicassets/v1/collections?authorized_account=wxjoaoianuci&limit=11&page=1",
      );
      const result = response.data;
      const handledResult = result.data.map(e => {
        const obj = e.data;
        if (e.data.socials !== undefined) {
          obj.images = JSON.parse(e?.data?.images || "{}");
        }
        if (e.data.socials !== undefined) {
          obj.socials = JSON.parse(e?.data?.socials || "{}");
        }
        obj.collection_name = e.collection_name;
        return obj;
      });
      setCollectionCards(handledResult);
      setLoading(false);
    };
    fetcher();
  }, []);

  const renderCards = () => {
    const error = false;

    if (loading) {
      return <div></div>;
    }

    if (error) {
      return <div></div>;
    }

    if (collectionCards.length === 0) {
      return <div></div>;
    }

    return collectionCards.map((item, index) => {
      return (
        <CollectionCardItem
          key={index}
          item={item}
          ctaMessage="Manage Collection"
          redirectsTo="overview"
        />
      );
    });
  };

  return (
    <div className="flex flex-col py-[50px] bg-image bg-cover gap-[50px] justify-center items-center m-top-[100px]">
      <div>
        <div>
          <h2>Overview</h2>
        </div>
        <div>
          <p>
            All NFTs live within collections. These are groups of NFTs that are
            part of the same project, or made by the same author.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-[50px] justify-center items-center">
        {renderCards()}
      </div>
    </div>
  );
};

export default Overview;
