import {Heading, Spacer, Stack} from "@chakra-ui/react";
import {BeatLoader} from "react-spinners";
import {useCurrentUserHook} from "../../../hooks/use-current-user.hook";
import React, {Suspense} from "react";
import {StatusItem} from "../../Initialized/StatusItem";
import {useInitPassHook} from "../../../hooks/use-init-pass.hook";
import {useWakandaPassIds} from "../../../hooks/use-pass-ids.hook";

export function WakandaPassStatus() {
  const [cu] = useCurrentUserHook()
  const init = useInitPassHook(cu.addr)
  const ids = useWakandaPassIds(cu.addr)

  return (
    <StatusItem name={"WakandaPass"} init={init} check={ids}/>
  )
}

export function WakandaPassStatusSkeleton() {
  return(
    <Stack direction={"row"} align={"center"} h={8}>
      <Heading fontSize={"md"}>WakandaPass</Heading>
      <Spacer/>
      <BeatLoader size={6}/>
    </Stack>
  )
}

export default function WrappedWakandaPassStatus() {
  return(
    <Suspense fallback={<WakandaPassStatusSkeleton/>}>
      <WakandaPassStatus/>
    </Suspense>
  )
}

