// fungsi bandingkan 2 array
function bandingkanArray(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

console.log('Uji 1 [1, 2, 3] vs [1, 2, 3] :', bandingkanArray([1, 2, 3], [1, 2, 3])); // true
console.log('Uji 2 [1, 2, 3] vs [1, 2, 4] :', bandingkanArray([1, 2, 3], [1, 2, 4])); // false
console.log('Uji 3 [1, 2] vs [1, 2, 3]    :', bandingkanArray([1, 2], [1, 2, 3])); // false
console.log("Uji 4 ['a', 'b'] vs ['a', 'b']:", bandingkanArray(['a', 'b'], ['a', 'b'])); // true



// tambahlan fitur pada web server agar dapat bekerja sebahai static file
