import { useAppSelector } from "@/config/store";
import MainLayout from "@/layout/mainLayout";
import { Alert, AlertIcon, Box, Heading } from "@chakra-ui/react";

function Profile() {
  const stateHome = useAppSelector((state) => state.home);
  return (
    <MainLayout>
      <Box w={"100%"}>
        <Heading mb={5}>Profile</Heading>

        {!stateHome.user?.email_verified_at && (
          <Alert status="error">
            <AlertIcon />
            Your email is not verified. Please check your email.
          </Alert>
        )}

        {!stateHome.user?.photo && (
          <Alert status="error">
            <AlertIcon />
            Please upload your photo.
          </Alert>
        )}

        {!stateHome.user?.document && (
          <Alert status="error">
            <AlertIcon />
            Please upload your document. (ID card, Passport, etc.) Otherwise, we
            will not be able to verify your identity.
          </Alert>
        )}
      </Box>
    </MainLayout>
  );
}

export default Profile;
