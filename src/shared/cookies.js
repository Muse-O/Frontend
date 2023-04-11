
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";

export const cookies = new Cookies();
export let token;
export let decodetoken;

if(cookies.get("access_token")) {
  token = cookies.get("access_token")
  decodetoken = jwtDecode(token)
}

