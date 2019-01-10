const isObject = obj => (typeof obj === 'object' && obj !== null) || typeof obj === 'function';


const getConstructorName = function getConstructorName(obj) {
  return (obj.constructor && obj.constructor.name) ? obj.constructor.name : '';
};


const isDate = d => d instanceof Date;


const isEmpty = o => Object.keys(o).length === 0;


const properObject = o => isObject(o) && !o.hasOwnProperty ? { ...o } : o;


const AsyncFunction = (async () => {}).constructor;


const isFunctionConstructor = (f) => {
  if (f.constructor === Function || f.constructor === AsyncFunction) {
    return true;
  }
  return false;
};

const isArgumentFunction = (f) => {
  if (!f || typeof f !== 'function' || !isFunctionConstructor(f)) {
    return false;
  }
  return true;
};


const isFunction = (obj) => {
  return !!(obj && obj.constructor && obj.call && obj.apply);
};


const getDiffValuesFromObjects = (lhs, rhs) => {
  if (lhs === rhs) return {};
  if (!isObject(lhs) || !isObject(rhs)) return rhs;
  const l = properObject(lhs);
  const r = properObject(rhs);
  const deletedValues = Object.keys(l).reduce((acc, key) => {
    return r.hasOwnProperty(key) ? acc : { ...acc, [key]: undefined };
  }, {});
  if (isDate(l) || isDate(r)) {
    if (l.valueOf() == r.valueOf()) return {};
    return r;
  }
  return Object.keys(r).reduce((acc, key) => {
    if (!l.hasOwnProperty(key)) return { ...acc, [key]: r[key] };
    const difference = getDiffValuesFromObjects(l[key], r[key]);
    if (isObject(difference) && isEmpty(difference) && !isDate(difference)) return acc;
    return { ...acc, [key]: difference };
  }, deletedValues);
};


const compareObjects = function compareObjects(obj1, obj2) {
  return Object.keys(obj1).every(k1 =>
    Object.keys(obj2).some(k2 =>
      obj1[k1] === obj2[k2],
    ),
  );
};


const getElementsToSort = (a, b, prop, type) => {
  if (type === 'date') {
    return {
      keyA: new Date(a[prop]),
      keyB: new Date(b[prop]),
    };
  }
  return {
    keyA: a[prop],
    keyB: b[prop],
  };
};


const sortArrayDescBy = (prop, type) => (a, b) => {
  const { keyA, keyB } = getElementsToSort(a, b, prop, type);
  if (keyA > keyB) return -1;
  if (keyA < keyB) return 1;
  return 0;
};


const sortArrayAscBy = (prop, type) => (a, b) => {
  const { keyA, keyB } = getElementsToSort(a, b, prop, type);
  if (keyA < keyB) return -1;
  if (keyA > keyB) return 1;
  return 0;
};


const removeDuplicateFromArray = arr => Array.from(new Set(arr));


module.exports = {
  isObject,
  isArgumentFunction,
  isFunction,
  getConstructorName,
  getDiffValuesFromObjects,
  compareObjects,
  sortArrayDescBy,
  sortArrayAscBy,
  removeDuplicateFromArray,
};
