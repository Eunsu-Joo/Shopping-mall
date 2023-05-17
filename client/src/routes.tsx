import React from "react";

import DynamicProduct from "./pages/product";
import DynamicProductId from "./pages/product/[id]";
import DynamicCart from "./pages/cart";
import DynamicPayment from "./pages/payment";
import Layout from "./_layout";
import DynamicAdminAdd from "./pages/admin/add";
import DynamicAdmin from "./pages/admin/index";
import DynamicAdminEdit from "./pages/admin/[id]";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/products", element: <DynamicProduct />, index: true },
      { path: "/product/:id", element: <DynamicProductId /> },
      { path: "/cart", element: <DynamicCart />, index: true },
      { path: "/payment", element: <DynamicPayment />, index: true },
      { path: "/admin", element: <DynamicAdmin />, index: true },
      { path: "/admin/add", element: <DynamicAdminAdd />, index: true },
      { path: "/admin/:id", element: <DynamicAdminEdit />, index: true },
    ],
  },
];

export const pages = [
  { route: "/products" },
  { route: "/product/:id" },
  { route: "/cart" },
  { route: "/payment" },
  { route: "/admin" },
  { route: "/admin/add" },
  { route: "/admin/:id" },
];
