import React, {Suspense} from "react";
import {Center, Progress, Spacer, Spinner, Stack, Text} from "@chakra-ui/react";
import {useCurrentUserHook} from "../../hooks/use-current-user.hook";
import {useInitPassHook} from "../../hooks/use-init-pass.hook";
import WakandaPassInit from "./components/Initialized";
import {useWakandaPassIds} from "../../hooks/use-pass-ids.hook";
import WakandaPassItem from "./components/WakandaPassItem";
import {useFlowStorageHook} from "../../hooks/use-flow-storage.hook";
import {fmtBytes} from "../../util/fmt-bytes";
import {IDLE, PROCESSING} from "../../global/constants";

export function WakandaPass(){
  const [cu, loggedIn] = useCurrentUserHook()
  const init = useInitPassHook(cu.addr)
  const ids = useWakandaPassIds(cu.addr)
  const storage = useFlowStorageHook(cu.addr)

  if (init.isInitialized === false){
    return <WakandaPassInit />
  }

  return (
    <Stack spacing={6}>
      <Stack>
        <Stack direction={"row"}>
          <Text fontSize={"xs"} fontWeight={"bold"}>我的存储容量</Text>
          <Spacer/>
          {storage.status === IDLE ? (
            <Text fontSize={"xs"} onClick={storage.refresh} fontWeight={"bold"}>已使用 {fmtBytes(storage.storage.storageUsed)}/{fmtBytes(storage.storage.storageCapacity)}</Text>
          ) : (
            <Spinner size={"xs"}/>
          )}
        </Stack>
        <Progress size="xs" value={storage.storage.storageUsed / storage.storage.storageCapacity } isIndeterminate={storage.status === PROCESSING}/>
      </Stack>
      {ids.ids.map(id => (
        <WakandaPassItem address={cu.addr} id={id} key={id}/>
      ))}
      {ids.ids.length === 0 && (
        <Text fontSize={"sm"} color={"gray"}>你还没有 WakandaPass，购买 Wakanda 实体商品将有机会获得 WakandaPass。</Text>
      )}
      <Spacer/>
      <Text fontSize={"xs"}>更多信息请访问：https://world-testnet.wakanda.cn。</Text>
    </Stack>
  )
}

export function WakandaPassSkeleton(){
  return (
    <Stack>
      <Center>
        <Spinner size={"sm"}/>
        <Text fontSize={"sm"} fontWeight={"bold"}>正在检查用户状态</Text>
      </Center>
    </Stack>
  )
}

export default function WrappedWakandaPass(){
  return (
    <Suspense fallback={<WakandaPassSkeleton />}>
      <WakandaPass />
    </Suspense>
  )
}