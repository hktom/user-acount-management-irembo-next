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
  Spinner,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import NextLink from "next/link";
import { useAppDispatch, useAppSelector } from "@/config/store";
import { AuthAction } from "@/config/helpers/enum";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { login, login_multi_factor } from "@/config/redux/auth/authSlice";
import { useRouter } from "next/router";

type Inputs = {
  email: string;
  password: string;
};

function LoginPage() {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (authState.action === AuthAction.LOGIN_MULTI_FACTOR_SUCCESS) {
      router.push("/auth/multi-factore");
    }
  }, [authState, router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(login_multi_factor(data));
  };

  return (
    <AuthLayout title="Welcome to Z" subtitle="Login">
      {authState.action === AuthAction.LOGIN_MULTI_FACTOR_FAILED && (
        <Alert status="error" mt={5}>
          <AlertIcon />
          {authState.message}
        </Alert>
      )}

      {authState.action === AuthAction.LOGIN_MULTI_FACTOR_SUCCESS && (
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
        <FormControl my={5}>
          <FormLabel>Password</FormLabel>
          <Input type="password" required {...register("password")} />
        </FormControl>
        <Button
          colorScheme="teal"
          size="md"
          type="submit"
          isLoading={authState.action == AuthAction.LOGIN_MULTI_FACTOR}
        >
          Login
        </Button>

        <Link
          as={NextLink}
          href="/auth/login-link"
          display={"block"}
          mt={5}
          mb={4}
          color="teal"
        >
          Send me a the magic link
        </Link>

        <Link
          as={NextLink}
          href="/auth/forgot-password"
          display={"block"}
          mb={2}
        >
          Forgot password?
        </Link>

        <Link as={NextLink} href="/auth/register" display={"block"}>
          {"Don't have an account? Sign Up"}
        </Link>
      </Box>
    </AuthLayout>
  );
}

export default LoginPage;
