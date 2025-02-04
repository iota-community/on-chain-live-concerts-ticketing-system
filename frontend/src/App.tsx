import { ConnectButton, useAccounts } from "@iota/dapp-kit";
import { Box, Flex, Heading } from "@radix-ui/themes";
import Home from "./components/Home";
import { Button as RadixButton } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useNetworkVariable } from "./networkConfig";

function App() {
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const creatorObject = useNetworkVariable("creatorObjectId" as never);
  const [address] = useAccounts();
  useEffect(() => {
    const body = {
      jsonrpc: "2.0",
      id: 1,
      method: "iota_getObject",
      params: [creatorObject, { showContent: true }],
    };
    fetch("https://indexer.devnet.iota.cafe/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setIsCreator(address.address == res.result.data.content.fields.address);
      });
  }, [address]);
  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        align={"center"}
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>Live Concert Ticketing System</Heading>
        </Box>

        <Flex direction="row" align="center">
          {address && isCreator && <RadixButton
            mr={"5"}
            radius="none"
            style={{ background: "#0101ff" }}
          >
            Change Price
          </RadixButton>}
          <ConnectButton />
        </Flex>
      </Flex >
      <Box>
        <Home />
      </Box>
    </>
  );
}

export default App;
