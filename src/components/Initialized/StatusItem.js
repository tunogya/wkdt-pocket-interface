import {Button, Heading, IconButton, Spacer, Stack, Text} from "@chakra-ui/react";
import {IDLE, PROCESSING} from "../../global/constants";
import {BeatLoader} from "react-spinners";
import {CheckCircleIcon} from "@chakra-ui/icons";
import React from "react";

export function StatusItem({name, init}) {
  return(
    <Stack align={"center"} h={8} spacing={8}>
      <Heading fontSize={"md"}>{name}</Heading>
      <Text fontSize={"sm"} color={"gray"}>"您需要同意 {name} 智能合约，才可以正常接收 {name}。所有用户的账户信息均匿名
        存储在区块链网络中，Wakanda Labs 不会收集您的任何信息"——《用户使用及隐私协议》</Text>
      <Spacer/>
      {(init.status === PROCESSING) && (
        <BeatLoader size={6}/>
      )}
      {(init.status === IDLE) && init.isInitialized && (
        <Stack w={"100%"}>
          <IconButton aria-label={"sure"} icon={ <CheckCircleIcon/>} disabled/>
        </Stack>

      )}
      {(init.status === IDLE) && !init.isInitialized && (
        <Stack w={"100%"}>
          <Button colorScheme={"blue"} onClick={init.initialize}>Init</Button>
        </Stack>
      )}
    </Stack>
  )
}

export default function WrappedStatusItem(props) {
  return(
    <StatusItem {...props}/>
  )
}