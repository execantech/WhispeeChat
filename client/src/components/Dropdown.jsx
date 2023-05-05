import React, { useState, useEffect, useRef } from "react";
import { isEmpty } from "./Utils.jsx";
import Avatar from "./user/Avatar.jsx";

export default function ProfilDropdown({ username, toggle, handleDisconnect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpwards, setIsUpwards] = useState(false);
  const ref = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const dropdownHeight =
      ref.current?.querySelector(".dropdown-content")?.offsetHeight;
    const dropdownPosition = ref.current?.getBoundingClientRect();

    setIsUpwards(dropdownPosition.bottom + dropdownHeight > windowHeight);
  }, [isOpen]);

  return (
    <>
      <div
        ref={ref}
        className="flex relative justify-between items-center mt-5 pt-5 border-t-[1px] border-neutral-200 dark:border-neutral-600"
      >
        <button
          className="flex items-center hover:bg-neutral-200 dark:hover:bg-neutral-800 p-2 rounded-lg"
          onClick={toggleDropdown}
        >
          <Avatar username={username}></Avatar>

          <span className="font-karla ml-2">{username}</span>
        </button>
        <div className="flex">
          <button
            id="theme-button"
            onClick={toggle}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 dark:active:bg-primary active:bg-primary p-2 rounded-xl"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.072 19.072c3.832-3.833 3.832-10.31 0-14.143-3.833-3.833-10.31-3.833-14.144 0-3.833 3.833-3.833 10.31 0 14.143s10.31 3.833 14.143 0ZM7.052 7.052c2.705-2.707 7.19-2.708 9.898 0l-9.9 9.898c-2.708-2.707-2.71-7.19 0-9.898Z"></path>
            </svg>
          </button>

          <button
            className="active:bg-primary dark:active:bg-primary p-2 rounded-xl text-gray-500 dark:hover:text-gray-300"
            id="paramNav"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4Zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2Z"></path>
              <path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.723 7.723 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.101 8.101 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733Zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.072 6.072 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108Z"></path>
            </svg>
          </button>
        </div>

        {isOpen ? (
          <div className="flex flex-col text-center translate-y-2 absolute bottom-full z-40 bg-slate-100 dark:bg-slate-600 shadow-lg py-0.5 rounded-lg w-48">
            <button
              className="flex p-2 font-semibold bg-slate-100 dark:bg-slate-600 text-red-500 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white rounded duration-200"
              onClick={handleDisconnect}
            >
              <span className="mx-auto">Disconnect</span>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
