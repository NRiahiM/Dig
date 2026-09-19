# PrimarySearchButton (دیگ + دیگچه)

یک دکمهٔ اصلی برای «شروع جستجو» با آیکون جستجو در سمت راست متن (مطابق RTL).

## اجزای استفاده‌شده
- کامپوننت دکمه از دیزاین‌سیستم دیگ: `Button` از مسیر `@/components/ui/button`.
  - چرا؟ چون واریانت‌ها و رنگ‌ها را پشتیبانی می‌کند و با RTL سازگار است.
- آیکون دیگچه: `search` در سبک Linear.
  - چرا؟ استانداردترین نماد جستجو (ذره‌بین) است، با stroke `currentColor` هماهنگ با رنگ دکمه می‌شود و اندازه‌پذیر است.

## نحوهٔ استفاده
```tsx
import PrimarySearchButton from "@/components/PrimarySearchButton";

export default function Example() {
  return (
    <div dir="rtl" className="p-4 space-y-4">
      <PrimarySearchButton onClick={() => console.log('start search')} />

      {/* نمونه‌های سفارشی‌سازی */}
      <PrimarySearchButton size="lg">شروع جستجو</PrimarySearchButton>
      <PrimarySearchButton disabled>در حال جستجو...</PrimarySearchButton>
    </div>
  );
}
```

- این دکمه با `color="primary"` ساخته شده است تا دکمهٔ اصلی باشد.
- آیکون در JSX قبل از متن آمده است تا در محیط RTL در سمت راست متن قرار بگیرد.
- اگر در پروژه شما مسیر import دکمهٔ دیگ متفاوت است، مسیر `@/components/ui/button` را مطابق تنظیمات خود تغییر دهید.

## دسترس‌پذیری
- آیکون `aria-hidden="true"` است تا توسط صفحه‌خوان‌ها نادیده گرفته شود.
- خود دکمه باید یک برچسب متنی مناسب داشته باشد (متن «شروع جستجو» یا children شما).

## لایسنس آیکون
- Digche icon license: https://digche.vercel.app/terms
