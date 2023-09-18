const SUCCESS_MESSAGES = {
    CREATED: "Registered successfully",
    UPDATED: "Resource updated successfully",
    DELETED: "Resource deleted successfully",
    LOGIN: "Logged in successfully",
    LOGOUT: "Logged Out successfully",
    DELIVERED:"Delivered successfully"
  };
  
  const WARN_MESSAGES = {
      CONFLICT: "User Already Exist, please login ",
      ALREADY_LOGGED_IN: "User is already logged in"
  };
  
  const ERROR_MESSAGES = {
    NOT_FOUND: "Resource not found",
    INTERNAL_SERVER_ERROR: "Internal server error",
    BAD_REQUEST: "All fields are required",
    INVALID_PWD: "Invalid password",
    INVALID_EMPID: "Employee ID must be 14 characters, combination of characters and numbers",
    INVALID_USERNAME:"Please enter valid USERNAME",
    INVALID_EMAIL:"Please enter valid EMAIL",
    INVALID_ROLE_NAME:"Role must be Admin or User",
  };
  export { ERROR_MESSAGES, SUCCESS_MESSAGES, WARN_MESSAGES };