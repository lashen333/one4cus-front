// src\lib\constants\messages.ts
export const appMessages = {
  general: {
    somethingWentWrong: "Something went wrong. Please try again.",
    tryAgainLater: "Please try again later.",
    notFound: "The requested resource was not found.",
    loadingFailed: "We could not load the requested information.",
  },

  forms: {
    invalidFields: "Please correct the highlighted fields.",
    requiredFields: "Please fill in the required fields.",
    submitFailed: "We could not submit your request.",
    submitSuccess: "Your request was submitted successfully.",
  },

  auth: {
    unauthorized: "You need to sign in to continue.",
    forbidden: "You do not have permission to access this resource.",
    sessionExpired: "Your session has expired. Please sign in again.",
  },

  network: {
    offline: "You appear to be offline. Check your internet connection.",
    requestFailed: "The request failed. Please try again.",
  },
} as const;
