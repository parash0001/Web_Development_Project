import AvailabilityCheck from "../components/AvailabilityCheck";
import Layout from "../components/layout/Layout";

import Welcome from "./Welcome";
const LandingPage = () => {
  return (
    <Layout>
      <div className="w-full h-[100vh] bg-slate-200">
        <div className="w-full h-[88vh] bg-[url('./assets/backgroundimage.jpg')] bg-cover  filter brightness-50"></div>

        <div className="max-w-[800px] absolute top-[38%] left-[50%] flex flex-col gap-3 translate-x-[-50%] translate-y-[-50%] text-center">
          <span className="text-white text-sm  tracking-widest ">
            WELCOME TO 5 ⭐ HOTEL
          </span>
          <h3 className="text-white text-6xl font-serif relative  font-bold">
            A Best Place To Stay
          </h3>
        </div>
        <div className="w-[25px] absolute h-[45px] border-[2px] border-solid border-white top-[64%] translate-x-[-50%] translate-y-[-50%] cursor-pointer rounded-[25px] left-[50%] ">
          <div className="w-[3px] h-[6px] bg-white absolute left-[50%] top-[13px] rounded-[40%] translate-x-[-50%] translate-y-[-50%]"></div>
        </div>
        <div>
          <AvailabilityCheck />
        </div>
      </div>
      <div>
        <Welcome className={""} />
      </div>
    </Layout>
  );
};

export default LandingPage;
