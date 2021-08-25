import React, {Suspense} from "react";
import {Center, Spacer, Spinner, Stack, Text} from "@chakra-ui/react";
import {useWkdtBalanceHook} from "../../hooks/use-wkdt-balance.hook";
import {useCurrentUserHook} from "../../hooks/use-current-user.hook";
import {fmtWkdt} from "../../util/fmt-wkdt";
import {PROCESSING} from "../../global/constants";
import {TransferToken} from "./components/TransferToken";
import {useInitWkdtHook} from "../../hooks/use-init-wkdt.hook";
import WakandaTokenInit from "./components/Initialized";
import {LogoWhite} from "../logo";

export function WakandaToken() {
  const [cu, loggedIn] = useCurrentUserHook()
  const wkdt = useWkdtBalanceHook(cu.addr)
  const init = useInitWkdtHook(cu.addr)

  if (init.isInitialized === false || wkdt.balance === null) {
    return <WakandaTokenInit/>
  }

  return (
    <Stack spacing={4}>
      <Stack height={48} borderRadius={8} p={4} color={"white"} spacing={1}
             bgGradient="linear(to-r,teal.200,yellow.200, pink.200)">
        <Stack direction={"row"}>
          <LogoWhite h={5}/>
          <Spacer/>
          {wkdt.status === PROCESSING ? (
            <Spinner size={"sm"}/>
          ) : (
            <Text fontWeight={"bold"} fontSize={"sm"}
                  onClick={wkdt.refresh}>{fmtWkdt(wkdt.balance, true)}</Text>
          )}
        </Stack>
        <Spacer/>
        <Text fontSize={"xs"}>WakandaToken</Text>
        <Text fontSize={"xs"}>{cu.addr}</Text>

      </Stack>
      <Stack>
        <Text fontSize={"sm"} fontWeight={"bold"}>交易记录</Text>
      </Stack>
      <Stack direction={"row"} position={"fixed"} left={0} bottom={0} w={"100%"} p={4}>
        <TransferToken/>
      </Stack>
    </Stack>
  )
}

export function WakandaTokenSkeleton() {
  return (
    <Stack>
      <Center>
        <Spinner size={"sm"}/>
        <Text fontSize={"sm"} fontWeight={"bold"}>正在检查用户状态</Text>
      </Center>
    </Stack>
  )
}

export default function WrappedWakandaToken() {
  return (
    <Suspense fallback={<WakandaTokenSkeleton/>}>
      <WakandaToken/>
    </Suspense>
  )
}