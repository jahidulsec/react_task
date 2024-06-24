import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { LuDot } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";
import MkdSDK from "../utils/MkdSDK";
import { showToast, GlobalContext } from "../globalContext";
import { tokenExpireError, AuthContext } from "../authContext";
import { useNavigate } from "react-router";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext, closestCorners } from "@dnd-kit/core";
import TableCell from "../components/TableCell";



const AdminDashboardPage = () => {
  const [videos, setVideos] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const { dispatch: toastDispatch } = React.useContext(GlobalContext);
  const { dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();

  let sdk = new MkdSDK();

  const handleVideo = async (page = 1, limit = 10) => {
    try {
      const res = await sdk.callRestAPI(
        { page: page, limit: limit },
        "PAGINATE",
      );
      setVideos(res.list);
    } catch (error) {
      showToast(toastDispatch, error);
    }
  };

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    navigate("/admin/login");
  };

  const checkTokenMessage = async () => {
    const role = localStorage.getItem("role");
    try {
      const res = await sdk(role);
      return res.message;
    } catch (error) {
      return error;
    }
  };

  const getVideoPos = id => videos.findIndex(item => item.id === id)

  const handleDragEnd = (event) => {
    const {active, over} = event

    if(active.id === over.id) return;

    setVideos((item) => {
      const originalPos = getVideoPos(active.id)
      const newPos = getVideoPos(over.id)

      return arrayMove(videos, originalPos, newPos)
    })
    
  }

  useEffect(() => {
    const message = checkTokenMessage();
    tokenExpireError(dispatch, message);
    handleVideo(currentPage);
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <div className="text-text-default">
        {/* header */}
        <div className="header flex justify-between items-center gap-5 mb-5">
          <h1 className="text-5xl font-extrabold">APP</h1>
          <button
            className="bg-primary hover:bg-secondary transition-colors duration-500 text-text-secondary py-3 px-6 rounded-full flex gap-2 justify-center items-center"
            onClick={() => {
              handleLogout();
            }}
          >
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
            <div className="date">{new Intl.DateTimeFormat(['ban', 'id'], {dateStyle: 'medium'}).format(new Date())}</div>

            <LuDot />

            {/* submission status */}
            <div className="submission bg-primary text-text-secondary font-light p-2 rounded-xl">
              SUBMISSION OPEN
            </div>
            <LuDot />

            {/* time */}
            <div className="time">{new Intl.DateTimeFormat(['ban', 'id'], {timeStyle: 'short'}).format(new Date())}</div>
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
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div className="table-body flex flex-col gap-5">
            {videos !== undefined && (
              <SortableContext
                items={videos}
                strategy={verticalListSortingStrategy}
              >
                {videos !== undefined &&
                  videos.map((item) => <TableCell item={item} />)}
              </SortableContext>
            )}
          </div>
        </DndContext>

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
