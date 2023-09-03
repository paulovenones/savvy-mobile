export function maskEmail(email: string) {
  const parts = email.split("@");
  if (parts.length !== 2) {
    return email;
  }

  const username = parts[0];
  const domain = parts[1];

  const maskedUsername = `${username.substring(0, 2)}***${username.substring(
    username.length - 2
  )}`;
  return `${maskedUsername}@${domain}`;
}
