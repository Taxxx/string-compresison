// Hubb code problem

// Design a method that compresses an input string consisting of 
// only alphabetic characters by shortening its length, where possible. 
// The string should be compressed such that consecutive duplicate letters are 
// replaced with the letter followed by the number of 
// consecutive duplicates. For example, uuueeeenzzzzz would compress into u3e4nz5.

// However, if the compression of a given letter would not shorten the output string,
// simply output the original letters. For example, uuueeeennzzzzz would compress
//  into u3e4nnz5.

// This is my crazy function to compress strings

// Output examples:
// uuueeeenzzzzz => u3e4nz5
// uuueeeennzzzzz => u3e4nnz5
// auuueeeennzzzzzb => au3e4nnz5b
// sads4 => The string parameter cannot contains numbers

function stringCompression(str) {
    let hasNumber = /\d/;
    if (hasNumber.test(str)) {
        console.log('The string parameter cannot contains numbers');
        return;
    }
    if (str.length <= 2) {
        return str;
    }
    let output = '';
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        count++;
        if (str[i] != str[i + 1]) {
            if (count > 2) {
                output += str[i] + count;
            } else if (count == 1) {
                output += str[i];
            } else {
                output += str[i] + str[i];
            }
            count = 0;
        }
    }
    return output;
}

let textA = 'uuueeeennzzzzz';
console.log(stringCompression(textA));

// Bonus 1
// Bonus #1: Design the method in such a way that the input string may contain numbers.
// If the input string does contain numbers, ensure that the input is compressed in an
// unambiguous way (a way in which the output string can be uncompressed back into the original input string).
// Would an output of ab434 mean the original string was ab434 or ab43333 or abbbb3333 or ab4444444444444444444444444444444444?

// My approach to deal with this was add an extra space so in this case we can compress and decompress strings
// without deal with ambigous values, output examples:

// ab434 <=> a b 4 3 4
// ab43333 <=> a b 4 34
// abbbb3333 <=> a b4 34 
// ab4444444444444444444444444444444444 <=> a b 434
function stringCompressionSupportNumbers(str) {
    if (str.length <= 2) {
        return str;
    }
    let output = '';
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        count++;
        if (str[i] != str[i + 1]) {
            if (count > 2) {
                output += str[i] + count + ' ';
            } else if (count == 1) {
                output += str[i] + ' ';;
            } else {
                output += str[i] + str[i] + ' ';;
            }
            count = 0;
        }
    }
    return output;
}

let textB = 'abbbb3333';
console.log(stringCompressionSupportNumbers(textB));

// Bonus 2
// Bonus #2: Can the caller of the method know if the input 
// string was compressed or if the input string was simply returned
// as-is without the caller of the method
// having to perform a calculation of its own?

// Answer:
// With my approach in Bonus #1 to add an extra space is easy to know if a string was compressed before but also 
// I have on mind that we can return an object with a flag to know if the string has changed or not

// Output examples:
// a => {wasCompressed: false, result: "a"}
// abc => {wasCompressed: false, result: "abc"}
// uuueeeenzzzzz => {wasCompressed: true, result: "u3e4nz5"}

function stringCompressionWithFlag(str) {
    let hasNumber = /\d/;
    let obj = {};
    obj.wasCompressed = false;
    if (hasNumber.test(str)) {
        console.log('The string parameter cannot contains numbers');
        return;
    }
    if (str.length <= 2) {
        obj.result = str;
        return obj;
    }
    let output = '';
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        count++;
        if (str[i] != str[i + 1]) {
            if (count > 2) {
                output += str[i] + count;
                obj.wasCompressed = true;
            } else if (count == 1) {
                output += str[i];
            } else {
                output += str[i] + str[i];
            }
            count = 0;
        }
    }
    obj.result = output;
    return obj;
}

let textC = 'uuueeeenzzzzz';
console.log(stringCompressionWithFlag(textC));