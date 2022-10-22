import React, { useEffect, useState } from "react";
import { number } from "yup/lib/locale";
import axiosInstance from "../../utils/axiosInstance";
import CardStats from "../Cards/CardStats";
import PN from "persian-number";

//react icons
import {FaUsers, FaUserSlash, FaComments} from 'react-icons/fa'
import {RiUserStarFill} from 'react-icons/ri'
import {BsFilePostFill} from 'react-icons/bs'
import {MdOutlineComment,  MdFileDownloadDone, MdPendingActions} from 'react-icons/md'
import {BiCategoryAlt} from 'react-icons/bi'
import {AiTwotoneLike} from 'react-icons/ai'
import {TbTruckLoading} from 'react-icons/tb'
import {ImBooks} from 'react-icons/im'


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
  allusers:  0,
  deactiveusers: 0,
  lastorders: [],
  lastusers: []}

const HeaderStats: React.FC = () => {
  const [cartData, setCartData] = useState(defaultValue)

  const fetchCart =  () => {
    axiosInstance.get('admin/statistics')
    .then(res => setCartData(res.data))
  }
  
  useEffect(()=> {
    fetchCart()
     },[])
     
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
              {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="دسته بندی"
                  statIconName={<BiCategoryAlt />}
                  statIconColor="bg-gray-500"
                  statTitle={PN.convertEnToPe(cartData.allcategories)}

                />
              </div> */}
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="کتاب ها"
                  statIconName={<ImBooks />}
                  statIconColor="bg-green-500"
                  statTitle={PN.convertEnToPe(cartData.allbooks)}

                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="سفارشات"
                  statIconName={<TbTruckLoading />}
                  statIconColor="bg-blue-500"
                  statTitle={PN.convertEnToPe(cartData.allorders)}

                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="سفارشات انجام شده"
                  statIconName={<MdFileDownloadDone />}
                  statIconColor="bg-slate-500"
                  statTitle={PN.convertEnToPe(cartData.alldoneorders)}

                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="سفارشات فعال"
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
              {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="کامنت ها"
                  statIconName={<MdOutlineComment />}
                  statIconColor="bg-sky-500"
                  statTitle={PN.convertEnToPe(cartData.allcomments)}

                />
              </div> */}

 


              {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="لایک ها"
                  statIconName={<AiTwotoneLike />}
                  statIconColor="bg-red-500"
                  statTitle={PN.convertEnToPe(cartData.alllikes)}

                />
              </div> */}
              {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="نظرات کتاب ها"
                  statIconName={<FaComments />}
                  statIconColor="bg-green-500"
                  statTitle={PN.convertEnToPe(cartData.allbookrates)}

                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderStats;
