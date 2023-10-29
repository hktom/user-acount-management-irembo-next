import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout(props: MainLayoutProps) {
  return (
    <>
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
              <MenuItem as={NextLink} href="/user/index">
                My Account
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Help">
              <MenuItem as="button" onClick={() => console.log("logout")}>
                Logout
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
      <Image
        src="/pexels-entumoto-camp-17831035.jpg"
        alt="Dan Abramov"
        w="100%"
        h={"380px"}
        objectFit={"cover"}
      />
      <Box w="100%" backgroundColor="#F6F6F6" p={4} minHeight={"100vh"}>
        <Box
          mx="auto"
          maxW={"80rem"}
          mt={10}
          backgroundColor={"#fff"}
          borderRadius={4}
          px={20}
          py={8}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          {props.children}
        </Box>
      </Box>
    </>
  );
}

export default MainLayout;
