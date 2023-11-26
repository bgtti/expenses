function checkIfNumberAndReturnFloat(number) {
    if (!number || Number.isNaN(number)) {
        console.error("Not a Number.")
        return false;
    } else {
        return parseFloat(number)
    }
}

export function divideWithPrecision(dividend, divisor, precision = 8, nrDecimals = 2) {
    //This function accepts floats, ints, or strings for dividend or divisor.
    //Optional arguments: precision and nrDecimals (for the resulting output) must be of type int
    //If working with exchange rates, precision of 8 is recommended
    //Returns a string if successfull or false if not

    // Convert inputs to floats
    const dividendFloat = checkIfNumberAndReturnFloat(dividend);
    const divisorFloat = checkIfNumberAndReturnFloat(divisor);

    // Make sure we are working with numbers and not dividing by 0
    if (divisorFloat === 0 || !dividendFloat || !divisorFloat) {
        console.error("Couldn't perform division.")
        //throw new Error("Invalid inputs for division.");
        return false
    };

    // Make sure precision was not input wrong
    if (precision !== 8) {
        if (!Number.isInteger(precision) || precision < 1 || precision > 20) {
            console.warn("Precision argument must be (1 > int < 20). Division using default precision value.");
            precision = 8;
        }
    }
    const multiple = Math.pow(10, precision);

    const dividendInt = Math.trunc(dividend * multiple);
    const divisorInt = Math.trunc(divisor * multiple);

    // Perform division with precision
    const result = (dividendInt / divisorInt) / multiple;

    // Round to the desired precision
    const roundedResultString = parseFloat(result).toFixed(nrDecimals);

    return roundedResultString;
}

// Example usage:
// const result = divideWithPrecision(10, 3); // "3.33"
// const result2 = divideWithPrecision("15.678", 2.5); // "6.27"
// const result3 = divideWithPrecision(7.2, "2.4"); // "3.00"

