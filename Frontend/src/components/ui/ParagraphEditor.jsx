import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import tinycolor from "tinycolor2";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaAlignRight } from "react-icons/fa";
import { FaAlignLeft } from "react-icons/fa";
import { FaAlignCenter } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

const ParagraphEditor = ({ TagValue }) => {
  let currenttag = TagValue?.target;

  // state of style
  const [styleType, setStyleType] = useState(null);
  // state of feature
  const [FontSize, setFontSize] = useState(null);
  const [hexValue, setHexValue] = useState(null);
  const [TextAlign, setTextAlign] = useState(null);
  const [FontStyle, setFontStyle] = useState(null);

  const [FontWeight, setFontWeight] = useState(null);

  const [BgColor,setBgColor]=useState(null)

  // method to apply filter
  useEffect(() => {
    if (styleType === "font-family") {
      currenttag.style.fontFamily = FontStyle;
    }

    if (styleType === "font-weight") {
      currenttag.style.fontWeight = FontWeight;
    }

    if (styleType === "font-size") {
      currenttag.style.fontSize = `${FontSize}px`;
    }

    if (styleType === "font-color") {
      currenttag.style.color = hexValue;
    }

    if (styleType === "font-pos") {
      currenttag.style.textAlign = TextAlign;
    }

    if(styleType==="bg-color"){
      currenttag.style.backgroundColor=BgColor
    }
  }, [styleType, FontStyle, TextAlign, hexValue, FontSize, FontWeight,BgColor]);

  // useeffect for setting by default values

  useEffect(() => {
    console.log("tag value is changing");
    if (currenttag !== undefined) {
      const computedstyle = window?.getComputedStyle(currenttag);
      console.log(computedstyle.outline);

      setFontSize(parseInt(computedstyle.fontSize));


      setTextAlign(computedstyle?.textAlign);
      const bgColor = tinycolor(computedstyle?.backgroundColor).toHexString();
      setBgColor(bgColor)

      // coverting rgb color to hex
      const hexColor = tinycolor(computedstyle?.color).toHexString();
      setHexValue(hexColor);
    }
  }, [currenttag]);

  return (
    <>
      <div className="w-full">
        <h1 className="text-gray-400 mt-2 ">Paragraph</h1>
        <div className="flex flex-col gap-1 space-y-2 ">
          <div className="w-full flex justify-between items-center p-2 mt-2">
            <span className="text-gray-500  font-semibold">Font Family</span>

            {/* select option  */}
            <Select
              onValueChange={(e) => {
                setStyleType("font-family"), setFontStyle(e);
              }}
            >
              <SelectTrigger className="w-[150px] text-gray-500">
                <SelectValue placeholder="Font-Family" />
              </SelectTrigger>
              <SelectContent className="text-gray-500">
                <SelectGroup>
                  <SelectLabel>Font-Family</SelectLabel>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Helvetica">Helvetica</SelectItem>
                  <SelectItem value="monospace">monospace</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* font weight  */}

          <div className="w-full flex items-center justify-between p-2 mt-2">
            <span className="text-gray-500 font-semibold">Font Weight</span>
            {/*  */}

            <Select
              onValueChange={(e) => {
                setStyleType("font-weight"), setFontWeight(e);
              }}
            >
              <SelectTrigger className="w-[150px] text-gray-500">
                <SelectValue placeholder="font-weight" />
              </SelectTrigger>
              <SelectContent className="text-gray-500">
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>

                  <SelectItem value="lighter">Lighter</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                  <SelectItem value="bolder">Bolder</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* font size  */}
          <div className="w-full flex items-center justify-between p-2 mt-2">
            <span className="text-gray-500 font-semibold">Font Size</span>
            {/*  */}

            <div className="flex gap-2 items-center  rounded-lg">
              <button
                onClick={() => {
                  setFontSize(FontSize - 1), setStyleType("font-size");
                }}
                className="p-2 bg-gray-300 rounded-lg"
              >
                <FiMinus size={10} />
              </button>
              <span className="text-sm text-gray-500">{FontSize}px</span>
              <button
                onClick={() => {
                  setFontSize(FontSize + 1), setStyleType("font-size");
                }}
                className="p-2 bg-gray-300 rounded-lg"
              >
                <FaPlus size={10} />
              </button>
            </div>
          </div>

          {/* text color  */}
          <div className="w-full flex items-center justify-between p-2 mt-2">
            <span className="text-gray-500 font-semibold">Font Color</span>
            <div className="flex items-center gap-1">
              <input
                onChange={(e) => {
                  setHexValue(e.target.value), setStyleType("font-color");
                }}
                type="color"
                className="rounded-full outline-none border-none shadow-md w-8 h-8 "
                name=""
                value={hexValue||""}
                id=""
              />

              <span className="text-sm text-gray-500">{hexValue} </span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between p-2 mt-2">
            <span className="text-gray-500 font-semibold">Background Color</span>
            <div className="flex items-center gap-1">
              <input
                onChange={(e) => {
                  setBgColor(e.target.value), setStyleType("bg-color");
                }}
                type="color"
                className="rounded-full outline-none border-none shadow-md w-8 h-8 "
                name=""
                value={BgColor||""}
                id=""
              />

              <span className="text-sm text-gray-500">{BgColor} </span>
            </div>
          </div>

          {/* text alignment */}
          <div className="w-full flex items-center justify-between p-2 mt-2">
            <span className="text-gray-500 font-semibold">Text Align</span>
            <div className="flex items-center gap-4">
              <button
                className={` p-2 rounded-lg ${
                  TextAlign === "left" && "bg-gray-300"
                } `}
                onClick={() => {
                  setStyleType("font-pos"), setTextAlign("left");
                }}
              >
                <FaAlignLeft size={10} />
              </button>
              <button
                className={` p-2 rounded-lg ${
                  TextAlign === "center" && "bg-gray-300"
                } `}
                onClick={() => {
                  setStyleType("font-pos"), setTextAlign("center");
                }}
              >
                <FaAlignCenter size={10} />
              </button>

              <button
                className={` p-2 rounded-lg ${
                  TextAlign === "right" && "bg-gray-300"
                } `}
                onClick={() => {
                  setStyleType("font-pos"), setTextAlign("right");
                }}
              >
                <FaAlignRight size={10} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParagraphEditor;
