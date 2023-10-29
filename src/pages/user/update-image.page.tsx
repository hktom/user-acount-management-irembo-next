import { HOST_URL } from "@/config/apollo/config";
import {
  Gender,
  MARITAL_STATUS,
  AuthAction,
  HomeAction,
} from "@/config/helpers/enum";
import {
  home_reset_actions,
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import NextLink from "next/link";

// type Inputs = {
//   first_name: string;
//   last_name: string;
//   email: string;
//   password: string;
//   password_confirmation: string;
//   date_of_birth: string;
// };

function UpdateImage() {
  const stateHome = useAppSelector((state: any) => state.home);
  const dispatch = useAppDispatch();

  //   const [gender, setGender] = useState<string | null>(Gender.MAN);
  //   const [maritalStatus, setMaritalStatus] = useState<string | null>(
  //     MARITAL_STATUS.SINGLE
  //   );

  //   const {
  //     register,
  //     handleSubmit,
  //     watch,
  //     formState: { errors },
  //   } = useForm<Inputs>();
  //   const onSubmit: SubmitHandler<Inputs> = (data) => {
  //     dispatch(
  //       update_profile({ ...data, gender: gender, marital_status: maritalStatus })
  //     );
  //   };

  useEffect(() => {
    dispatch(home_reset_actions());
  }, [dispatch]);

  const displayImage = () => {
    let image =
      HomeAction.UPLOAD_IMAGE_SUCCESS == stateHome.action
        ? stateHome.image_link
        : stateHome.user?.photo;
    return (
      <Box mb={10}>
        <Avatar
        size={"2xl"}
        name={stateHome.user?.first_name + " " + stateHome.user?.last_name}
        src={HOST_URL + "/storage/" + image}
      />
      </Box>
    );
  };

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

        {HomeAction.UPDATE_PROFILE_FAILED == stateHome.action && (
          <Alert status="error">
            <AlertIcon />
            {stateHome.message}
          </Alert>
        )}

        {HomeAction.UPDATE_PROFILE_SUCCESS == stateHome.action && (
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
            dispatch(
              update_profile({
                ...stateHome.user,
                photo: stateHome.image_link,
              })
            );
          }}
        >
          {displayImage()}
          <FormControl my={3}>
            <FormLabel>Choose new image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              required
              onChange={(e) => {
                if (e && e.target?.files) {
                  dispatch(upload_image(e.target.files[0]));
                }
              }}
            />
          </FormControl>

          {HomeAction.UPLOAD_IMAGE == stateHome.action && (
            <Progress size="xs" isIndeterminate />
          )}

          {HomeAction.UPLOAD_IMAGE_FAILED == stateHome.action && (
            <Alert status="error">
              <AlertIcon />
              {stateHome.message}
            </Alert>
          )}

          <Button
            colorScheme="teal"
            size="md"
            type="submit"
            mt={5}
            isLoading={HomeAction.UPDATE_PROFILE == stateHome.action}
          >
            Update
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default UpdateImage;
