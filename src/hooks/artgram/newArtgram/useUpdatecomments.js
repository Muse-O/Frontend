import { useState } from "react"

export const useUpdatecomments = () => {
  const [edit,setEdit] = useState(false)
  const editHandler = () => {
    setEdit(pre => !pre)
  }

  return {edit, editHandler}
}