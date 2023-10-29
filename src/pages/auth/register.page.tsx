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
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import NextLink from "next/link";
import { useAppDispatch, useAppSelector } from "@/config/store";
import { AuthAction, Gender, MARITAL_STATUS } from "@/config/helpers/enum";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  login,
  login_multi_factor,
  register as signup,
} from "@/config/redux/auth/authSlice";

type Inputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
//   date_of_birth: string;
};

function LoginPage() {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  // const [gender, setGender] = useState<string | null>(Gender.MAN);
  // const [maritalStatus, setMaritalStatus] = useState<string | null>(MARITAL_STATUS.SINGLE);

  useEffect(() => {
    if (authState.action === AuthAction.REGISTER_SUCCESS && authState.token) {
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
    dispatch(signup(data));
  };

  const field = (type: string, label: string, name: any) => {
    return (
      <FormControl my={3}>
        <FormLabel>{label}</FormLabel>
        <Input type={type} required {...register(name)} />
      </FormControl>
    );
  };

  return (
    <AuthLayout title="Welcome to Z" subtitle="Register">
      {authState.action === AuthAction.REGISTER_FAILED && (
        <Alert status="error" mt={5}>
          <AlertIcon />
          {authState.message}
        </Alert>
      )}

      {authState.action === AuthAction.REGISTER_SUCCESS && (
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
        {field("text", "First Name", "first_name")}

        {field("text", "Last Name", "last_name")}

        {field("email", "Email", "email")}

        {field("password", "Password", "password")}

        {field("password", "Confirm Password", "password_confirmation")}

        {/* <Box my={3}>
          <FormLabel>Select gender</FormLabel>
          <Select placeholder="" onChange={(e) => setGender(e.target.value)}>
            <option value={Gender.MAN}>{Gender.MAN}</option>
            <option value={Gender.WOMAN}>{Gender.WOMAN}</option>
            <option value={Gender.OTHER}>{Gender.OTHER}</option>
          </Select>
        </Box>

        <Box my={3}>
          <FormLabel>Martial Status</FormLabel>
          <Select
            placeholder=""
            onChange={(e) => setMaritalStatus(e.target.value)}
          >
            <option value={MARITAL_STATUS.SINGLE}>
              {MARITAL_STATUS.SINGLE}
            </option>
            <option value={MARITAL_STATUS.MARRIED}>
              {MARITAL_STATUS.MARRIED}
            </option>
            <option value={MARITAL_STATUS.DIVORCED}>
              {MARITAL_STATUS.DIVORCED}
            </option>
            <option value={MARITAL_STATUS.WIDOWED}>
              {MARITAL_STATUS.WIDOWED}
            </option>
          </Select>
        </Box>

        {field("datetime-local", "Date of birth", "date_of_birth")} */}

        <Button colorScheme="teal" size="md" type="submit" mt={5}>
          Sign up
          {authState.action == AuthAction.REGISTER && <Spinner />}
        </Button>

        <Link as={NextLink} href="/auth/login" display={"block"} mt={5}>
          {"Already have an account? Login"}
        </Link>
      </Box>
    </AuthLayout>
  );
}

export default LoginPage;
