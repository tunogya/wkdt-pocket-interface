import {
  Button,
  Input,
  NumberInput,
  NumberInputField,
  Spacer,
  Spinner, Stack,
  Text
} from "@chakra-ui/react";
import {BeatLoader} from "react-spinners";
import React from "react";
import {useWkdtBalanceHook} from "../../../hooks/use-wkdt-balance.hook";
import {fmtWkdt} from "../../../util/fmt-wkdt";
import {IDLE} from "../../../global/constants";
import {parseUFix64} from "../../../global/common";
import {TransferTokenSuccess} from "./TransferTokenResult";

export function TransferTokenSend({address}) {
  const parse = (val) => val.replace(/^\$/, "")
  const [amount, setAmount] = React.useState(0)
  const [to, setTo] = React.useState("")
  const wkdt = useWkdtBalanceHook(address)
  const [state, setState] = React.useState(false)

  async function handleTransfer() {
    await wkdt.transfer(parseUFix64(Number(amount)).toString(), to)
    setState(true)
  }

  if (wkdt.tx !==null && wkdt.tx.statusCode === 0 && state === true) {
    return (
      <TransferTokenSuccess wkdt={wkdt} setState={setState}/>
    )
  }

  return (
    <Stack h={80}>
      <Stack direction={"row"}>
        <Text fontSize={"xs"} fontWeight={"bold"}>我的余额:</Text>
        <Spacer/>
        {wkdt.status === IDLE ? (
          <Text fontSize={"xs"} fontWeight={"bold"}> {fmtWkdt(wkdt.balance)}</Text>
        ) : (
          <Spinner size="xs"/>
        )}
        <Text fontSize={"xs"} fontWeight={"bold"}>WKDT</Text>
      </Stack>
      <NumberInput inputMode="decimal" min={0}
                   max={wkdt.balance}
                   errorBorderColor="red.200" mb={4}
                   onChange={(valueString) => setAmount(parse(valueString))}
                   value={amount}
      >
        <NumberInputField/>
      </NumberInput>
      <Text fontSize={"xs"} fontWeight={"bold"}>From</Text>
      <Input placeholder="My address" mb={4} disabled={true} value={address}/>
      <Text fontSize={"xs"} fontWeight={"bold"}>To</Text>
      <Stack mb={8} direction={"row"}>
        <Input placeholder="接收地址"
               value={to} onChange={(event) => setTo(event.target.value)}/>
        <Button
          isLoading={wkdt.status !== IDLE}
          spinner={<BeatLoader size={8} color="white"/>}
          onClick={handleTransfer}
        >转账</Button>
      </Stack>
      <Spacer/>
      <Text fontSize="xs" textColor={"gray.500"}>You may not be able to send transactions to exchanges
        that do not support smart contract transactions. Please confirm that the Flow FT address is correct.</Text>
    </Stack>
  )
}

export default function WrappedTransferTokenSend(props) {
  return (
    <TransferTokenSend {...props}/>
  )
}