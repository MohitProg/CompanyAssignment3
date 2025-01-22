import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleEmailtempdata } from "../redux/slice/EmailApi";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import ParagraphEditor from "@/components/ui/ParagraphEditor";
import ImageEditor from "@/components/ui/ImageEditor";
import DownloadFileModal from "@/components/ui/DownloadFileModal";
const Builderpage = () => {
  const htmlContentRef = useRef();
  const dispatch = useDispatch();
  const emailid = useLocation().pathname.split("/")[2];
  const { getsnglemailstempstatus, snglemailtempdata } = useSelector(
    (state) => state.template
  );

  // state for tag value

  const [TagValue, setTagValue] = useState(null);

  // state for tagname
  const [TagName, setTagName] = useState(null);

  const HandleBorderStyleOnClickOver = (e) => {
    e.target.style.border = "2px solid #9663ee";
  };

  // method to remove style on content deselect
  const HandleBorderStyleOnClickMove = (e) => {
    e.target.style.border = "0px solid #9663ee";
  };

  // method to get value of target element
  const HandleToGetSelectedElement = (e) => {
    let previousSelectedElement = TagValue;
  
    if (TagValue !== undefined && TagValue !==null) {
      console.log(previousSelectedElement, "value");
      previousSelectedElement.target.style.outline = "none";
    }

    if (e.target.innerText?.length > 0) {
      // console.log(e.target, "selected tag value");
      console.log("border apply " , "value")
      e.target.style.outline = "2px solid #25ec02";
      e.target.style.border = "1px solid #9663ee";
      setTagName(e?.target?.tagName);

      setTagValue(e);
    }

    if (e.target.src?.length > 0) {
      e.target.style.outline = "2px solid #25ec02";
      setTagName(e?.target?.tagName);

      setTagValue(e);
    }
  };

  console.log(TagValue);

  //  method to get latest change of html
  const handleEditorChange = () => {};

  useEffect(() => {
    if (getsnglemailstempstatus == "idle" && emailid?.length > 0) {
      dispatch(GetSingleEmailtempdata(emailid));
    }
  }, [getsnglemailstempstatus, emailid]);
  return (
    <>
      {getsnglemailstempstatus === "pending" ? (
        <div className="min-h-screen w-full  bg-[#16181d] flex items-center justify-center">
          <ClipLoader color="#f39232" />
        </div>
      ) : (
        <section className="min-h-screen w-full bg-white">
          <div className=" flex justify-between p-3 bg-[#292c34] ">
            <h1 className="text-white font-bold  p-2">Edit Your Template</h1>
            <div className="flex gap-4 items-center">
              <DownloadFileModal TagValue={TagValue} htmlContentRef={htmlContentRef} />
            </div>
          </div>
          <div className="grid grid-cols-4 w-full min-h-screen mt-2 ">
            <div className="col-span-3 max-h-screen p-2  overflow-y-scroll">
              <div
                ref={htmlContentRef}
                className="transition-all duration-300 ease-in-out"
                contentEditable={true}
                dangerouslySetInnerHTML={{
                  __html: snglemailtempdata?.htmlContent,
                }}
                onClick={(e) => HandleToGetSelectedElement(e)}
                onMouseOut={(e) => HandleBorderStyleOnClickMove(e)}
                onMouseOver={(e) => HandleBorderStyleOnClickOver(e)}
                onInput={handleEditorChange}
              ></div>
            </div>

            <div className="col-span-1 p-1 ">
              <h1 className="text-center font-bold">Edit Your File</h1>

              {/* paragraph property  */}

              {["H1", "H2", "H3", "P", "SPAN", "A", "LI","DIV"].includes(TagName) ? (
                <>
                  <ParagraphEditor TagValue={TagValue} />
                </>
              ) : // <>this is a paragraph</>
              TagName === "IMG" ? (
                <>
                  <ImageEditor TagValue={TagValue} />
                </>
              ) : (
                <>
                  <div className="h-full w-full flex items-center justify-center ">
                    <h1>Please Select Editable  Element For Edit</h1>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Builderpage;
