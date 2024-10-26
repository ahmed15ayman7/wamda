import {

  IconLayoutDashboard,
  IconLogin,

  IconUserPlus,
  IconUsers,
  IconReceipt2,
  IconCategoryPlus,

} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems1 = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    title2:"dashboard",
    href: "/dashboard",
  },
  {
    navlabel: true,
    subheader: "Utilities",
  },
  {
    id: uniqueId(),
    title: "Users",
    title2:"users",
    icon: IconUsers,
    href: "/dashboard/utilities/users",
  },
  
  {
    id: uniqueId(),
    title: "Products",
    title2:"products",
    icon: IconReceipt2, // You can choose any icon
    href: "/dashboard/utilities/products",
  },
  {
    id: uniqueId(),
    title: "Categories",
    title2:"categories",
    icon: IconCategoryPlus, // You can choose any icon
    href: "/dashboard/utilities/categories",
  },
  {
    id: uniqueId(),
    title: "Units",
    title2:"units",
    icon: IconCategoryPlus, // You can choose any icon
    href: "/dashboard/utilities/units",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    title2:"login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register Users",
    title2:"registerUsers",
    icon: IconUserPlus,
    href: "/dashboard/utilities/users/add",
  },
];
const Menuitems2 = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    title2:"Home",
    href: "/dashboard",
  },
  {
    navlabel: true,
    subheader: "Utilities",
  },

  
  {
    id: uniqueId(),
    title: "Products",
    title2:"products",
    icon: IconReceipt2, // You can choose any icon
    href: "/dashboard/utilities/products",
  },
  {
    id: uniqueId(),
    title: "Categories",
    title2:"categories",
    icon: IconCategoryPlus, // You can choose any icon
    href: "/dashboard/utilities/categories",
  },

  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    title2:"login",
    icon: IconLogin,
    href: "/authentication/login",
  },
 
];

export  {Menuitems1,Menuitems2};
