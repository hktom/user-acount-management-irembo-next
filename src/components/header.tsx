import { AuthAction, Role, Status } from "@/config/helpers/enum";
import { logout } from "@/config/redux/auth/authSlice";
import { useAppSelector, useAppDispatch } from "@/config/store";
import { HamburgerIcon, StarIcon } from "@chakra-ui/icons";
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
  Badge,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect } from "react";
import Cookies from "js-cookie";

function Header() {
  const authState = useAppSelector((state) => state.auth);
  const homeState = useAppSelector((state) => state.home);
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
      justifyContent={"flex-start"}
      px={4}
      py={4}
      backgroundColor={"#292D3F"}
    >
      <Heading color="#fff" as={NextLink} href="/">
        Z company
      </Heading>

      <Box flexGrow={1} textAlign={"right"} mr={4}>
        <Text fontSize="xl" fontWeight="bold" color={"#fff"}>
          {homeState.user?.status === Status.VERIFIED && (
            <StarIcon mr="2" color="blue.300" />
          )}
          {homeState.user?.first_name} {homeState.user?.last_name}
        </Text>
      </Box>
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
            {homeState.user?.role === Role.ADMIN && (
              <MenuItem as={NextLink} href="/user/all-users">
                Users
              </MenuItem>
            )}
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
