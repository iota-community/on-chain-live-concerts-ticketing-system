import { useState } from 'react'
import { OpenFormState, OperationType } from '../types';
import { useAccounts } from '@iota/dapp-kit';
import { Flex, Heading } from '@radix-ui/themes';
import Button from './Button';
import Form from './Form';

export const operations: OperationType[] = [
    {
        name: "Buy",
        description: "Buy Ticket",
    },
    {
        name: "BuyResale",
        description: "Buy Resale ticket",
    },
    {
        name: "Resale",
        description: "Resale Ticket",
    }
];

export default function Home() {
    const [openForm, setOpenForm] = useState<OpenFormState["openForm"]>("");
    const [address] = useAccounts();
    return (
        <Flex direction={"column"} m={"6"} align={"center"}>
            {address ? (
                <>
                    <Flex direction={"row"} align={"center"} wrap={"wrap"} gap={"4"}>
                        {operations.map(
                            (value, index) =>
                                <Button
                                    key={index}
                                    title={value.description}
                                    onClick={() => {
                                        setOpenForm(value.name);
                                    }}
                                    disabled={false}
                                />
                        )}
                    </Flex>
                </>
            ) : (
                <Flex justify={"center"} mt={"5"}>
                    <Heading align={"center"}>Please connect your wallet first</Heading>
                </Flex>
            )}
            {openForm !== "" && <Form openForm={openForm} />}
        </Flex>
    )
}
