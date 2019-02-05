const fs = require('fs');

const addMetadatas = ((metadatas) => {
    let metadataSum = 0;

    metadatas.forEach((metadata) => {
        metadataSum += metadata;
    });

    return metadataSum;
});

const getLeafValue = (metadatas) => {
    return addMetadatas(metadatas)
}

const getParentValue = (metadatas, valueMap, childNodes) => {
    let valueSum = 0;

    metadatas.forEach((metadata) => {
        const value = valueMap.get(childNodes[metadata - 1]);
        if (value) {
            valueSum += value;
        }
    });

    return valueSum;
}

const getNodeValues = (array, i) => {
  const numChilds = array[i];
  const numMetadatas = array[i + 1];

  if (numChilds === 0) {
    const metadataStart = i + 2;
    const metadataEnd = metadataStart + numMetadatas;

    const metadatas = array.slice(metadataStart, metadataEnd);
    valueMap.set(i, getLeafValue(metadatas));

    return metadataEnd;
  } else {
    const childNodes = new Array();
    let node = i + 2;

    for (let j = 0; j < numChilds; j++) {
        childNodes.push(node);
        node = getNodeValues(array, node);
    }

    const metadatas = array.slice(node, node + numMetadatas);
    valueMap.set(i, getParentValue(metadatas, valueMap, childNodes));

    return node + numMetadatas;
  }
}

const input = fs.readFileSync('input.txt', 'utf-8').split(' ').map((number) => parseInt(number));

const valueMap = new Map();

getNodeValues(input, 0);

console.log(`${valueMap.get(0)} is the value of the root node`);