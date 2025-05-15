interface SuccessResponse<T> {
  success: true;
  time: string;
  maintenance_info: boolean | null;
  result: {
    title: string;
    message: string;
    data: T | undefined;
  };
}

interface ErrorResponse {
  success: false;
  time: string;
  maintenance_info: boolean | null;
  result: {
    title: string;
    error: any;
  };
}

const currentDateTime = () => {
  const date = new Date();
  const currentDataTime = date.toLocaleString([], { hour12: true });

  return currentDataTime;
};

/**
 * Function to provide a standardized success response for all APIs.
 * @param resultCode - API response defined custom result_code.
 * @param title - API response title based on result_code.
 * @param message - API response your defined message.
 * @param data - Any kind of data in API response.
 * @param maintenance - Optional: Provide any kind of maintenance information.
 * @returns A standardized success response.
 */
export const successResponse = <T>(
  title: string,
  message: string,
  data?: T | undefined,
  maintenance?: boolean | any,
): SuccessResponse<T> => ({
  success: true,
  time: currentDateTime(),
  maintenance_info: maintenance || null,
  result: {
    title,
    message,
    data: data ? data : undefined,
  },
});

/**
 * Function to provide a standardized error response for all APIs.
 * @param resultCode - API response defined custom result_code.
 * @param title - API response title based on result_code.
 * @param error - Any kind of error in API response.
 * @param maintenance - Optional: Provide any kind of maintenance information.
 * @returns A standardized error response.
 */
export const errorResponse = (
  title: string,
  error: any,
  maintenance?: boolean | any,
): ErrorResponse => ({
  success: false,
  time: currentDateTime(),
  maintenance_info: maintenance || null,
  result: {
    title,
    error,
  },
});
