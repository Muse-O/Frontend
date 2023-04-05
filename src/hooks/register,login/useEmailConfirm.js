import { useMutation } from "@tanstack/react-query";
import { apis } from "../../api/apis";

export function useEmailConfirm() {
  const { mutate, error } = useMutation({
    mutationFn: async payload => {
      const data = await apis.post("/user/emailconfirm", payload);
      return data;
    },
  });

  return {
    emailConfirm: mutate,
    error,
  };
}
