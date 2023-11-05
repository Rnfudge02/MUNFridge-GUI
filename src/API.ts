import axios, { AxiosError } from "axios";
import { Item, Shelf} from "../../backend/messaging/src/interfaces"

const algorithmsBaseURL = "http://localhost:8000";
const GetIdemsInFridgeEndpoint = "/getItemsInFridge";


// No missing items -> an empty array is returned
export const getItemsInFridge = async (fridgeId: number): Promise<Item[] | AxiosError> => {
  try {

    const { data } = await axios.get(`${algorithmsBaseURL}${GetIdemsInFridgeEndpoint}/${fridgeId}`);

  } catch (error: unknown) {

    const axiosError = error as AxiosError
    return axiosError;

  }

}

