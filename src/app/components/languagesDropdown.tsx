/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useState } from "react";
import UIStore from "../store";
import { languages } from "../home/home";
import Image from "next/image";

const LanguagesDropdown: FC<any> = ({ language }) => {
  console.log(language);
  const ui: any = UIStore.useState();
  const [slug, setSlug] = useState(language.slug);
  const theme = ui.theme;
  function handleSlugChange(e: any) {
    setSlug(e.target.value);
    window.location.replace(`${e.target.value}`);
  }
  return (
    <div className=" flex gap-1.5 items-center">
      <Image src={`/${slug}.svg`} alt={slug} height={20} width={20} />
      <select
        value={slug}
        onChange={(e) => handleSlugChange(e)}
        className={`${
          theme == "dark"
            ? "text-yellow-400 bg-[#2D2D2D]"
            : "text-white bg-gray-600"
        } `}
      >
        {languages.map((item, index) => (
          <>
            <option value={item.slug} key={index}>
              {item.name}
            </option>
          </>
        ))}
      </select>
    </div>
  );
};

export default LanguagesDropdown;
