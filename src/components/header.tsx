import { AuthAction } from "@/config/helpers/enum";
import { logout } from "@/config/redux/auth/authSlice";
import { useAppSelector, useAppDispatch } from "@/config/store";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Heading,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Box,
  Spinner,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect } from "react";
import Cookies from "js-cookie";

function Header() {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (AuthAction.LOGOUT_SUCCESS === authState.action) {
      Cookies.remove("token");
      window.location.href = "/auth/login";
    }
  }, [authState.action]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={"space-between"}
      px={4}
      py={4}
      backgroundColor={"#292D3F"}
    >
      <Heading color="#fff">Z company</Heading>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon color="#fff" />}
          variant="outline"
        />
        <MenuList>
          <MenuGroup title="Profile">
            <MenuItem as={NextLink} href="/user/">
              My Account
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Help">
            <MenuItem as="button" onClick={() => dispatch(logout())}>
              Logout {authState.action === AuthAction.LOGOUT && <Spinner />}
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>
  );
}

export default Header;
