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
import { Status } from "@/config/helpers/enum";

function AllUsersPage() {
  const stateHome = useAppSelector((state: any) => state.home);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(get_users());
  }, [dispatch]);

  return (
    <MainLayout>
      <Box w={"100%"}>
        <Heading mb={20}>
          <IconButton
            icon={<ChevronLeftIcon />}
            aria-label="Search database"
            as={NextLink}
            href="/user/"
          />{" "}
          All Users
        </Heading>

        {stateHome.users?.map((user: any, index: number) => (
          <Flex
            key={user.id}
            as={NextLink}
            href={`/upgrade?id=${user.id}`}
            mb={10}
            borderBottom={"2px solid #F6F6F6"}
            pb={5}
          >
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
                colorScheme={user.status === Status.VERIFIED ? "green" : "red"}
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
