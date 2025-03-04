
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { userLogOut } from "../features/auth/userSlice";
import { useNavigate } from "react-router";
import { useUserLogOutMutation } from "../features/auth/authApi";
import { userLogOut } from "../features/auth/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { useUserLogOutMutation } from "../features/auth/authApi";


// user profile menu component
const userMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    value: "profile",
  },

  {
    label: "Sign Out",
    icon: PowerIcon,
    value: "signout",
  },
];

// admin profile menu component
const adminMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    value: "profile",
  },
  {
    label: "File",
    icon: UserCircleIcon,
    value: "uploadFile",
  },

  {
    label: "Sign Out",
    icon: PowerIcon,
    value: "signout",
  },
];

const ProfileMenu = ({ user }) => {
  // const [signOut, { isLoading }] = useUserLogOutMutation();
  const dispatch = useDispatch();


  const [signOut, { isLoading }] = useUserLogOutMutation();
  // console.log(signOutUser);
  const nav = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const menus = user.isAdmin ? adminMenuItems : userMenuItems;

  const signOutUser = async () => {
    try {
      await signOut().unwrap();
      dispatch(userLogOut());
    } catch (err) {
      console.log(err);
      toast.error("errors occurs");
    }
  }



  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {menus.map(({ label, icon, value }, key) => {
          const isLastItem = key === menus.length - 1;
          return (

            <MenuItem
              key={label}
              onClick={() => {

                switch (value) {
                  case "profile":
                    nav('/user-profile')
                    break;

                  case "uploadFile":
                    nav('/file-upload');

                    break;

                  case "signout":
                    signOutUser();
                    closeMenu();
                    toast.success("Sign out successfully");
                }


              }}
              className={`flex items-center gap-2 rounded ${isLastItem
                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                : ""
                }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}


export default ProfileMenu


