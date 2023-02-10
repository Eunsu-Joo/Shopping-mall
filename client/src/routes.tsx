import React from "react";

import DynamicIndex from "./pages";
import DynamicProduct from "./pages/product";
import DynamicProductId from "./pages/product/[id]";
import DynamicCart from "./pages/cart";
import DynamicPayment from "./pages/payment";
import Layout from "./_layout";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <DynamicIndex />, index: true },
      { path: "/products", element: <DynamicProduct />, index: true },
      { path: "/product/:id", element: <DynamicProductId /> },
      { path: "/cart", element: <DynamicCart /> },
      { path: "/payment", element: <DynamicPayment /> },
    ],
  },
];

export const pages = [
  { route: "/" },
  { route: "/products" },
  { route: "/product/:id" },
  { route: "/cart" },
  { route: "/payment" },
];
