import { AuthAction, DOCUMENT_NAME } from "@/config/helpers/enum";
import { home_reset_actions } from "@/config/redux/home/homeSlice";
import { useAppDispatch, useAppSelector } from "@/config/store";
import MainLayout from "@/layout/mainLayout";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import NextLink from "next/link";
import { update_password } from "@/config/redux/auth/authSlice";

type Inputs = {
  password: string;
  new_password: string;
  password_confirmation: string;
};

function UpdatePasswordPage() {
  const stateAuth = useAppSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(home_reset_actions());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(update_password(data));
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
          Update Password
        </Heading>

        {AuthAction.UPDATE_PASSWORD_FAILED == stateAuth.action && (
          <Alert status="error">
            <AlertIcon />
            {stateAuth.message}
          </Alert>
        )}

        {AuthAction.UPDATE_PASSWORD_SUCCESS == stateAuth.action && (
          <Alert status="success">
            <AlertIcon />
            {stateAuth.message}
          </Alert>
        )}

        <Box
          as="form"
          display={"block"}
          w={"100%"}
          mt={10}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl my={3}>
            <FormLabel>Current password</FormLabel>
            <Input type="password" required {...register("password")} />
          </FormControl>

          <FormControl my={3}>
            <FormLabel>New password</FormLabel>
            <Input type="password" required {...register("new_password")} />
          </FormControl>

          <FormControl my={3}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              required
              {...register("password_confirmation")}
            />
          </FormControl>

          <Button
            colorScheme="teal"
            size="md"
            type="submit"
            mt={5}
            isLoading={AuthAction.UPDATE_PASSWORD == stateAuth.action}
          >
            Update
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default UpdatePasswordPage;
