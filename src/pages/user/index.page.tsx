import { HOST_URL } from "@/config/apollo/config";
import { useAppSelector } from "@/config/store";
import MainLayout from "@/layout/mainLayout";
import { EmailIcon, ArrowForwardIcon, UnlockIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NextLink from "next/link";

function Profile() {
  const stateHome = useAppSelector((state:any) => state.home);
  const [personalInfo, setPersonalInfo] = useState<any[]>([]);
  const [documentInfo, setDocumentInfo] = useState<any[]>([]);

  useEffect(() => {
    let data = [];
    let data_document = [];
    if (stateHome.user) {

      data.push({ label: "Name", value: stateHome.user?.first_name + " " + stateHome.user?.last_name});
      data.push({ label: "Email", value: stateHome.user?.email });
      data.push({label: "Date of birth", value: stateHome.user?.date_of_birth || "-"});
      data.push({ label: "Gender", value: stateHome.user?.gender || "-" });
      data.push({label: "Marital Status", value: stateHome.user?.marital_status || "-"});
      data.push({label: "Country", value: stateHome.user?.nationality?.name || "-"});

      data_document.push({ label: "Document", value: stateHome.user?.document?.name || "-" });
      data_document.push({ label: "Document Code", value: stateHome.user?.document?.code || "-" });

      setPersonalInfo(data);
      setDocumentInfo(data_document);
    }
  }, [stateHome.user]);

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

        <Box
          display={"flex"}
          alignItems={"center"}
          mt={10}
          flexDirection={"column"}
          w={"100%"}
        >
          <Avatar
            size="2xl"
            name={stateHome.user?.first_name + " " + stateHome.user?.last_name}
            src={HOST_URL + "/" + stateHome.user?.photo}
            mb={20}
          />

          <Card w={"100%"} border={"none"} boxShadow={"none"}>
            <CardHeader>
              <Heading size="md">Personal informations</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                {personalInfo.map((item, index) => (
                  <Box key={index}>
                    <Heading size="xs" textTransform="uppercase">
                      {item.label}
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {item.value}
                    </Text>
                  </Box>
                ))}
              </Stack>
            </CardBody>
          
            <CardHeader>
              <Heading size="md">Document informations</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                {documentInfo.map((item, index) => (
                    <Box key={index}>
                      <Heading size="xs" textTransform="uppercase">
                        {item.label}
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {item.value}
                      </Text>
                    </Box>
                  ))}
              </Stack>
            </CardBody>
          </Card>

          <Stack direction='row' spacing={4}>
            <Button leftIcon={<EmailIcon />} colorScheme='teal' variant='solid' as={NextLink} href="/user/update">
              Edit profile
            </Button>
            <Button leftIcon={<CopyIcon />} colorScheme='teal' variant='solid' as={NextLink} href="/user/upload">
              Edit Profile Picture
            </Button>
            <Button leftIcon={<UnlockIcon />} colorScheme='teal' variant='solid' as={NextLink} href="/user/document">
              Upload document
            </Button>
            <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline' as={NextLink} href="/user/password">
              Change password
            </Button>
          </Stack>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default Profile;
