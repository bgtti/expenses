import { checkIfNumberAndReturnFloat, countDecimals, manageTrailingZeroesInDecimals } from "./calculationHelpers";

export function divideWithPrecision(dividend, divisor, nrDecimals = 2) {
    //This function accepts floats, ints, or strings for dividend or divisor.
    //Optional argument: nrDecimals (for the resulting output) must be of type int
    //If returning an exchange rate, it is recommended to set nrDecimals to at least 4
    //Returns a string if successfull or false if not

    // Convert inputs to floats
    const dividendFloat = checkIfNumberAndReturnFloat(dividend);
    const divisorFloat = checkIfNumberAndReturnFloat(divisor);

    if (nrDecimals !== 2) {
        if (!Number.isInteger(nrDecimals) || nrDecimals < 0 || nrDecimals > 20) {
            console.warn("nrDecimals argument must be (0 > int < 20). Division using default number of decimals.");
            nrDecimals = 2;
        }
    }

    // Make sure we are working with numbers and not dividing by 0
    if (divisorFloat === 0 || !dividendFloat || !divisorFloat) {
        if (dividendFloat === 0 && !isNaN(divisorFloat) && divisorFloat != 0) {
            return 0..toFixed(nrDecimals)
        } else {
            throw new Error("Invalid input for division.");
        }
    };
    //decide on appropriate precision:
    let precision = Math.max(countDecimals(dividendFloat), countDecimals(divisorFloat), 8)
    if (precision > 20) {
        precision = 20;
    }

    const multiple = Math.pow(10, precision);

    const dividendInt = Math.trunc(dividend * multiple);
    const divisorInt = Math.trunc(divisor * multiple);

    // Perform division with precision
    const result = dividendInt / divisorInt;

    // return rounded result with the desired number of decimal places as a string;
    return (parseFloat(result).toFixed(nrDecimals))
}

export function multiplyWithPrecision(factor1, factor2, nrDecimals = 2) {
    //This function accepts floats, ints, or strings for factors 1 and 2.
    //Optional argument: nrDecimals (for the resulting output) must be of type int
    //If return is an exchange rate, it is recommended to set nrDecimals to at least 4
    //Returns a string if successfull or throws error
    factor1 = checkIfNumberAndReturnFloat(factor1);
    factor2 = checkIfNumberAndReturnFloat(factor2);

    if (nrDecimals !== 2) {
        if (!Number.isInteger(nrDecimals) || nrDecimals < 0 || nrDecimals > 20) {
            console.warn("nrDecimals argument must be (0 > int < 20). Multiplication using default number of decimals.");
            nrDecimals = 2;
        }
    }

    // Make sure we are working with numbers 
    if (!factor1 || !factor2) {
        if (factor1 === 0 || factor2 === 0) {
            return 0..toFixed(nrDecimals)
        } else {
            throw new Error("Invalid input for multiplication.");
        }
    };

    //decide on appropriate precision:
    let precision = Math.max(countDecimals(factor1), countDecimals(factor2), 2)
    if (precision > 20) {
        precision = 20;
    }

    const multiple = Math.pow(10, precision);

    const factor1Int = Math.trunc(factor1 * multiple);
    const factor2Int = Math.trunc(factor2 * multiple);

    // Perform multiplication with precision
    const result = (factor1Int * factor2Int) / (multiple * multiple);

    // return rounded result with the desired number of decimal places as a string;
    return (parseFloat(result).toFixed(nrDecimals));
}



