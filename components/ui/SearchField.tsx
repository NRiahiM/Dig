"use client"

import * as React from "react"

import { TextField, type TextFieldProps } from "@/components/ui/text-field"
import { setNativeValue } from "@/components/ui/input"
import { SearchIcon, LoaderIcon } from "@/components/icons"

/**
 * SearchField = TextField با پنج چیز اضافه که مخصوص جستجوست:
 * آیکون جستجو در ابتدای فیلد، دکمهٔ پاک‌کردن (که خودِ Input دارد، فقط
 * پیش‌فرضش را روشن می‌کنیم)، Escape برای پاک‌کردن سریع، onSearch برای
 * لحظهٔ فشردن Enter (جدا از onValueChange که هر نویسه را می‌دهد)، و یک
 * نشانهٔ کلید میان‌بر اختیاری (مثل ⌘K) که وقتی فیلد خالی و بی‌فوکوس است
 * نشان داده می‌شود — دقیقاً همان الگویی که جعبهٔ جستجوی خودِ این مستندات
 * استفاده می‌کند.
 *
 * Escape با setNativeValue پاک می‌کند (همان راهی که دکمهٔ پاک‌کردن خودِ
 * Input استفاده می‌کند)، نه با یک state جدا — وگرنه در حالت uncontrolled
 * مقدار واقعیِ روی صفحه پاک نمی‌شد، فقط onValueChange خبر می‌داد.
 */
type SearchFieldProps = Omit<TextFieldProps, "type" | "startContent" | "endContent"> & {
  /** با فشردن Enter صدا زده می‌شود؛ برخلاف onValueChange که با هر نویسه اجرا می‌شود. */
  onSearch?: (value: string) => void
  /** آیکون جستجو را با اسپینر عوض می‌کند و دکمهٔ پاک‌کردن را غیرفعال نگه می‌دارد. */
  loading?: boolean
  /** نشانهٔ کلید میان‌بر (مثل «Ctrl+K»)؛ فقط وقتی فیلد خالی و بی‌فوکوس است دیده می‌شود. */
  shortcut?: React.ReactNode
  /** آیکون سفارشی به‌جای ذره‌بین پیش‌فرض. */
  icon?: React.ReactNode
  /** Escape مقدار را پاک می‌کند و فوکوس را نگه می‌دارد. پیش‌فرض روشن است. */
  clearOnEscape?: boolean
}

function SearchField({
  onSearch,
  onValueChange,
  onKeyDown,
  onFocus,
  onBlur,
  loading = false,
  shortcut,
  icon,
  clearable = true,
  clearOnEscape = true,
  placeholder = "جستجو…",
  ref,
  ...props
}: SearchFieldProps) {
  const innerRef = React.useRef<HTMLInputElement>(null)
  React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement, [])

  const [focused, setFocused] = React.useState(false)
  const [hasValue, setHasValue] = React.useState(
    () => String(props.value ?? props.defaultValue ?? "").length > 0
  )
  const hasShortcut = shortcut !== undefined && shortcut !== null

  return (
    <TextField
      ref={innerRef}
      type="search"
      placeholder={placeholder}
      clearable={clearable && !loading}
      startContent={
        loading ? (
          <LoaderIcon className="size-4 shrink-0 animate-spin text-muted-foreground" />
        ) : (
          (icon ?? <SearchIcon className="size-4 shrink-0" />)
        )
      }
      endContent={
        hasShortcut && !hasValue && !focused ? (
          <kbd
            dir="ltr"
            data-slot="search-field-shortcut"
            className="pointer-events-none shrink-0 rounded-full border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
          >
            {