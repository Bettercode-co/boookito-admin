import CardPageVisits from "../../components/Cards/CardPageVisits";
// import CardSocialTraffic from "../../components/Cards/CardSocialTraffic";

// layout for page

import Admin from "../../layouts/Admin";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-full mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        {/* <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div> */}
      </div>
    </>
  );
};
(Dashboard as any).layout = Admin;

export default Dashboard;
