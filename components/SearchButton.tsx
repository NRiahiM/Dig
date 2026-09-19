"use client";

import React from "react";
import { Button, type ButtonProps } from "./ui/button";

/**
 * SearchButton - دکمه جستجو با آیکون Digche
 * 
 * یک دکمه جستجو که از کامپوننت Button سیستم طراحی Dig و
 * آیکون Linear Search از Digche استفاده می‌کند.
 * 
 * ویژگی‌ها:
 * - آیکون جستجوی استاندارد
 * - پشتیبانی از تمام واریانت‌های دکمه Dig
 * - حالت لودینگ و غیرفعال
 * - کامپاتیبیل با Tailwind CSS
 * 
 * مثال استفاده:
 * ```tsx
 * <SearchButton onClick={handleSearch} />
 * ```
 */
interface SearchButtonProps extends ButtonProps {
  /** متن دکمه (اختیاری) */
  label?: string;
  
  /** آیا آیکون نمایش داده شود؟ */
  showIcon?: boolean;
  
  /** آیا دکمه در حال لودینگ است؟ */
  isLoading?: boolean;
}

/**
 * آیکون Search به صورت SVG
 */
const SearchIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    className="text-current"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21,11.5 C21,16.7467051 16.7467051,21 11.5,21 C6.25329494,21 2,16.7467051 2,11.5 C2,6.25329494 6.25329494,2 11.5,2 C16.7467051,2 21,6.25329494 21,11.5 Z"></path>
    <line x1="22" y1="22" x2="20" y2="20"></line>
  </svg>
);

export function SearchButton({
  label = "جستجو",
  showIcon = true,
  isLoading = false,
  children,
  className,
  ...props
}: SearchButtonProps) {
  return (
    <Button
      variant="default"
      color="primary"
      size="default"
      loading={isLoading}
      disabled={isLoading}
      className={className}
      aria-label={label}
      {...props}
    >
      {showIcon && !isLoading && <SearchIcon />}
      {children || label}
    </Button>
  );
}

export default SearchButton;