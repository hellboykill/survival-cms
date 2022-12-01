function stringNull(textArray) {
    textArray.forEach(text => {
        if(text === undefined || text === '') return true;
    })
    return false;
}
export { stringNull };
