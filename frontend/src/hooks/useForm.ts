import { useState } from "react";
import { FormProps } from "../types";

export const useForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isError,setIsError] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormProps>({
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
    })

    const updateFormData = (field: keyof FormProps, value: string) => {
        setIsError(false)
        setFormData((prevState => ({
            ...prevState,
            [field]: value
        })))
    }

    return {
        loading,
        setLoading,
        formData,
        setFormData,
        updateFormData,
        isError,
        setIsError
    }
}