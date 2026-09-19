"use client";

import * as React from "react";
import { SearchField, type SearchFieldProps } from "@/components/ui/search-field";
import { SearchIcon } from "@/components/icons";

/**
 * کامپوننت SearchField
 * 
 * یک فیلد جستجوی حرفه‌ای با پشتیبانی از:
 * - آیکون جستجو
 * - دکمه پاک‌کردن متن
 * - فشردن Enter برای ارسال جستجو
 * - فشردن Escape برای پاک‌کردن سریع
 * - نمایش کلید میان‌بر (مثلاً Ctrl+K)
 * - حالت لودینگ با انیمیشن
 * 
 * این کامپوننت بر پایهٔ کامپوننت `SearchField` دیزاین‌سیستم دیگ ساخته شده
 * و آیکون `search` از دیگچه در آن استفاده می‌شود.
 */
export default function SearchFieldComponent(
  props: Omit<SearchFieldProps, "icon">
) {
  return (
    <SearchField
      icon={<SearchIcon className="size-4 shrink-0" />}
      placeholder="جستجو..."
      aria-label="جستجو"
      {...props}
    />
  );
}