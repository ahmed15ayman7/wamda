import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import useStore from "@/hooks/zustand";

const SidebarItems = ({ toggleMobileSidebar }: {toggleMobileSidebar?:(event: React.MouseEvent<HTMLElement>) => void}) => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const { getLang } = useStore();
  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div" dir={getLang()==="en"?"ltr":"rtl"}>
        {Menuitems.map((item) => {
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
