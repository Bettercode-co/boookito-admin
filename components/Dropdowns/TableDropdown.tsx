import React, { useRef } from "react";
import { createPopper } from "@popperjs/core";
import { FaEllipsisV } from "react-icons/fa";

const NotificationDropdown: React.FC = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] =
    React.useState<boolean>(false);

  const btnDropdownRef = useRef<HTMLAnchorElement>();
  const popoverDropdownRef = useRef<HTMLDivElement>();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
  };

  return (
    <div >
      <a
        className="text-slate-500 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={clickHandler}
      >
        <FaEllipsisV />
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-right py-2 list-none text-right rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a>
      </div>
    </div>
  );
};

export default NotificationDropdown;
