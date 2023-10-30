import { HOST_URL } from "@/config/apollo/config";
import { HomeAction, DOCUMENT_NAME } from "@/config/helpers/enum";
import {
  get_profile,
  home_reset_actions,
  update_document,
  update_profile,
  upload_image,
} from "@/config/redux/home/homeSlice";
import { useAppDispatch, useAppSelector } from "@/config/store";
import MainLayout from "@/layout/mainLayout";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Progress,
  Select,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import NextLink from "next/link";
import { useRouter } from "next/router";

type Inputs = {
  code: string;
};

function UpgradePage() {
  const stateHome = useAppSelector((state: any) => state.home);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(home_reset_actions());
  }, [dispatch]);

  useEffect(() => {
    if (router) {
      dispatch(get_profile(router.query?.id));
    }
  }, [dispatch, router]);

  return (
    <MainLayout>
      <Box w={"100%"}>
        <Heading mb={5}>
          <IconButton
            icon={<ChevronLeftIcon />}
            aria-label="Search database"
            as={NextLink}
            href="/user/"
          />{" "}
          Update Profile Image
        </Heading>

        {HomeAction.POST_DOCUMENT_FAILED == stateHome.action && (
          <Alert status="error">
            <AlertIcon />
            {stateHome.message}
          </Alert>
        )}

        {HomeAction.POST_DOCUMENT_SUCCESS == stateHome.action && (
          <Alert status="success">
            <AlertIcon />
            {stateHome.message}
          </Alert>
        )}

        <Box
          as="form"
          display={"block"}
          w={"100%"}
          mt={10}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Box mb={10}>
            <Box border={"2px solid #E7E7E7"} w={"450px"} h={"450px"}>
              <Image
                src={
                  HOST_URL + "/storage/" + stateHome.profile?.document?.photo
                }
                alt="Dan Abramov"
                fallbackSrc="/missing_product.jpeg"
                objectFit="cover"
                objectPosition="center"
                w={"100%"}
                h={"100%"}
              />
            </Box>
          </Box>

          <Box my={3}>
            <FormLabel>Change Account Status</FormLabel>
            <Select
              placeholder=""
              // onChange={(e) => setDocumentType(e.target.value)}
              defaultValue={stateHome.user?.document?.name}
            >
              <option value={DOCUMENT_NAME.PASSPORT}>
                {DOCUMENT_NAME.PASSPORT}
              </option>
            </Select>
          </Box>

          <Button
            colorScheme="teal"
            size="md"
            type="submit"
            mt={5}
            isLoading={HomeAction.POST_DOCUMENT == stateHome.action}
          >
            Update
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default UpgradePage;
