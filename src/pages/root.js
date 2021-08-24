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
  Badge, useClipboard
} from "@chakra-ui/react";
import WakandaPass from "../components/Pass";
import WakandaToken from "../components/Token";
import Login from "./login";
import {useCurrentUserHook} from "../hooks/use-current-user.hook";

export function Root() {
  const [cu, loggedIn, {logOut}] = useCurrentUserHook()
  const {hasCopied, onCopy} = useClipboard(cu.addr)

  if (loggedIn === false) {
    return <Login/>
  }

  return (
    <Stack>
      <Stack direction={"row"} align={"center"} pl={2} pr={2} pt={2}>
        <Text fontWeight={"bold"} fontSize={"md"}>Wakanda Pocket</Text>
        <Badge>测试网</Badge>
        <Spacer/>
        <Button size={"sm"} onClick={logOut} colorScheme={"red"}>注销</Button>
      </Stack>
      <Stack direction={"row"} pl={2} pb={2} onClick={onCopy}>
        <Text fontSize={"xs"}  fontWeight={"bold"}>我的账户: {cu.addr}</Text>
        <Text fontSize={"xs"} color={"cyan"} fontWeight={"bold"}>{hasCopied && ("copy!")}</Text>
      </Stack>
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