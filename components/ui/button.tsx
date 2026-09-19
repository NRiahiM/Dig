import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Slot } from "@/lib/primitives/slot";

/**
 * رنگ دکمه با چهار متغیر CSS منتقل می‌شود: --btn/--btn-foreground برای حالت
 * توپر و --btn-subtle/--btn-subtle-foreground برای پس‌زمینهٔ ملایمِ حالت‌های
 * ghost/bordered/flat (همان جفت رنگِ از‌پیش‌سنجیده‌ای که Badge هم برای soft
 * دارد). محور `variant` تصمیم می‌گیرد این رنگ‌ها ک