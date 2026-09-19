# دکمه جستجو (Search Button)

## معرفی
این فایل یک کامپوننت دکمهٔ جستجو است که با ترکیب کامپوننت Button از Design System دیگ و آیکون Search از دیگچه ساخته شده است.

## Design System Components
- **Button**: از طراحی سیستم دیگ استفاده شده است. این کامپوننت از `class-variance-authority` برای مدیریت واریانت‌ها و اندازه‌ها بهره می‌برد.
  - واریانت‌ها: `default`, `secondary`, `outline`, `bordered`, `flat`, `faded`, `shadow`, `ghost`, `destructive`, `link`
  - اندازه‌ها: `default`, `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`
  - ویژگی‌ها: `loading`, `disabled`, `fullWidth`, `asChild`

## Icons
- **Search**: آیکون جستجو از دیگچه (سبک Linear، دستهٔ Search & Discovery)
  - slug: `search`
  - سبک: Linear

## دلیل انتخاب
- **Button**: به دلیل پشتیبانی کامل از واریانت‌ها، اندازه‌ها و accessibility و همچنین سازگاری با RTL.
- **Search Icon**: انتخاب شده چون دقیقاً مفهوم جستجو را نشان می‌دهد و در سبک Linear طراحی شده که با رابط‌های کاربری محصولی سازگار است.

## نحوهٔ استفاده

### پیش‌نیازها
- پروژه باید `@/components/ui/button` را از Design System دیگ داشته باشد.
- آیکون‌ها از دیگچه دریافت شده‌اند و می‌توانید مستقیماً از SVG استفاده کنید.

### نصب
اگر کامپوننت Button را ندارید، از مستندات دیگ نصب کنید:
```bash
# نمونه دستور نصب (بسته به ساختار پروژه)
npx -y @digdesign/registry-cli@latest install button
```

### استفاده
```tsx
import { SearchButton } from "@/components/SearchButton";

function MyPage() {
  return (
    <div dir="rtl">
      <SearchButton />
    </div>
  );
}

export default MyPage;
```

### شخصی‌سازی
می‌توانید واریانت، رنگ و اندازه دکمه را تغییر دهید:
```tsx
<Button variant="primary" size="lg">
  <SearchIcon className="size-4" />
  جستجو
</Button>
```

## محدودیت‌ها
- این کامپوننت به کامپوننت Button از دیگ وابسته است.
- آیکون جستجو فقط در سبک Linear موجود است و اگر نیاز به سبک دیگری دارید، باید از دیگچه جستجو کنید.

## لینک‌ها
- مستندات Button: [https://docs.digdesign.ir/docs/components/button](https://docs.digdesign.ir/docs/components/button)
- مستندات دیگچه: [https://digche.vercel.app](https://digche.vercel.app)
