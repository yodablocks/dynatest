import { useMutation } from "@tanstack/react-query";
import { LoginMethod } from "../../components/ConnectWalletButton/utils";

export type AddUserParams = {
  privy_id: string;
  address: string;
  login_type: LoginMethod;
  login_id: string;
  total_value: number;
};

export const useAddUser = () => {
  return useMutation({
    mutationFn: async (params: AddUserParams) => {
      // Skip the GET check since it's causing Method Not Allowed
      // Go directly to creating the user
      const createResponse = await fetch(`${process.env.NEXT_PUBLIC_CHATBOT_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (!createResponse.ok) {
        const createData = await createResponse.json();
        throw new Error(createData.detail || 'Failed to create user');
      }

      return params.address;
    },
  });
};