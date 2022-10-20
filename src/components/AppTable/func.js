export function slice(arrayForSlice, chunkSize) {
    let slicedArr = [];
    let copyItems = [...arrayForSlice]

    while(copyItems.length > 0) {
        const chunk = copyItems.splice(0, chunkSize);
        slicedArr.push(chunk);
    }
    return slicedArr;
}