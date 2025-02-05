import { IotaClient } from "@iota/iota-sdk/client";
import { FormProps, OpenFormState } from "../types";
import { buyResaleTicket } from "./buyResaleTicket";
import { buyTicket } from "./buyTicket";
import { changePrice } from "./changePrice";
import { resale } from "./resale";

export default (
    e: any,
    openForm: OpenFormState["openForm"],
    formData: FormProps,
    setFormData: React.Dispatch<React.SetStateAction<FormProps>>,
    packageId: any,
    creatorObjectId: any,
    categoryObjectId: any,
    totalTicketObjectId: any,
    soldTicketObjectId: any,
    signAndExecuteTransaction: any,
    client: IotaClient,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setIsError: React.Dispatch<React.SetStateAction<boolean>>
) => {
    e.preventDefault();
    const validateInputs = () => {
        switch (openForm) {
            case "Buy":
                return formData.coin === "" ? false : true;
            case "BuyResale":
                return formData.coin === "" || formData.initiatedResaleId === "" ? false : true;
            case "ChangePrice":
                return formData.updatedPrice === "" ? false : true;
            case "Resale":
                return formData.resalePrice === "" || formData.nft === "" ? false : true;
        }
    }
    if (validateInputs()) {
        setLoading(true)
        switch (openForm) {
            case "Buy":
                buyTicket(
                    formData,
                    setFormData,
                    packageId,
                    creatorObjectId,
                    categoryObjectId,
                    totalTicketObjectId,
                    soldTicketObjectId,
                    signAndExecuteTransaction,
                    client,
                    setLoading);
                break;
            case "BuyResale":
                buyResaleTicket(
                    formData,
                    setFormData,
                    packageId,
                    signAndExecuteTransaction,
                    client,
                    setLoading
                );
                break;
            case "ChangePrice":
                changePrice(
                    formData,
                    setFormData,
                    packageId,
                    creatorObjectId,
                    categoryObjectId,
                    signAndExecuteTransaction,
                    client,
                    setLoading
                );
                break;
            case "Resale":
                resale(
                    formData,
                    setFormData,
                    packageId,
                    signAndExecuteTransaction,
                    client,
                    setLoading
                );
                break;
        }
    }
    else setIsError(true)
}