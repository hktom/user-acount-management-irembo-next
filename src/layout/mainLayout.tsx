import Header from "@/components/header";
import { HomeAction } from "@/config/helpers/enum";
import { get_data } from "@/config/redux/home/homeSlice";
import { useAppDispatch, useAppSelector } from "@/config/store";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Image,
  Progress,
} from "@chakra-ui/react";
import { useEffect } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout(props: MainLayoutProps) {
  const state = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!state.user.id) {
      dispatch(get_data());
    }
  }, [dispatch, state.user.id]);
  return (
    <>
      <Header />
      {state.action === HomeAction.GET_DATA && (
        <Progress size="xs" isIndeterminate />
      )}

      {state.action === HomeAction.GET_ME_FAILED && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{"We couldn't load your profile"}</AlertTitle>
          <AlertDescription>
            {"Please try again in a few minutes"}
          </AlertDescription>
        </Alert>
      )}
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
          {state.user.id && props.children}
        </Box>
      </Box>
    </>
  );
}

export default MainLayout;
