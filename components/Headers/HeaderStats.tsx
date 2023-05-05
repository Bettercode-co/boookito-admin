import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import CardStats from "../Cards/CardStats";
import PN from "persian-number";

//react icons
import { FaUsers, FaUserSlash } from "react-icons/fa";
import { RiUserStarFill } from "react-icons/ri";
import { BsFilePostFill } from "react-icons/bs";
import { MdFileDownloadDone, MdPendingActions } from "react-icons/md";
import { TbTruckLoading } from "react-icons/tb";
import { ImBooks } from "react-icons/im";
import { getCookie } from "cookies-next";
import {GiTrophyCup} from 'react-icons/gi'
import {VscLibrary} from 'react-icons/vsc'
import {SiBookstack} from 'react-icons/si'
import {BiCategory} from 'react-icons/bi'
const defaultValue = {
  activeorders: 0,
  activeusers: 0,
  allbookrates: 0,
  allbooks: 0,
  allcategories: 0,
  allcomments: 0,
  alldoneorders: 0,
  alllikes: 0,
  allorders: 0,
  allposts: 0,
  allusers: 0,
  sumBooks:{_sum:{fullquantity:0}},
  deactiveusers: 0,
  lastorders: [],
  topCategory:{categoryName:"ندارد"},
  lastusers: [],
};

const token = getCookie("accessToken");

const HeaderStats: React.FC = () => {
  const [cartData, setCartData] = useState(defaultValue);

  const fetchCart = () => {
    axiosInstance
      .get("admin/statistics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCartData(res.data));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="relative bg-slate-800 md:pt-14 pb-14 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="کل کاربران"
                  statTitle={PN.convertEnToPe(cartData.allusers)}
                  statIconName={<FaUsers />}
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="کاربران فعال"
                  statTitle={PN.convertEnToPe(cartData.activeusers)}
                  statIconColor="bg-green-500"
                  statIconName={<RiUserStarFill />}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="کاربران غیرفعال"
                  statIconName={<FaUserSlash />}
                  statIconColor="bg-red-500"
                  statTitle={PN.convertEnToPe(cartData.deactiveusers)}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="تعداد عنوان کتاب"
                  statIconName={<ImBooks />}
                  statIconColor="bg-green-500"
                  statTitle={PN.convertEnToPe(cartData.allbooks)}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="تعداد کل امانات"
                  statIconName={<TbTruckLoading />}
                  statIconColor="bg-blue-500"
                  statTitle={PN.convertEnToPe(cartData.allorders)}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="امانات تحویل داده شده"
                  statIconName={<MdFileDownloadDone />}
                  statIconColor="bg-slate-500"
                  statTitle={PN.convertEnToPe(cartData.alldoneorders)}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="امانات فعال"
                  statIconName={<MdPendingActions />}
                  statIconColor="bg-sky-500"
                  statTitle={PN.convertEnToPe(cartData.activeorders)}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="پست ها"
                  statIconName={<BsFilePostFill />}
                  statIconColor="bg-orange-500"
                  statTitle={PN.convertEnToPe(cartData.allposts)}
                />
              </div>


              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="تعداد جلد کتاب ها"
                  statIconName={<SiBookstack />}
                  statIconColor="bg-orange-500"
                  statTitle={PN.convertEnToPe(cartData.sumBooks._sum.fullquantity)}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="برترین دسته بندی"
                  statIconName={<GiTrophyCup />}
                  statIconColor="bg-green-500"
                  
                  statTitle={cartData.topCategory.categoryName}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="تعداد دسته بندی"
                  statIconName={<BiCategory />}
                  statIconColor="bg-red-500"
                  statTitle={PN.convertEnToPe(cartData.allcategories)}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="تعداد کتابخانه ها"
                  statIconName={<VscLibrary />}
                  statIconColor="bg-green-500"
                  statTitle={PN.convertEnToPe(4)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderStats;
