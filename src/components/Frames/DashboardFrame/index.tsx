import { useQuery } from "@tanstack/react-query";
import { upperFirst } from "utils-react";

import { useGoogleAuth } from "../../../hooks/useGoogleAuth";
import { QueryCacheKeyGetters } from "../../../services/queryService";

interface IDashboardUsers {
  id: string;
  google_id: string;
  twitter_id: null;
  twitter_username: null;
  username: string;
  email: string;
  account: null;
  permission: null;
  terms_accepted: boolean;
  created_at: string;
  updated_at: string;
}

export const DashboardFrame = () => {
  const { user } = useGoogleAuth();

  const {
    data: usersDashboard,
    isLoading: loadingDashboard,
    error: errorDashboard,
  } = useQuery({
    queryKey: ["usersDashboard"],
    queryFn: () => QueryCacheKeyGetters.getUserDashboard(user?.account || ""),
  });

  const labels = usersDashboard && Object.keys(usersDashboard[0]);

  return (
    <section
      className={`min-h-screen flex flex-col gap-10 items-center bg-cover bg-image bg-fixed pt-10`}
    >
      <article className={`text-center flex flex-col `}>
        <h1>Dashboard</h1>
        <span>Total Users: {usersDashboard?.length}</span>
      </article>
      {loadingDashboard && (
        <div className="loading-circle">
          <div></div>
        </div>
      )}

      {errorDashboard && <span className={`text-lg`}>Error to get users</span>}

      <div className={`overflow-x-auto w-full px-2`}>
        <div className="xl:w-full w-max flex justify-start gap-4 border-b border-[#333] dark:border-[#a4a4a4] xl:justify-between px-2">
          {labels &&
            labels?.length > 0 &&
            labels
              ?.slice(3, 11)
              .map(label => <DashboardLabelItem key={label} label={label} />)}
        </div>

        <div>
          <RenderItems data={usersDashboard} />
        </div>
      </div>
    </section>
  );
};

const DashboardLabelItem = ({ label }: { label: string }) => {
  return (
    <span
      className={`w-[160px] !min-w-[160px]  h-[60px] flex items-center font-bold whitespace-nowrap`}
    >
      {upperFirst(label)}
    </span>
  );
};

const RenderItems = ({ data }) => {
  if (data) {
    return data.map((e, index) => <DashboardItem key={index} data={e} />);
  }

  return null;
};

const DashboardItem = ({ data }: { data: IDashboardUsers }) => {
  const fortmatDate = (date: string) => {
    const dateFormated = new Date(date);
    return dateFormated.toLocaleDateString("en");
  };
  const dataArray = Object.values(data);
  return (
    <div
      className={`flex w-max xl:w-full h-[100px] justify-start gap-4 items-center px-4 rounded-sm xl:justify-between dark:even:bg-white/20 even:bg-[#9788f564]`}
    >
      {/* {dataArray.slice(3, 11).map((e, index) => (
        <span
          className="min-w-[160px] w-[160px] font-semibold break-words"
          key={index}
        >
          {e || "null"}
        </span>
      ))} */}

      <span className="min-w-[160px] w-[160px] font-semibold break-words">
        {data.twitter_username || "null"}
      </span>
      <span className="min-w-[160px] w-[160px] font-semibold break-words">
        {data.username || "null"}
      </span>
      <span className="min-w-[160px] w-[160px] font-semibold break-words">
        {data.email || "null"}
      </span>
      <span className="min-w-[160px] w-[160px] font-semibold break-words">
        {data.account || "null"}
      </span>
      <span className="min-w-[160px] w-[160px] font-semibold break-words">
        {data.permission || "null"}
      </span>
      <span className="min-w-[160px] w-[160px] font-semibold break-words">
        {data.terms_accepted ? "true" : "false"}
      </span>
      <span className="min-w-[160px] w-[160px] font-semibold break-words">
        {fortmatDate(data.created_at) || "null"}
      </span>
      <span className="min-w-[160px] w-[160px] font-semibold break-words">
        {fortmatDate(data.updated_at) || "null"}
      </span>
    </div>
  );
};
