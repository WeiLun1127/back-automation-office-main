//Use For API Calling
import axios, { AxiosError } from "axios";

interface ApiParams {
  EXECF: string;
  Uid: string;
  Token: string;
  Data: string;
}

interface ApiError extends Error {
  statusCode?: number;
  responseData?: any;
}

export const apiHandler = async (apiUrl: string, params: ApiParams) => {
  try {
    const response = await axios.post(apiUrl, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      let customError: ApiError = new Error("An error occurred during the API request");

      if (!axiosError.response) {
        customError.message = "Network error or no response from the server";
        console.error("Network error:", axiosError.message);
        throw customError;
      }

      if (axiosError.response.status >= 500) {
        customError.message = "Server error occurred";
        customError.statusCode = axiosError.response.status;
        customError.responseData = axiosError.response.data;
        console.error("Server error:", axiosError.response.data);
        throw customError;
      }

      if (axiosError.response.status >= 400 && axiosError.response.status < 500) {
        customError.message = "Client error occurred";
        customError.statusCode = axiosError.response.status;
        customError.responseData = axiosError.response.data;
        console.error("Client error:", axiosError.response.data);
        throw customError;
      }

      customError.message = axiosError.message;
      console.error("Unexpected error:", axiosError.message);
      throw customError;
    } else {
      const genericError: ApiError = new Error("Unexpected error occurred");
      console.error("Unexpected non-Axios error:", error);
      throw genericError;
    }
  }
};
