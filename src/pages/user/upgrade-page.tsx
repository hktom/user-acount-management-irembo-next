import { HOST_URL } from "@/config/apollo/config";
import { HomeAction, DOCUMENT_NAME } from "@/config/helpers/enum";
import {
  home_reset_actions,
  update_document,
  update_profile,
  upload_image,
} from "@/config/redux/home/homeSlice";
import { useAppDispatch, useAppSelector } from "@/config/store";
import MainLayout from "@/layout/mainLayout";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Progress,
  Select,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import NextLink from "next/link";

type Inputs = {
  code: string;
};

function UpgradePage() {
  const stateHome = useAppSelector((state: any) => state.home);
  const dispatch = useAppDispatch();
  const [documentType, setDocumentType] = useState<string | null>(
    DOCUMENT_NAME.PASSPORT
  );

  useEffect(() => {
    dispatch(home_reset_actions());
  }, [dispatch]);

  const displayImage = () => {
    let image =
      HomeAction.UPLOAD_IMAGE_SUCCESS == stateHome.action
        ? stateHome.image_link
        : stateHome.user?.document?.photo;
    return (
      <Box mb={10}>
        <Box border={"2px solid #E7E7E7"} w={"450px"} h={"450px"}>
          <Image
            src={HOST_URL + "/storage/" + image}
            alt="Dan Abramov"
            fallbackSrc="/missing_product.jpeg"
            objectFit="cover"
            objectPosition="center"
            w={"100%"}
            h={"100%"}
          />
        </Box>
      </Box>
    );
  };

  return (
    <MainLayout>
      <Box w={"100%"}>
        <Heading mb={5}>
          <IconButton
            icon={<ChevronLeftIcon />}
            aria-label="Search database"
            as={NextLink}
            href="/user/"
          />{" "}
          Update Profile Image
        </Heading>

        {HomeAction.POST_DOCUMENT_FAILED == stateHome.action && (
          <Alert status="error">
            <AlertIcon />
            {stateHome.message}
          </Alert>
        )}

        {HomeAction.POST_DOCUMENT_SUCCESS == stateHome.action && (
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
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {displayImage()}
          <FormControl my={3}>
            <FormLabel>Choose new image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              required
              onChange={(e) => {
                if (e && e.target?.files) {
                  dispatch(upload_image(e.target.files[0]));
                }
              }}
            />
          </FormControl>

          {HomeAction.UPLOAD_IMAGE_FAILED == stateHome.action && (
            <Alert status="error">
              <AlertIcon />
              {stateHome.message}
            </Alert>
          )}

          <Box my={3}>
            <FormLabel>Document name</FormLabel>
            <Select
              placeholder=""
              onChange={(e) => setDocumentType(e.target.value)}
              defaultValue={stateHome.user?.document?.name}
            >
              <option value={DOCUMENT_NAME.PASSPORT}>
                {DOCUMENT_NAME.PASSPORT}
              </option>
              <option value={DOCUMENT_NAME.NATIONAL_ID}>
                {DOCUMENT_NAME.NATIONAL_ID}
              </option>
            </Select>
          </Box>

          <Button
            colorScheme="teal"
            size="md"
            type="submit"
            mt={5}
            isLoading={HomeAction.POST_DOCUMENT == stateHome.action}
          >
            Update
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default UpgradePage;
