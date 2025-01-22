import React from "react";
import { useNavigate } from "react-router-dom";


const Homepage = () => {
  const Navigate = useNavigate();
 

  return (
    <>
      <section className="h-screen w-full  bg-[#16181d] flex items-center justify-center">
        <div className="flex flex-col gap-4  text-center">
          <h1 className="main-text font-bold text-4xl">
            Welcome to Email Builder Your Email Buddy{" "}
          </h1>
          <p className="text-[#fffffb]">
            Builder your opertunity in your hand Without any Hesitation
          </p>

          <button onClick={()=>Navigate("/main")} className="cmn-btn main-text font-bold  mx-auto w-48 p-3 text hover:shadow-lg ">
            Get Started Now{" "}
          </button>
        </div>
      </section>
    </>
  );
};

export default Homepage;
