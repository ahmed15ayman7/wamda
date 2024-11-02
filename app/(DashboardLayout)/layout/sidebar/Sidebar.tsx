"use client"
import { useMediaQuery, Box, Drawer } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { Upgrade } from "./Updrade";
import { Sidebar, Logo } from 'react-mui-sidebar';
import useStore from "@/hooks/zustand";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/lib/actions/user.action";

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const MSidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const sidebarWidth = "270px";
  const { getLang } = useStore();
  // Custom CSS for short scrollbar
  const scrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '7px',

    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#eff2f7',
      borderRadius: '15px',
    },
  };
  const gradientBackground = {
    background: 'linear-gradient(to bottom, #000000, #C3C3C3FF, #000000)',
  };
  const { data: userData, isLoading:isLoadinguser} = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserData()
  });
  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor={getLang()==="en"?"left":"right"}
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxSizing: "border-box",
              ...scrollbarStyles,
              ...gradientBackground
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Sidebar
              width={'270px'}
              collapsewidth="80px"
              open={isSidebarOpen}
              themeColor="#5d87ff"
              themeSecondaryColor="#49beff"
              showProfile={false}
            >
              {/* ------------------------------------------- */}
              {/* Logo */}
              {/* ------------------------------------------- */}
              <Logo img="/images/logos/dark-logo.svg" />
              <Box>
                {/* ------------------------------------------- */}
                {/* Sidebar Items */}
                {/* ------------------------------------------- */}
                <SidebarItems />
                {/* {!isLoadinguser&&userData.role==="admin"&&
                <Upgrade />
                } */}
              </Box>
            </Sidebar >
          </Box>
        </Drawer>
      </Box>
    );
  }
  
  return (
    <Drawer
    anchor={getLang()==="en"?"left":"right"}
    open={isMobileSidebarOpen}
    onClose={onSidebarClose}
    variant="temporary"
    PaperProps={{
      sx: {
        boxShadow: (theme) => theme.shadows[8],
        ...scrollbarStyles,
      },
    }}
    >
      {/* ------------------------------------------- */}
      {/* Sidebar Box */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <Sidebar
          width={'270px'}
          collapsewidth="80px"
          isCollapse={false}
          mode="light"
          anchor={getLang()==="en"?"ltr":"rtl"}
          themeColor="#5d87ff"
          themeSecondaryColor="#49beff"
          showProfile={false}
          >
          {/* ------------------------------------------- */}
          {/* Logo */}
          {/* ------------------------------------------- */}
          <Logo img="/images/logos/dark-logo.svg" />
          {/* ------------------------------------------- */}
          {/* Sidebar Items */}
          {/* ------------------------------------------- */}
          <SidebarItems />
          {/* {!isLoadinguser&&userData.role==="admin"&&
          <Upgrade />} */}
        </Sidebar>
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}

    </Drawer>
  );
};

export default MSidebar;





