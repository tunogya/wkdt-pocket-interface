import React, {Suspense} from "react";
import {Stack, Text} from "@chakra-ui/react";

export function WakandaPass(){
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