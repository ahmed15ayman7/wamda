import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {  IconMail, IconUser } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/lib/actions/user.action";

const Profile = ({setisLogin}:{setisLogin?:(id:boolean)=>void}) => {
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event:any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  // Fetch user data using React Query
  const { data: userData, isLoading,isFetched, isError } = useQuery({queryKey:['userData'],queryFn:()=> getUserData()});
const [userName, setname] = useState("Guest")
const [userEmail, setemail] = useState("guest@example.com")
useEffect(() => {
  setname(userData?.name||"Guest" )
  setemail(userData?.email ||"guest@example.com")
  userData &&setisLogin&&setisLogin(true)
}, [isLoading])


  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show profile options"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="user image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Profile Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText primary={userName} /> {/* Display user name */}
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText primary={userEmail} /> {/* Display user email */}
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            href="/authentication/login"
            variant="outlined"
            color="primary"
            component={Link}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
