export const getPossessiveForm = (name: string) => {
  if (name.endsWith("s")) {
    return name + "'";
  }
  return name + "'s";
};
