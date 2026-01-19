export function parseToBoolean(value: string | undefined) {
  return String(value).trim().toLowerCase() === "true";
}