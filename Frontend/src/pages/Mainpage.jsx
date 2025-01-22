import React, { useEffect, useState } from "react";
import {
  GetEmailtempdata,
  GetSingleEmailtempdata,
} from "../redux/slice/EmailApi";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Mainpage = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { emailtempdata, getemailtempstatus } = useSelector(
    (state) => state.template
  );

  const HandleEditEmail = (emailid) => {
    try {
      dispatch(GetSingleEmailtempdata(emailid));
      Navigate(`/builder/${emailid}`);
    } catch (error) {}
  };

  useEffect(() => {
    if (getemailtempstatus === "idle") {
      dispatch(GetEmailtempdata());
    }
  }, [getemailtempstatus]);

  return (
    <div className="min-h-screen w-full  bg-[#16181d] flex flex-col  space-y-5">
      <h1 className="font-bold  text-center text-2xl main-text p-4  shadow-md sticky top-0 z-[999] bg-[#292c34]  ">
        Free HTML Email Templates{" "}
      </h1>

      {/* main section  */}

      <section className="w-full mt-5  space-y-5">
        <h1 className="text-xl  font-semibold main-text">
          Templates : total-{emailtempdata?.length}
        </h1>

        {getemailtempstatus === "pending" ? (
          <div className="h-screen flex items-center justify-center ">
            <ClipLoader color="#f39232" />
          </div>
        ) : (
          <>
            {emailtempdata?.length > 0 ? (
              <>
                <div className="w-full columns-2 md:columns-3 lg:columns-4  gap-5 space-y-8 mt-3">
                  {emailtempdata?.map((value) => (
                    <>
                      <div
                        className="relative  hover:scale-105 transition-all ease-out duration-300  overflow-hidden rounded-lg"
                        key={value?._id}
                      >
                        <img
                          src={value?.previewimg}
                          className="object-cover  h-full w-full "
                          alt=""
                        />

                        <div className="absolute bg-[#292c349a] top-0 left-0 right-0 transition-all ease-out duration-300 opacity-0 hover:opacity-100 w-full h-full flex items-center justify-center bottom-0 ">
                          <button
                            onClick={() => HandleEditEmail(value?._id)}
                            className="cmn-btn  p-2 opacity-100 main-text font-bold "
                          >
                            Edit Template
                          </button>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </>
            ) : (
              <div className="w-full h-[80vh] flex items-center justify-center">
                <h1>No Template is available</h1>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Mainpage;
