import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay, Stack, Tab,
  TabList, TabPanel, TabPanels,
  Tabs, useDisclosure
} from "@chakra-ui/react";
import TransferTokenReceive from "./TransferTokenReceive";
import TransferTokenSend from "./TransferTokenSend";
import {useCurrentUserHook} from "../../../hooks/use-current-user.hook";

export function TransferToken() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [tabIndex, setTabIndex] = React.useState(0)
  const [cu] = useCurrentUserHook()

  function handleTransfer(index) {
    onOpen()
    setTabIndex(index)
  }

  return (
    <Stack direction={"row"} w={"100%"}>
      <Button onClick={() => handleTransfer(0)} fontWeight={"bold"} w={"50%"}>转账</Button>
      <Button onClick={() => handleTransfer(1)} fontWeight={"bold"} w={"50%"}>接收</Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>WKDT 交易</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Tabs isFitted variant="soft-rounded" defaultIndex={tabIndex}>
              <TabList mb="1em">
                <Tab>转账</Tab>
                <Tab>接收</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <TransferTokenSend address={cu.addr}/>
                </TabPanel>
                <TabPanel>
                  <TransferTokenReceive address={cu.addr}/>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  )
}

export default function WrappedTransferToken(props) {
  return (
    <TransferToken {...props}/>
  )
}