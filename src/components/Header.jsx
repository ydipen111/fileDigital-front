import React from "react";

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileMenu from "../ui/ProfileMenu";
import SearchPage from "../features/search/SearchPage";
import SearchInput from "../features/search/SearchInput";





export function Header() {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  // console.log(user);


  const [isNavOpen, setIsNavOpen] = React.useState(false);


  return (
    <div className="bg-white p-4  border-b-4 border-blue-gray-100">
      <div className="relative mx-auto flex items-center justify-between px-[100px] text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 text-2xl cursor-pointer py-1.5 font-medium"
        >
          <div onClick={() => nav('/')}>
            File Digitilization system
          </div>
        </Typography>
        <div className="flex flex-row justify-evenly gap-20 items-center">
          {/* search box */}
          <div>

            <SearchInput />

          </div>



          {/* login and signup */}

          <div >
            {
              user ? (
                <ProfileMenu user={user} />) : <div>


                <Button size="sm" variant="text">
                  <span
                    onClick={() => {
                      nav('/sign-up')
                    }}
                  >Sign-up</span>

                </Button>
                <Button size="sm" variant="text">
                  <span
                    onClick={() => {
                      nav('/login')
                    }}
                  >Log In</span>

                </Button>



              </div>

            }
          </div>
        </div>
      </div>
    </div>
  );
}