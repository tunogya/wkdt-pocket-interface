import React, {Suspense} from "react";
import {Stack} from "@chakra-ui/react";
import {useCurrentUserHook} from "../../hooks/use-current-user.hook";
import {useInitPassHook} from "../../hooks/use-init-pass.hook";
import WakandaPassInit from "./components/initialized";
import {useWakandaPassIds} from "../../hooks/use-pass-ids.hook";
import WakandaPassItem from "./components/WakandaPassItem";

export function WakandaPass(){
  const [cu, loggedIn] = useCurrentUserHook()
  const init = useInitPassHook(cu.addr)
  const ids = useWakandaPassIds(cu.addr)

  if (init.isInitialized === false){
    return <WakandaPassInit />
  }

  return (
    <Stack spacing={6}>
      {ids.ids.map(id => (
        <WakandaPassItem address={cu.addr} id={id} key={id}/>
      ))}
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