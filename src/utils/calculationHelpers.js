export function checkIfNumberAndReturnFloat(number) {
    if (!number || isNaN(number)) {
        return number === 0 ? 0 : false;
    } else {
        return parseFloat(number)
    }
}

export function countDecimals(number) {
    if (typeof number === 'string') {
        number = Number(number);
    }
    if (!number) {
        if (number === 0) {
            return 0
        } else {
            throw new Error("Invalid number.");
        }
    }
    if ((number % 1) !== 0)
        return number.toString().split(".")[1].length;
    return 0;
}

export function manageTrailingZeroesInDecimals(number, minDecimals = 2) {
    //Function will remove any trailing zeroes from float up to the minimum set of decimal places (minDecimals).
    //Function will add trailing zeroes if minimum number of decimals is greater than the number of decimals in float.
    //required argument: number (as string or float).
    //optional argument: minDecimals as int
    //returned value will be a string.
    if (!Number.isInteger(minDecimals)) {
        console.warn("manageTrailingZeroesInDecimals requires an int for minDecimals. Using default.");
        minDecimals = 2;
    }

    number = checkIfNumberAndReturnFloat(number);

    if (Number.isInteger(number)) {
        return number.toFixed(minDecimals);
    };

    if (!number) {
        throw new Error("manageTrailingZeroesInDecimals requires a number.");
    }

    // Split the number into integer and decimal parts
    const [integerPart, decimalPart] = `${number}`.split('.');

    if (!decimalPart || decimalPart.length >= minDecimals) {
        return number.toString();
    }

    // Remove trailing zeros from the decimal part
    const trimmedDecimalPart = decimalPart.replace(/0+$/, ''); //If the decimal part is "123000", /0+$/ would match the "000" at the end

    number = parseFloat(`${integerPart}.${trimmedDecimalPart}`)

    if (minDecimals > 0) {
        if (decimalPart === '' || decimalPart.length < minDecimals) {
            return number.toFixed(minDecimals)
        }
    }

    return number.toString()
}