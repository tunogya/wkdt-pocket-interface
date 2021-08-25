import {Button, Spacer, Stack, Text} from "@chakra-ui/react";
import {fmtWkdt} from "../../../util/fmt-wkdt";
import React from "react";

export function TransferTokenSuccess({wkdt, setState}){
  return(
    <Stack h={80}>
      <Text fontSize={"sm"} fontWeight={"bold"}>交易成功!</Text>
      <Text fontSize={"xs"}>支付者: {wkdt.tx.events[0].data.from}</Text>
      <Text fontSize={"xs"}>接收者: {wkdt.tx.events[1].data.to}</Text>
      <Text fontSize={"xs"}>数量: {fmtWkdt(wkdt.tx.events[1].data.amount, true)}</Text>
      <Text fontSize={"xs"}>交易哈希: {wkdt.tx.events[1].transactionId}</Text>
      <Text fontSize={"xs"}>手续费: {wkdt.tx.events[2].data.amount} Flow</Text>
      <Text fontSize={"xs"}>手续费支付者: {wkdt.tx.events[2].data.from}</Text>
      <Text fontSize={"xs"}>验证者: {wkdt.tx.events[3].data.to}</Text>
      <Spacer/>
      <Button onClick={() => setState(false)}>继续转账</Button>
    </Stack>
  )
}