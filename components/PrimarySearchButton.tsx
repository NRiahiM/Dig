'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";

// Digche: Search (Linear) — embedded as a React component using currentColor
export type IconProps = React.SVGProps<SVGSVGElement>;

export const SearchIcon = React.forwardRef<SVGSVGElement, IconProps>(function SearchIcon(
  { width = 20, height = 20, ...props },
  ref
) {
  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...props}
    >
      <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Basic-Search" transform="translate(-64, -234)" fillRule="nonzero">
          <g id="Search" transform="translate(44, 166)">
            <g id="Icon/Search/Linear" transform="translate(20, 68)">
              <path
                d="M21,11.5 C21,16.7467051 16.7467051,21 11.5,21 C6.25329494,21 2,16.7467051 2,11.5 C2,6.25329494 6.25329494,2 11.5,2 C16.7467051,2 21,6.25329494 21,11.5 Z"
                id="Vector"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <line
                x1="22"
                y1="22"
                x2="20"
                y2="20"
                id="Vector"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></line>
              <polygon id="Vector" opacity="0" points="0 0 24 0 24 24 0 24"></polygon>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
});

// Primary (color=primary) search button with the icon on the right of the label in RTL
export function PrimarySearchButton(
  props: React.ComponentProps<typeof Button>
) {
  return (
    <Button color="primary" dir="rtl" {...props}>
      {/* In RTL, placing the icon before the text renders it on the right side */}
      <SearchIcon aria-hidden="true" className="shrink-0" />
      شروع جستجو
    </Button>
  );
}

export default PrimarySearchButton;
