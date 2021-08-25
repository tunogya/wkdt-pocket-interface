import React, {Suspense} from "react";
import {Spacer, Stack, Text} from "@chakra-ui/react";
import {useWakandaPassDetail} from "../../../hooks/use-pass-detail.hook";
import {fmtWkdt} from "../../../util/fmt-wkdt";

export function WakandaPassItem({address, id}){
  const pass = useWakandaPassDetail(address, id)

  return(
    <Stack p={4} borderRadius={"8"} h={40} spacing={1}
           bgGradient={"linear(to-r, purple.200, blue.200, teal.200)"}>
      <Stack direction={"row"} align={"center"}>
        <Text fontSize={"xs"} fontWeight={"bold"}>WakandaPass#{pass.pass.id}</Text>
        <Spacer/>
        <Text fontSize={"xs"} fontWeight={"bold"}>{fmtWkdt(pass.pass.idleBalance, true)}</Text>
      </Stack>
      <Spacer/>
      <Text fontSize={"xs"}>{pass.pass.metadata.title}</Text>
      <Text fontSize={"xs"}>creator: {pass.pass.originalOwner}</Text>
    </Stack>
  )
}

export function WakandaPassItemSkeleton(){
  return(
    <></>
  )
}

export default function WrappedWakandaPassItem(props){
  return(
    <Suspense fallback={<WakandaPassItemSkeleton />}>
      <WakandaPassItem {...props}/>
    </Suspense>
  )
}