import AuthLayout from "@/layout/authLayout";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import NextLink from "next/link";
import { useAppDispatch, useAppSelector } from "@/config/store";
import { AuthAction } from "@/config/helpers/enum";
import {
  forgot_password,
  reset_password,
  send_magic_link,
} from "@/config/redux/auth/authSlice";
import { useRouter } from "next/router";

type Inputs = {
  password: string;
  password_confirmation: string;
};

function ResetPasswordPage() {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(
      reset_password({
        ...data,
        email: router?.query?.email as string,
        token: router?.query?.token as string,
      })
    );
  };

  return (
    <AuthLayout title="Welcome to Z" subtitle="Reset Password">
      {authState.action === AuthAction.RESET_PASSWORD_FAILED && (
        <Alert status="error" mt={5}>
          <AlertIcon />
          {authState.message}
        </Alert>
      )}

      {authState.action === AuthAction.RESET_PASSWORD_SUCCESS && (
        <Alert status="success" mt={5}>
          <AlertIcon />
          {authState.message}
        </Alert>
      )}

      <Box
        as="form"
        display={"block"}
        w={"100%"}
        mt={10}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" required {...register("password")} />
        </FormControl>

        <FormControl>
          <FormLabel>Password confirmation</FormLabel>
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
          isLoading={authState.action == AuthAction.RESET_PASSWORD}
        >
          Reset password
        </Button>

        <Link as={NextLink} href="/auth/login" display={"block"} mt={5}>
          {"Login with password"}
        </Link>
      </Box>
    </AuthLayout>
  );
}

export default ResetPasswordPage;
