const parseJSON = (jsonToParse: string) => JSON.parse(jsonToParse);

export const saveLSItem = (name: string, value: any) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const getLSItem = (name: string) => {
  const value = localStorage.getItem(name);
  return value ? parseJSON(value) : undefined;
};

export const deleteLSItem = (name: string) => {
  localStorage.removeItem(name);
};

export const saveSSItem = (name: string, value: any) => {
  sessionStorage.setItem(name, JSON.stringify(value));
};

export const getSSItem = (name: string) => {
  const value = sessionStorage.getItem(name);
  return value ? parseJSON(value) : undefined;
};

export const deleteSSItem = (name: string) => {
  sessionStorage.removeItem(name);
};
