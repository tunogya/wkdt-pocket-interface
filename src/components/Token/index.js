import React, {Suspense} from "react";
import {Box, Button, Center, Spacer, Spinner, Stack, Text, useClipboard} from "@chakra-ui/react";
import {useWkdtBalanceHook} from "../../hooks/use-wkdt-balance.hook";
import {useCurrentUserHook} from "../../hooks/use-current-user.hook";
import {fmtWkdt} from "../../util/fmt-wkdt";
import {PROCESSING} from "../../global/constants";
import {TransferToken} from "./components/TransferToken";
import {useInitWkdtHook} from "../../hooks/use-init-wkdt.hook";
import WakandaTokenInit from "./components/Initialized";

export function WakandaToken() {
  const [cu, loggedIn] = useCurrentUserHook()
  const wkdt = useWkdtBalanceHook(cu.addr)
  const {hasCopied, onCopy} = useClipboard(cu.addr)
  const init = useInitWkdtHook(cu.addr)

  if (init.isInitialized === false){
    return <WakandaTokenInit />
  }

  return (
    <Stack spacing={4}>
      <Stack height={40} borderRadius={8} border={"1px"} p={4}>
        <Stack direction={"row"}>
          <Text fontWeight={"bold"} fontSize={"xs"}>Wakanda Token</Text>
          <Spacer/>
          {wkdt.status === PROCESSING ? (
            <Spinner size={"xs"}/>
          ) : (
            <Text fontWeight={"bold"} fontSize={"xs"}>{fmtWkdt(wkdt.balance, true)}</Text>
          )}
        </Stack>
        <Spacer/>
        <Stack direction={"row"}>
          <Text fontSize={"xs"} onClick={onCopy}>{cu.addr}</Text>
          <Text fontSize={"xs"} color={"cyan"}>{hasCopied && ("copy!")}</Text>
        </Stack>
      </Stack>
      <Stack>
        <Text fontSize={"sm"} fontWeight={"bold"}>交易记录</Text>
      </Stack>
      <Stack direction={"row"} position={"fixed"} left={0} bottom={0} w={"100%"} p={4}>
     <TransferToken />
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