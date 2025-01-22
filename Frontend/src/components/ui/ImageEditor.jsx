import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
const ImageEditor = ({ TagValue }) => {
  let currentTag = TagValue?.target;

  const [styleType, setStyleType] = useState(null);
  const [ImageUrl, setImageUrl] = useState(null);
  const [ImageBorder, setImageBorder] = useState(null);

  const handleUpdateImage = () => {
    // update image of current tag

    currentTag.src = ImageUrl;
  };

  //   useEffect for style
  useEffect(() => {
    if (styleType === "border-radius") {
      console.log(ImageBorder, currentTag);
      currentTag.style.borderRadius = `${ImageBorder}px`;
    }
  }, [styleType, ImageBorder]);

  // use Effect for default style

  useEffect(() => {
    if (currentTag !== undefined) {
      const computestyle = window.getComputedStyle(currentTag);
      setImageBorder(parseInt(computestyle?.borderRadius));

      setImageUrl(currentTag?.src);
    }
  }, [TagValue]);

  return (
    <>
      <div className="w-full ">
        <h1 className="mt-2 text-gray-300">Image</h1>

        <div className="flex flex-col gap-2 p-2  justify-start">
          <h1 className="text-gray-500">Enter Image Url</h1>
          <textarea
            className="border-[2px] focus:outline-1 outline-[#f39232] text-gray-500 border-solid border-gray-600 rounded-lg p-1  "
            value={ImageUrl||""}
            onChange={(e) => setImageUrl(e.target.value)}
            name=""
            id=""
            rows={10}
            placeholder="Enter the url of image "
          ></textarea>
          <button
            onClick={handleUpdateImage}
            className="cmn-btn p-2 mt-3 main-text"
          >
            Update Image
          </button>
        </div>

        <div className="mt-4 ">
          <div className="flex gap-2  p-2 items-center justify-between">
            <span className="text-gray-500">Border Radius</span>
            <div className="flex gap-2 items-center  rounded-lg">
              <button
                onClick={() => {
                  setImageBorder((prev) => prev - 1),
                    setStyleType("border-radius");
                }}
                className="p-2 bg-gray-300 rounded-lg hover:bg-gray-500"
              >
                <FiMinus size={10} />
              </button>
              <span className="text-sm text-gray-500">{ImageBorder}px</span>
              <button
                onClick={() => {
                  setImageBorder((prev) => prev + 1),
                    setStyleType("border-radius");
                }}
                className="p-2 bg-gray-300 hover:bg-gray-500 rounded-lg"
              >
                <FaPlus size={10} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageEditor;
