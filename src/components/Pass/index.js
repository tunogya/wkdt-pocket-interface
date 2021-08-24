import React, {Suspense} from "react";
import {Stack, Text} from "@chakra-ui/react";
import {useCurrentUserHook} from "../../hooks/use-current-user.hook";
import {useInitPassHook} from "../../hooks/use-init-pass.hook";
import WakandaPassInit from "./components/initialized";

export function WakandaPass(){
  const [cu, loggedIn] = useCurrentUserHook()
  const init = useInitPassHook(cu.addr)

  if (init.isInitialized === false){
    return <WakandaPassInit />
  }

  return (
    <Stack>
      <Text>你还没有 WakandaPass</Text>
    </Stack>
  )
}

export function WakandaPassSkeleton(){
  return (
    <></>
  )
}

export default function WrappedWakandaPass(){
  return (
    <Suspense fallback={<WakandaPassSkeleton />}>
      <WakandaPass />
    </Suspense>
  )
}