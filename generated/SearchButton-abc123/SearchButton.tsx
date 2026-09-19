"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

// SVG آیکون جستجو از دیگچه (سبک Linear)
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Basic-Search" fillRule="nonzero">
        <g id="Search">
          <g id="Icon/Search/Linear">
            <path
              d="M21,11.5 C21,16.7467051 16.7467051,21 11.5,21 C6.25329494,21 2,16.7467051 2,11.5 C2,6.25329494 6.25329494,2 11.5,2 C16.7467051,2 21,6.25329494 21,11.5 Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="22"
              y1="22"
              x2="20"
              y2="20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polygon id="Vector" opacity="0" points="0 0 24 0 24 24 0 24" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

/**
 * دکمه جستجو با آیکون مناسب
 * بر اساس کامپوننت Button از Design System دیگ و آیکون search از دیگچه
 */
export function SearchButton() {
  return (
    <Button variant="outline" size="default">
      <SearchIcon className="size-4" />
      <span className="rtl">جستجو</span>
    </Button>
  );
}

export default SearchButton;
