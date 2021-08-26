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
  Badge, useClipboard, Spinner
} from "@chakra-ui/react";
import WakandaPass from "../components/Pass";
import WakandaToken from "../components/Token";
import Login from "./login";
import {useCurrentUserHook} from "../hooks/use-current-user.hook";
import {ColorModeSwitcher} from "../components/ColorModeSwitcher";
import {useFlowBalanceHook} from "../hooks/use-flow-balance.hook";
import {fmtFlow} from "../util/fmt-flow";
import {IDLE} from "../global/constants";

export function Root() {
  const [cu, loggedIn, {logOut}] = useCurrentUserHook()
  const {hasCopied, onCopy} = useClipboard(cu.addr)
  const flow = useFlowBalanceHook(cu.addr)

  if (loggedIn === false) {
    return <Login/>
  }

  return (
    <Stack>
      <Stack direction={"row"} align={"center"} pl={2} pr={2} pt={2}>
        <Text fontWeight={"bold"} fontSize={"md"}>Wakanda Pocket</Text>
        <Badge>测试网</Badge>
        <Spacer/>
        <ColorModeSwitcher/>
        <Button size={"sm"} onClick={logOut} colorScheme={"red"}>注销</Button>
      </Stack>
      <Stack direction={"row"} align={"center"} pl={2} pr={2}>
        <Button size={"xs"} onClick={onCopy} variant={"outline"}>
          {cu.addr}
        </Button>
        <Text fontSize={"xs"} fontWeight={"bold"} w={"auto"}>{hasCopied && ("copy!")} </Text>
        <Spacer/>
        {flow.status === IDLE ? (
          <Text fontSize={"xs"} fontWeight={"bold"} onClick={flow.refresh}>余额 {fmtFlow(flow.balance)} Flow</Text>
        ) : (
          <Spinner size={"sm"}/>
        )}
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
    <>Wakanda Pocket</>
  )
}

export default function WrappedRoot() {
  return (
    <Suspense fallback={<RootSkeleton/>}>
      <Root/>
    </Suspense>
  )
}