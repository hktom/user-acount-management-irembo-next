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

type Inputs = {
  token: string;
};

function MultiFactorPage() {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authState.action === AuthAction.LOGIN_SUCCESS && authState.token) {
      Cookies.set("token", authState.token);
      window.location.href = "/";
    }
  }, [authState]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(login(data));
  };

  return (
    <AuthLayout
      title="Welcome to Z"
      subtitle="Enter the confirmation code you have received in your email"
    >
      {authState.action === AuthAction.LOGIN_FAILED && (
        <Alert status="error" mt={5}>
          <AlertIcon />
          {authState.message}
        </Alert>
      )}

      {authState.action === AuthAction.LOGIN_SUCCESS && (
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
          <FormLabel>Confirmation Code</FormLabel>
          <Input type="text" required {...register("token")} />
        </FormControl>

        <Button colorScheme="teal" size="md" type="submit" mt={5} mb={5}>
          Login {authState.action == AuthAction.LOGIN && <Spinner />}
        </Button>

        <Link as={NextLink} href="/auth/login" display={"block"}>
          {"I didn't receive a code"}
        </Link>
      </Box>
    </AuthLayout>
  );
}

export default MultiFactorPage;
