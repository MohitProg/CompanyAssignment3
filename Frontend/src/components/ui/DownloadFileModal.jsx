import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DownloadFileModal = ({ TagValue, htmlContentRef }) => {
  //   blob funnctionality for downloading file
  const handleDownloadPdf = () => {
    if (TagValue !== undefined && TagValue !== null) {
      TagValue.target.style.outline = "none";

      const blob = new Blob([htmlContentRef?.current?.innerHTML], {
        type: "text/html",
      });
      const url = URL.createObjectURL(blob);
      console.log(url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sample.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className="text-white cmn-btn p-2 font-bold">
          {" "}
          Export Template
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose Any One Option</DialogTitle>
          </DialogHeader>

          <div className="mt-2 flex flex-col gap-4 bg-gray-200 p-2 rounded-lg ">
            <button
              onClick={handleDownloadPdf}
              className="p-2  bg-orange-400 w-full rounded-lg main-text"
            >
              Download HTML File
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DownloadFileModal;
