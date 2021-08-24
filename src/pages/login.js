import React, {Suspense} from 'react';
import {Badge, Button, Spacer, Stack, Text} from "@chakra-ui/react";
import {useCurrentUserHook} from "../hooks/use-current-user.hook";
import Root from "./root";
import {Logo} from "../components/logo";

export function Login() {
  const [user, loggedIn, {logIn}] = useCurrentUserHook()

  if (loggedIn === true) {
    return <Root/>
  }

  return (
    <Stack height={"100vh"} p={4} spacing={6} align={"center"}>
      <Spacer/>
      <Logo bg={"white"} p={2} borderRadius={"md"} w={"200px"}/>
      <Stack direction={"row"} align={"center"}>
        <Text fontWeight={"bold"} fontSize={"2xl"}>WKDT Pocket</Text>
        <Stack><Badge>测试网</Badge></Stack>
      </Stack>
      <Spacer/>
      <Button colorScheme={"blue"} onClick={logIn} w={"100%"}>
        登陆
      </Button>
      <Spacer/>
      <Text fontSize={"xs"}>© Wakanda Labs 2021</Text>
    </Stack>
  );
}

export function LoginSkeleton() {
  return (
    <></>
  )
}

export default function WrappedLoggin() {
  return (
    <Suspense fallback={<LoginSkeleton/>}>
      <Login/>
    </Suspense>
  )
}