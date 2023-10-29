import { Box, Heading, Text } from "@chakra-ui/react";

interface IAuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

function AuthLayout(props: IAuthLayoutProps) {
  return (
    <Box w="100%" backgroundColor="#F6F6F6" p={4} minHeight={"100vh"}>
      <Box
        maxW={"40rem"}
        mx={"auto"}
        mt={10}
        backgroundColor={"#fff"}
        borderRadius={4}
        px={20}
        py={8}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        boxShadow={"md"}
      >
        <Heading mb={3} color="#843ADC">{props.title}</Heading>
        <Text fontSize={"xl"}>{props.subtitle}</Text>
        {props.children}
      </Box>
    </Box>
  );
}

export default AuthLayout;
