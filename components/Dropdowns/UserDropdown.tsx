import React, { useRef } from "react";
import { createPopper } from "@popperjs/core";
import Image from "next/image";

const UserDropdown: React.FC = () => {
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
            <Image
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="/img/team-1-800x800.jpg"
              width={300}
              height={300}
            />
          </span>
        </div>
      </a>

    </div>
  );
};

export default UserDropdown;
