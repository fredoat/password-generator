
// Dom elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

// Put generator functions into an object
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Generate event listen
// In this event listener we are getting the values of the password length and if the boxes are checked
generateEl.addEventListener('click', () => {
    // Gets the value of the password length. The +lengthEl the type a number
    const length = +lengthEl.value;
    // .checked property will be a true or false whether the box is checked or not
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    // Pass the values into the function generatePassword
    // The result of this will get put into the result element so resultEl.innerText
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
    // 1. Initialize password variable
    // 2. Filter out unchecked types
    // 3. Loop over length call generator function for each type
    // 4. Add final password to the password variable and return it

    let generatedPassword = '';

    // returns the number of boxes check 
    const typesCount = lower + upper + number + symbol;
    // console.log('typesCount: ', typesCount);

    // returns an array of objects with boolean values, true & false values based on the checked boxes.
    // .filter is a high order array method that loops through each item. Then we filters out any false values by using(item => Object.values(item)[0]); The item is an array and the first value is 0.
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
    // console.log('typesArr: ', typesArr);

    // Checking if none of the boxes are checked
    if (typesCount === 0) {
        return '';
    }

    // Generating the different characters, Loop over the length and generate for each type
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // console.log('funcName: ', funcName);

            generatedPassword += randomFunc[funcName]();
        });
    }

    // console.log(generatedPassword.slice(0, length));
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

// Generator functions

function getRandomLower() {
    // Generate certain characters based on the corresponding number in the ascii table
    // Math.floor(Math.random() * 26) Generate a number from 0 to 25 representing the numbers in the alphabet which is 26.
    // Math.floor(Math.random() * 26) + 97 , 97 is the ascii # for lower case a therefore adding 97 to a random number between 0 and 25 will generate the ascii #'s for the lower case alphabet only and not any other characters in the ascii table. 
    // e.g. Lowest possible value 0 + 97 = 97, 97 is the ascii # for lower case a.
    // The highest number that can be generated is 25 + 97 = 122, 122 is the ascii # for lower case z.
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Generate random Upper case letter in the ascii table
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Generates random number in the ascii table
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Generates random symbol from hard coded string of symbols: '!A#$%^&*'
function getRandomSymbol() {
    const symbols = '!A#$%^&*';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

console.log(getRandomSymbol());
