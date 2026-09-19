import * as React from "react"
import { cn } from "@/lib/utils"
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription,
  CardContent 
} from "@/components/ui/card"

// SVG Inline for Shopping Cart Icon
const ShoppingCartIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
  >
    <g data-optical-balance="1.042" transform="translate(12 12) scale(1.042) translate(-12 -12)">
      <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <g id="Shop" transform="translate(-64, -481)" fillRule="nonzero" stroke="currentColor" strokeWidth="1.5">
          <g id="shopping-cart" transform="translate(44, 413)">
            <g id="Icon/Shopping-cart/Linear" transform="translate(20, 68)">
              <path d="M2,2 L3.74000549,2 C4.82000554,2 5.67000183,2.92999995 5.58000183,4 L4.75,13.9599915 C4.61,15.5899915 5.8999933,16.9899902 7.53999329,16.9899902 L18.1900024,16.9899902 C19.6300025,16.9899902 20.89,15.8100048 21,14.3800049 L21.5399933,6.88000488 C21.6599933,5.22000492 20.3999957,3.86999512 18.7299957,3.86999512 L5.82000732,3.86999512" fillRule="nonzero" stroke="currentColor" strokeWidth="1.5"></path>
              <path d="M17.5,20.75 C17.5,21.440356 16.940356,22 16.25,22 C15.559644,22 15,21.440356 15,20.75 C15,20.059644 15.559644,19.5 16.25,19.5 C16.940356,19.5 17.5,20.059644 17.5,20.75 Z" fill="currentColor"></path>
              <path d="M9.5,20.75 C9.5,21.440356