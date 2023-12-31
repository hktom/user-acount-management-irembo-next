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
import { forgot_password, send_magic_link } from "@/config/redux/auth/authSlice";
import { useRouter } from "next/router";

type Inputs = {
  email: string;
};

function ForgotPasswordPage() {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(forgot_password(data));
  };

  return (
    <AuthLayout title="Welcome to Z" subtitle="Forgot Password">
      {authState.action === AuthAction.FORGOT_PASSWORD_FAILED && (
        <Alert status="error" mt={5}>
          <AlertIcon />
          {authState.message}
        </Alert>
      )}

      {authState.action === AuthAction.FORGOT_PASSWORD_SUCCESS && (
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
          <FormLabel>Email address</FormLabel>
          <Input type="email" required {...register("email")} />
        </FormControl>

        <Button
          colorScheme="teal"
          size="md"
          type="submit"
          mt={5}
          isLoading={authState.action == AuthAction.FORGOT_PASSWORD}
        >
          Send a forgot password link
        </Button>

        <Link as={NextLink} href="/auth/login" display={"block"} mt={5}>
          {"Login with password"}
        </Link>
      </Box>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;