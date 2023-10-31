import { HOST_URL } from "@/config/apollo/config";
import { HomeAction, DOCUMENT_NAME, Status } from "@/config/helpers/enum";
import {
  get_profile,
  home_reset_actions,
  upgrade_profile,
  // update_document,
  // update_profile,
  // upload_image,
} from "@/config/redux/home/homeSlice";
import { useAppDispatch, useAppSelector } from "@/config/store";
import MainLayout from "@/layout/mainLayout";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  // Avatar,
  Box,
  Button,
  // FormControl,
  FormLabel,
  Heading,
  IconButton,
  // Input,
  // Progress,
  Select,
  Image,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { register } from "module";

// type Inputs = {
//   code: string;
// };

function UpgradePage() {
  const stateHome = useAppSelector((state: any) => state.home);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [verification, setVerification] = useState<string | null>(null);

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
            href="/user/all-users"
          />{" "}
          Verify profile
        </Heading>

        {HomeAction.UPGRADE_PROFILE_FAILED == stateHome.action && (
          <Alert status="error">
            <AlertIcon />
            {stateHome.message}
          </Alert>
        )}

        {HomeAction.UPGRADE_PROFILE_SUCCESS == stateHome.action && (
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
          onSubmit={(e:any) => {
            e.preventDefault();
            dispatch(
              upgrade_profile({ user_id: router.query?.id, status: verification })
            );
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

          <FormControl my={3}>
            <FormLabel>Document name</FormLabel>
            <Input
              type="text"
              defaultValue={stateHome.profile?.document?.name}
              disabled
              readOnly
            />
          </FormControl>

          <Box my={3}>
            <FormLabel>Change Account Status</FormLabel>
            <Select
              placeholder=""
              onChange={(e) => setVerification(e.target.value)}
              defaultValue={stateHome.profile?.document?.status}
            >
              <option value={Status.UNVERIFIED}>{Status.UNVERIFIED}</option>
              <option value={Status.VERIFIED}>{Status.VERIFIED}</option>
            </Select>
          </Box>

          <Button
            colorScheme="teal"
            size="md"
            type="submit"
            mt={5}
            isLoading={HomeAction.UPGRADE_PROFILE == stateHome.action}
          >
            Update
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default UpgradePage;
