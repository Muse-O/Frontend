
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";

export const cookies = new Cookies();
export const token = cookies.get("access_token")
export const decodetoken = jwtDecode(token)
