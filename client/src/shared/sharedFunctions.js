// check if any field in an object is empty
export const ifEmpty = (object) => {
  for (const i in object) {
    if (`${object[i]}` === "") {
      return true;
    }
  }
  return false;
};
