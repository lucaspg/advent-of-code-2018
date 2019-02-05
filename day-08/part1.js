const fs = require('fs');

let metadataSum = 0;

const addMetadatas = ((metadatas) => {
    metadatas.forEach((metadata) => {
        metadataSum += metadata;
    });
})

const getMetadata = (array, i) => {
  const numChilds = array[i];
  const numMetadatas = array[i + 1];

  if (numChilds === 0) {
    const metadataStart = i + 2;
    const metadataEnd = metadataStart + numMetadatas;

    const metadatas = array.slice(metadataStart, metadataEnd);
    addMetadatas(metadatas);

    return metadataEnd;
  } else {
    let node = i + 2;

    for (let j = 0; j < numChilds; j++) {
      node = getMetadata(array, node);
    }

    const metadatas = array.slice(node, node + numMetadatas);
    addMetadatas(metadatas);
    
    return node + numMetadatas;
  }
}

const input = fs.readFileSync('input.txt', 'utf-8').split(' ').map((number) => parseInt(number));

getMetadata(input, 0);

console.log(`${metadataSum} is the sum of all metadata entries`);