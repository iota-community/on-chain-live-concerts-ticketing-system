import { IotaClient } from "@iota/iota-sdk/client";
import { Transaction } from "@iota/iota-sdk/transactions";
import { FormProps } from "../types";

export const buyTicket = (
    formData: FormProps,
    setFormData: React.Dispatch<React.SetStateAction<FormProps>>,
    packageId: any,
    creatorObject: any,
    categoryObject: any,
    totalTicketObject: any,
    soldTicketObject: any,
    signAndExecuteTransaction: any,
    client: IotaClient,
    setLoading: any,
) => {
    const tx = () => {
        const tx = new Transaction();
        tx.setGasBudget(50000000);
        if (formData.category) {
            tx.moveCall({
                target: `${packageId}::live_concert::buy_ticket`,
                arguments: [
                    tx.object(formData.coin as string),
                    tx.object(creatorObject),
                    tx.pure.vector("u8", formData.category.split('').map(char => char.charCodeAt(0))),
                    tx.object(categoryObject as string),
                    tx.object(totalTicketObject as string),
                    tx.object(soldTicketObject as string),
                ],
            });
        }
        return tx;
    };
    signAndExecuteTransaction(
        {
            transaction: tx(),
        },
        {
            onSuccess: ({ digest }: { digest: any }) => {
                client
                    .waitForTransaction({ digest, options: { showEffects: true } })
                    .then(() => {
                        setFormData({
                            coin: "",
                            creatorObject: "",
                            category: "SILVER_TICKET",
                            categoryObject: "",
                            totalTicketObject: "",
                            soldTicketObject: "",
                            updatedPrice: "",
                            nft: "",
                            resalePrice: "",
                            initiatedResaleId: "",
                        });
                        alert("Transaction successfull!");
                        setLoading(false);
                    });
            },
            onError: (error: any) => {
                console.error("Failed to execute transaction", tx, error);
                setLoading(false);
                alert(`Error Occured: ${error.message}`);
            },
        },
    );
};