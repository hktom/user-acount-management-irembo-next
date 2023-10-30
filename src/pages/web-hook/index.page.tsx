import { AuthAction } from "@/config/helpers/enum";
import { login, verify_email } from "@/config/redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/config/store";
import AuthLayout from "@/layout/authLayout";
import { Alert, AlertIcon, Box, Button, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function WebHookPage() {
  const router = useRouter();
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [actionFailed, setActionFailed] = useState<AuthAction | null>(null);
  const [actionSuccess, setActionSuccess] = useState<AuthAction | null>(null);
  //   const failedAction = [AuthAction.VERIFY_EMAIL_FAILED];
  //   const successAction = [AuthAction.VERIFY_EMAIL_SUCCESS];

  useEffect(() => {
    if (router) {
      console.log(router.query);
      switch (router.query.action) {
        case "verify_email":
          setActionFailed(AuthAction.VERIFY_EMAIL_FAILED);
          setActionSuccess(AuthAction.VERIFY_EMAIL_SUCCESS);
          dispatch(verify_email(router.query));
          break;

        case "magic_link":
          setActionFailed(AuthAction.LOGIN_FAILED);
          setActionSuccess(AuthAction.LOGIN_SUCCESS);
          dispatch(login(router.query));
          break;

        default:
          break;
      }
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (authState.action === AuthAction.LOGIN_SUCCESS && authState.token) {
      Cookies.set("token", authState.token);
      window.location.href = "/";
    }
  }, [authState]);

  return (
    <AuthLayout title="" subtitle="">
      <Box w={"100%"} pb={8}>
        {authState.action &&
          authState.action != actionFailed &&
          authState.action != actionSuccess && <Spinner />}

        {authState.action && authState.action === actionFailed && (
          <Alert status="error" mt={5}>
            <AlertIcon />
            {authState.message}
          </Alert>
        )}

        {authState.action && authState.action === actionSuccess && (
          <Alert status="success" mt={5}>
            <AlertIcon />
            {authState.message}
          </Alert>
        )}

        {authState.action &&
          (authState.action === actionSuccess ||
            authState.action === actionFailed) && (
            <Button
              mt={5}
              colorScheme="teal"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Go to Z
            </Button>
          )}
      </Box>
    </AuthLayout>
  );
}

export default WebHookPage;
