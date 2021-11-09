const inProps = (key, props) => {
  return props.some((omitKey) => {
    return omitKey === key;
  });
};

export const omit = (obj, props) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (!inProps(key, props)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
