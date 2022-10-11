async function clampImageSize(base64ImageStr, maxWidth, maxHeight) {
    console.log(maxWidth, maxHeight);
    //return base64ImageStr;
    let img = new Image();
    await new Promise(r => {
      console.log("start promise")
      img.onload = r;
      img.src = base64ImageStr.trim();
      console.log("end promise")
    });
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
  
    let width = img.width;
    let height = img.height;
  
    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, height, width);
    return canvas.toDataURL(img.type);
  }
  
  function isToday(someDate) {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  }
  
  function isThisYear(someDate) {
    const today = new Date();
    return someDate.getFullYear() === today.getFullYear();
  }
  
  function calculateDatePrecisionOptions(someDate) {
    //let options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let options;
    if (isToday(someDate)) {
      options = { hour: "numeric", minute: "numeric" };
    } else if (isThisYear(someDate)) {
      options = { month: "short", day: "numeric" };
    } else {
      options = { year: "numeric", month: "short" };
    }
    return options;
  }
  
  function getMinMax(arr) {
    let min = arr[0];
    let max = arr[0];
    let i = arr.length;
  
    while (i--) {
      min = arr[i] < min ? arr[i] : min;
      max = arr[i] > max ? arr[i] : max;
    }
    return { min, max };
  }
  
  function getAllAncestors(
    item,
    idFieldName = "id",
    parentIdFieldName = "parentId",
    childrenFieldName = "children"
  ) {
    console.log("getAllAncestors", item);
    const items = [];
    item[childrenFieldName].forEach(el => {
      items.push(
        ...getAllAncestors(el, idFieldName, parentIdFieldName, childrenFieldName)
      );
    });
    console.log("items", items);
    return items;
  }
  
  function setPropertyWithAllAncestors(
    item,
    propertyName,
    value,
    idFieldName = "id",
    parentIdFieldName = "parentId",
    childrenFieldName = "children"
  ) {
    item[propertyName] = value;
    item[childrenFieldName].forEach(el =>
      setPropertyWithAllAncestors(
        el,
        propertyName,
        value,
        idFieldName,
        parentIdFieldName,
        childrenFieldName
      )
    );
  }
  
  function deleteFromArrayWithAllAncestors(
    array,
    item,
    idFieldName = "id",
    parentIdFieldName = "parentId"
  ) {
    array.splice(
      array.findIndex(e => e[idFieldName] === item[idFieldName]),
      1
    );
    array
      .filter(e => e[parentIdFieldName] === item[idFieldName])
      .forEach(e1 => {
        deleteFromArrayWithAllAncestors(array, e1);
        const indexOfE = array.findIndex(
          e2 => e2[idFieldName] === e1[idFieldName]
        );
        array.splice(indexOfE, 1);
      });
  }
  
  function listAsTree(list, idField, parentIdField, childrenArrayField) {
    const tree = [];
    list.forEach(e => (e[childrenArrayField] = []));
    list.forEach(e => {
      if (e[parentIdField]) {
        const parent = list.find(ee => ee[idField] === e[parentIdField]);
        parent[childrenArrayField].push(e);
      } else {
        tree.push(e);
      }
    });
    return tree;
  }
  
  function treeAsList(tree, idField, parentIdField, childrenArrayField) {
    const list = [];
    const convert = (t, l) => {
      t.forEach(ti => {
        l.push(ti);
        if (ti[childrenArrayField]) {
          convert(ti[childrenArrayField], l);
          ti[childrenArrayField].forEach(e => (e[parentIdField] = ti[idField]));
        }
      });
    };
    if (tree) {
      convert(tree, list);
    } else {
      return [];
    }
    return list;
  }
  
  function locateElementInTree(tree, id, idFieldName, childrenFieldName) {
    const getById = (tree, id) => {
      for (let index = 0; index < tree.length; index++) {
        const element = tree[index];
        if (element[idFieldName] === id) {
          return { array: tree, index: index };
        } else {
          if (element[childrenFieldName]) {
            const found = getById(element[childrenFieldName], id);
            if (found) {
              return found;
            }
          }
        }
      }
    };
    return getById(tree, id);
  }
  
  function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }
  
  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  }
  
  function generateAvatar(
    text,
    foregroundColor = "white",
    backgroundColor = "black"
  ) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
  
    canvas.width = 200;
    canvas.height = 200;
  
    // Draw background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  
    // Draw text
    context.font = "bold 100px Arial";
    context.fillStyle = foregroundColor;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);
  
    return canvas.toDataURL("image/png");
  }
  
  function getBackgroundColor(stringInput) {
    const h = [...stringInput].reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    const s = 95,
      l = 35 / 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
  
  function generateColorFromString(s) {
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      hash = s.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = "#";
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
  }
  
  function waitUntil(condition){
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (!condition()) {
          return;
        }
  
        clearInterval(interval);
        resolve();
      }, 100);
  
      setTimeout(() => {
        clearInterval(interval);
        reject('your error msg');
      }, 20000);
    });
  }
  
  function calcLotfusspunkt_2d(a1, a2, u1, u2, p1, p2){
    const l1 = a1 + (u1*u1*(p1-a1) + u1*u2*(p2-a2))/(u1*u1 + u2*u2)
    const l2 = a2 + (u1*u2*(p1-a1) + u2*u2*(p2-a2))/(u1*u1 + u2*u2)
    return {l1, l2}
  }
  
  /**
   *
   * @param startPoint {{x: number, y: number}}
   * @param endPoint {{x: number, y: number}}
   * @returns {{x: number, y: number}}
   */
  export function calcDirectionalVector(startPoint, endPoint){
    return {
      x: endPoint.x - startPoint.x,
      y: endPoint.y - startPoint.y
    }
  }
  
  /**
   *
   * @param vector {{x: number, y: number}}
   * @returns {{x: number, y: number}}
   */
  export function calcNormalVector(vector){
    const abs = Math.sqrt(vector.x * vector.x + vector.y * vector.y)
    if(abs){
      return {
        x: -vector.y / abs,
        y: vector.x / abs
      }
    }
    return {
      x: 0,
      y: 0
    }
  
  }
  
  export {
    getMinMax,
    locateElementInTree,
    clamp,
    polarToCartesian,
    clampImageSize,
    isToday,
    isThisYear,
    calculateDatePrecisionOptions,
    generateAvatar,
    getBackgroundColor,
    generateColorFromString,
    setPropertyWithAllAncestors,
    treeAsList,
    listAsTree,
    deleteFromArrayWithAllAncestors,
    getAllAncestors,
      waitUntil,
    calcLotfusspunkt_2d
  };
  