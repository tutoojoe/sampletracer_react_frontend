import axios from "./axios";
import requestAPI from "./requestAPIs";

export async function getSingleProduct(processId) {
  const response = await axios.get(`${requestAPI.processDetail}/${processId}`);
}
