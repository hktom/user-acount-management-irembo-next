import MainLayout from "@/layout/mainLayout";
import { Heading, Button, Box, Text } from "@chakra-ui/react";

function HomePage() {
  return (
    <MainLayout>
      <Box maxW="80%" mx={"auto"} pt={10} pb={10}>
        <Heading mb={4}>Modern online and offline payments for Africa</Heading>
        <Text fontSize="xl" mt={7}>
          {
            " we're committed to bringing you the most advanced and convenient payment solutions tailored for the African continent. We understand that Africa is a diverse and dynamic landscape with unique challenges, and we're here to address them head-on."
          }
        </Text>
        <Text fontSize="xl" mt={5}>
          {
            " Our online payment platform is designed to seamlessly integrate with your e-commerce, mobile apps, and websites, allowing you to accept payments from customers across Africa and the globe. We offer a wide range of payment methods, from credit cards to mobile wallets, making it easier for your customers to transact securely."
          }
        </Text>
        <Text fontSize="xl" mt={5}>
          {
            " We believe in the power of local businesses and entrepreneurs. Our offline payment solutions are specifically crafted to support businesses of all sizes, from bustling market stalls to established brick-and-mortar stores. Whether it's a QR code-based system or mobile POS, we've got you covered."
          }
        </Text>
      </Box>
    </MainLayout>
  );
}

export default HomePage;
