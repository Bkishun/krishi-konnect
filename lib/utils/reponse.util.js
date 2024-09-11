export function responseData(resData, ErrorCode, message, errorMessage) {
    return {
      message: message,
      errorMessage: errorMessage,
      code: ErrorCode,
      data: resData,      
    };
  }