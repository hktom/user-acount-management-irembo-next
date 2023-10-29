import { HOST_URL } from "@/config/apollo/config";
import {
  Gender,
  MARITAL_STATUS,
  AuthAction,
  HomeAction,
} from "@/config/helpers/enum";
import { update_profile } from "@/config/redux/home/homeSlice";
import { useAppDispatch, useAppSelector } from "@/config/store";
import MainLayout from "@/layout/mainLayout";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  date_of_birth: string;
};

function UpdatePage() {
  const stateHome = useAppSelector((state: any) => state.home);
  const dispatch = useAppDispatch();

  const [gender, setGender] = useState<string | null>(Gender.MAN);
  const [maritalStatus, setMaritalStatus] = useState<string | null>(
    MARITAL_STATUS.SINGLE
  );

  const field = (type: string, label: string, name: any, value: any) => {
    return (
      <FormControl my={3}>
        <FormLabel>{label}</FormLabel>
        <Input type={type} defaultValue={value} required {...register(name)} />
      </FormControl>
    );
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(
      update_profile({ ...data, gender: gender, marital_status: maritalStatus })
    );
  };

  return (
    <MainLayout>
      <Box w={"100%"}>
        <Heading mb={5}>Update Profile</Heading>

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
          onSubmit={handleSubmit(onSubmit)}
        >
          {field("text", "Last Name", "last_name", stateHome.user?.last_name)}
          {field(
            "text",
            "First Name",
            "first_name",
            stateHome.user?.first_name
          )}
          {field(
            "datetime-local",
            "Date of birth",
            "date_of_birth",
            stateHome.user?.date_of_birth
          )}

          <Box my={3}>
            <FormLabel>Select gender</FormLabel>
            <Select
              placeholder=""
              onChange={(e) => setGender(e.target.value)}
              defaultValue={stateHome.user?.gender}
            >
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
              defaultValue={stateHome.user?.marital_status}
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

export default UpdatePage;
