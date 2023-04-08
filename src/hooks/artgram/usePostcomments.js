import { useMutation } from "@tanstack/react-query";
import { cookies } from "../../shared/cookies";
import { apis } from "../../api/apis";

export const usePostcomments = (setFormState) => {
  const {mutate:postCommet} = useMutation({
    mutationFn : async ({artgramId, formState}) => {
      const token = cookies.get("access_token");
      console.log(token);
      console.log(`${artgramId}, ${formState}`);
      const response = await apis.post(`/artgram/${artgramId}/comments`, {comment:formState}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response;
    }
  })
  const commentHandle = (e, artgramId, formState) => {
    e.preventDefault()
    postCommet({artgramId, formState})
    setFormState({})
  }

  return [commentHandle]
}