import React from "react";
import PN from "persian-number";


const CardProfile: React.FC = () => {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="absolute right-2/4 -top-5 h-40 w-40">
                <img
                  alt="..."
                  src="/img/team-2-800x800.jpg"
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -mr-20 lg:-mr-16 max-w-150-px"
                />
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="ml-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                  {PN.convertEnToPe(22)}
                  </span>
                  <span className="text-sm text-blueGray-400">دوستان</span>
                </div>
                <div className="ml-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                  {PN.convertEnToPe(10)}
                  </span>
                  <span className="text-sm text-blueGray-400">عکس ها</span>
                </div>
                <div className="lg:ml-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                  {PN.convertEnToPe(89)}
                  </span>
                  <span className="text-sm text-blueGray-400">کامنت ها</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              فاطمه زهرایی
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt ml-2 text-lg text-blueGray-400"></i>{" "}
              استان نهران، تهران
            </div>
            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="fas fa-briefcase ml-2 text-lg text-blueGray-400"></i>
              برنامه نویس
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-university ml-2 text-lg text-blueGray-400"></i>
              دانشگاه تهران
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                لورم ایپسوم مفهوم گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. 
                </p>
                <a
                  href="#pablo"
                  className="font-normal text-lightBlue-500"
                  onClick={(e) => e.preventDefault()}
                >
                  نمایش بیشتر
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProfile;
