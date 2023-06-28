export const getAuthErrorMsg = (authMessage: string) => {
  if (authMessage.includes("user-not-found")) return "User not found!";
  if (authMessage.includes("wrong-password")) return "Wrong password!";
  if (authMessage.includes("invalid-email")) return "Invalid email!";
  if (authMessage.includes("email-already-exists"))
    return "Email already exists!";
  if (authMessage.includes("email-already-in-use"))
    return "Email already in use!";
  return "Something went wrong. Try again later!";
};
