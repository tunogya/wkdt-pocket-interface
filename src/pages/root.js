import React, {Suspense} from "react";
import {
  Spacer,
  Stack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Divider, Badge
} from "@chakra-ui/react";
import WakandaPass from "../components/Pass";
import WakandaToken from "../components/Token";
import Login from "./login";
import {useCurrentUserHook} from "../hooks/use-current-user.hook";

export function Root() {
  const [cu, loggedIn, {logOut}] = useCurrentUserHook()

  if (loggedIn === false) {
    return <Login/>
  }

  return (
    <Stack>
      <Stack direction={"row"} align={"center"} p={2}>
       <Text fontWeight={"bold"} fontSize={"md"}>Wakanda Pocket</Text>
        <Badge>测试网</Badge>
        <Spacer/>
        <Button size={"sm"} onClick={logOut} colorScheme={"red"}>注销</Button>
      </Stack>
      <Divider/>
      <Tabs colorScheme={"blue"}>
        <TabList>
          <Tab fontWeight={"bold"}>代币</Tab>
          <Tab fontWeight={"bold"}>收藏品</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <WakandaToken/>
          </TabPanel>
          <TabPanel>
            <WakandaPass/>
          </TabPanel>
        </TabPanels>
      </Tabs>

    </Stack>

  )
}

export function RootSkeleton() {
  return (
    <>Skeleton</>
  )
}

export default function WrappedRoot() {
  return (
    <Suspense fallback={<RootSkeleton/>}>
      <Root/>
    </Suspense>
  )
}