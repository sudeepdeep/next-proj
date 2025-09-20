/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

const FullScreen = ({ hideContent, onHideContent }: any) => {
  console.log(hideContent);
  return (
    <div>
      <Image
        alt="JavaScript logo"
        src={hideContent ? "/full-screen-exit.svg" : "/full-screen.svg"}
        width={20}
        height={20}
        onClick={onHideContent}
        className="rounded-sm cursor-pointer"
        title="View in full screen"
      />
    </div>
  );
};

export default FullScreen;
