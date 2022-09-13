import React, { useEffect, useRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import Image from "next/image";
import axiosInstance from "../../utils/axiosInstance";
import { getCookie } from "cookies-next";

const UserDropdown: React.FC = () => {
  const [userPhoto, setUserPhoto] = useState<string>("")
  const token = getCookie("accessToken")
  const fetchUser = () => {
    axiosInstance.get('user/myprofile', {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    })
    .then(response => setUserPhoto(response.data.avatarSource))
    .then(response => console.log(userPhoto) )
    
  } 

  useEffect(()=> {
    fetchUser()
  },[userPhoto])
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] =
    React.useState<boolean>(false);

  const btnDropdownRef = useRef<HTMLAnchorElement>();
  const popoverDropdownRef = useRef<HTMLDivElement>();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <div >
      <a
        className="text-slate-500 block cursor-default"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-slate-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={userPhoto}
            />
          </span>
        </div>
      </a>

    </div>
  );
};

export default UserDropdown;
