import React from "react";

import DynamicIndex from "./pages";
import DynamicProduct from "./pages/product";
import DynamicProductId from "./pages/product/[id]";
import DynamicCart from "./pages/cart";
import DynamicPayment from "./pages/payment";
import Layout from "./_layout";
import DynamicAdmin from "./pages/admin";
export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <DynamicIndex />, index: true },
      { path: "/products", element: <DynamicProduct />, index: true },
      { path: "/product/:id", element: <DynamicProductId /> },
      { path: "/cart", element: <DynamicCart />, index: true },
      { path: "/payment", element: <DynamicPayment />, index: true },
      { path: "/admin", element: <DynamicAdmin />, index: true },
    ],
  },
];

export const pages = [
  { route: "/" },
  { route: "/products" },
  { route: "/product/:id" },
  { route: "/cart" },
  { route: "/payment" },
  { route: "/admin" },
];
