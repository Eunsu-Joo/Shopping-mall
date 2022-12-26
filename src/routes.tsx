import React from "react";

import DynamicIndex from "./pages/index";
import DynamicProduct from "./pages/product";
import DynamicProductId from "./pages/product/[id]";

import Layout from "./_layout";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <DynamicIndex />, index: true },
      { path: "/product", element: <DynamicProduct />, index: true },
      { path: "/product/:id", element: <DynamicProductId /> },
    ],
  },
];

export const pages = [
  { route: "/" },
  { route: "/product" },
  { route: "/product/:id" },
];
