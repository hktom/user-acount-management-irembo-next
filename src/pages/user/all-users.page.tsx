import { HOST_URL } from "@/config/apollo/config";
import { get_users } from "@/config/redux/home/homeSlice";
import { useAppDispatch, useAppSelector } from "@/config/store";
import MainLayout from "@/layout/mainLayout";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Heading,
  IconButton,
  Badge,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NextLink from "next/link";

function AllUsersPage() {
  const stateHome = useAppSelector((state: any) => state.home);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(get_users());
  }, [dispatch]);

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
          All Users
        </Heading>

        {stateHome.users?.map((user: any, index: number) => (
          <Flex key={user.id} as={NextLink} href={`/upgrade?id=${user.id}`}>
            <Avatar
              src={HOST_URL + "/storage/" + user.photo}
              name={user?.first_name + " " + user?.last_name}
            />
            <Box ml="3">
              <Text fontWeight="bold">
                {user?.first_name + " " + user?.last_name}
              </Text>

              <Badge
                ml="1"
                colorScheme={user.email_verified_at ? "green" : "red"}
              >
                {user.status}
              </Badge>
            </Box>
          </Flex>
        ))}
      </Box>
    </MainLayout>
  );
}

export default AllUsersPage;
