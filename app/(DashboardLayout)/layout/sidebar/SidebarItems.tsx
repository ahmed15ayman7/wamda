"use client"
import React from "react";
import {Menuitems1,Menuitems2} from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import useStore from "@/hooks/zustand";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/lib/actions/user.action";

const SidebarItems = ({ toggleMobileSidebar }: {toggleMobileSidebar?:(event: React.MouseEvent<HTMLElement>) => void}) => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const { getLang } = useStore();
  const { data: userData, isLoading:isLoadinguser} = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserData()
  });
  let MenuItems=!isLoadinguser&&userData.role==="admin"?Menuitems1:Menuitems2;
  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div" dir={getLang()==="en"?"ltr":"rtl"}>
        {MenuItems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar!}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
