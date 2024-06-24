import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { LuDot } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import {} from "../";
import MkdSDK from "../utils/MkdSDK";
import { showToast, GlobalContext } from "../globalContext";

const AdminDashboardPage = () => {
  const [videos, setVideos] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const { dispatch: toastDispatch } = React.useContext(GlobalContext);
  let sdk = new MkdSDK();

  const handleVideo = async (page = 1, limit = 10) => {
    try {
      const res = await sdk.callRestAPI(
        { page: page, limit: limit },
        "PAGINATE",
      );
      setVideos(res);
    } catch (error) {
      showToast(toastDispatch, error);
    }
  };

  useEffect(() => {
    handleVideo(currentPage);
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <div className="text-text-default">
        {/* header */}
        <div className="header flex justify-between items-center gap-5 mb-5">
          <h1 className="text-5xl font-extrabold">APP</h1>
          <button className="bg-primary hover:bg-secondary transition-colors duration-500 text-text-secondary py-3 px-6 rounded-full flex gap-2 justify-center items-center">
            <FiUser />
            <span>Logout</span>
          </button>
        </div>

        {/* Title */}
        <div className="flex justify-between items-center gap-5 mt-20">
          <h2 className="text-4xl font-thin">Today's leaderboard</h2>

          {/* datetime statue */}
          <div className="flex justify-center items-center gap-2 bg-item-bg py-4 px-6 rounded-xl font-thin">
            {/* date */}
            <div className="date">30 May 2022</div>

            <LuDot />

            {/* submission status */}
            <div className="submission bg-primary text-text-secondary font-light p-2 rounded-xl">
              SUBMISSION OPEN
            </div>
            <LuDot />

            {/* time */}
            <div className="time">11:34</div>
          </div>
        </div>

        {/* table */}
        {/* table header */}
        <div className="grid-container mt-5 font-thin px-5 py-4">
          <div>#</div>
          <div>Title</div>
          <div>Author</div>
          <div className="text-right flex justify-end items-center gap-1">
            <span>Most Liked</span>
            <FaChevronDown className="w-2.5" />
          </div>
        </div>

        {/* table body */}
        <div className="table-body flex flex-col gap-5">
          {videos !== undefined &&
            videos.list.map((item) => (
              <div className="grid-container font-thin justify-center items-center border hover:bg-bg-secondary border-border hover:border-border-hover rounded-xl py-5 px-4 transition-all duration-500">
                <div className="text-[17px]">{item.id}</div>
                <div className="relative flex items-center gap-5">
                  <img
                    src={item.photo}
                    alt="image"
                    width={118}
                    height={64}
                    className="w-[118px] h-[64px] object-cover object-top rounded-md"
                  />
                  <span className="text-xl font-thin max-w-[364px]">
                    {item.title}
                  </span>
                </div>
                <div className="avatar flex gap-2 items-center">
                  <img
                    src={"/image.png"}
                    alt="avatar"
                    className="w-[24px] aspect-square rounded-full"
                  />
                  <p className=" text-secondary">{item.username}</p>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span>{item.like}</span>
                  <FaArrowUp className=" text-primary" />
                </div>
              </div>
            ))}
        </div>

        {/* pagination */}
        {videos !== undefined && (
          <div className="flex justify-end items-center my-5 gap-5">
            {currentPage > 1 && (
              <button
                className="bg-primary text-text-secondary px-4 py-2 rounded-xl hover:bg-secondary font-medium transition-all duration-500"
                onClick={() => {
                  setCurrentPage((prev) => {
                    return prev - 1;
                  });
                }}
              >
                Previous
              </button>
            )}
            <button
              className="bg-primary text-text-secondary px-4 py-2 rounded-xl hover:bg-secondary font-medium transition-all duration-500"
              onClick={() => {
                setCurrentPage((prev) => {
                  return prev + 1;
                });
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboardPage;
