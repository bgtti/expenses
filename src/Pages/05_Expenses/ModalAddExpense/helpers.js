// function isAmount equal takes 2 numbers and returns true or false
export function isAmountEqual(firstAmount, secondAmount) {
    //checks if its a number and returns it *100 as an int
    function validateNum(value) {
        const multipliedValue = value * 100;
        const intValue = parseInt(multipliedValue);
        if (isNaN(intValue)) {
            console.error("Amount must be a number.");
            return false;
        }
        return intValue;
    }
    let num1 = validateNum(firstAmount);
    let num2 = validateNum(secondAmount);
    return (num1 === num2);
}
//function divideAmount takes the amount and the number it should be divided by
//it outputs an object witht the quotient and remainder as string with 2 decimals
export function divideAmount(amount, divisor) {
    if (divisor === 0 || !divisor || Number.isNaN(amount) || Number.isNaN(divisor)) {
        console.error("Numbers required for division.")
        return {
            quotient: 0,
            remainder: 0
        }
    }
    let quotient = (Math.round(amount * 100 / divisor)) / 100;
    let remainder = Math.abs(amount - (quotient * divisor));
    return {
        quotient: quotient.toFixed(2),
        remainder: remainder.toFixed(2), // limit the remainder to 2 decimal places
    };
}

//This function can be used to divide amounts equally between an array of groups or sub-groups
export function divideEquallyAmongObjects(totalAmount, arrayOfObjects) {
    //Input format required: [{name: "", uuid: "", ...] or [{value: "", label:""}].
    //Output format: [] or [{name: "", uuid: "", amount:""}] or including keys: subgroups, groupName, groupUuid, depending on what was passed in.
    if (!arrayOfObjects || arrayOfObjects.length === 0) {
        console.error("Missing argument, returning empty array.")
        return []
    }
    if (!totalAmount || totalAmount === 0 || totalAmount === "0" || totalAmount === "" || Number.isNaN(totalAmount)) {
        return arrayOfObjects.map((obj) => ({
            ...obj,
            amount: '',
        }));
    }
    if (arrayOfObjects.length === 1) {
        return arrayOfObjects.map((obj) => ({
            ...obj,
            amount: totalAmount,
        }));
    }
    let theAmount = divideAmount(Number(totalAmount), arrayOfObjects.length);
    const newArrayOfObjects = arrayOfObjects.map((obj, index) => {
        let thisAmount = theAmount.quotient;
        //if there is a remainder to the division, it will be added to the amount of the first object
        if (index === 0 && thisAmount !== '' && theAmount.remainder && theAmount.remainder !== "0.00" && theAmount.remainder !== 0.00) {
            thisAmount = (((Number(thisAmount) * 100) + (theAmount.remainder * 100))) / 100
            thisAmount = parseFloat(thisAmount.toFixed(2))
        }
        const newObj = {
            uuid: obj.value ? obj.value : obj.uuid,
            name: obj.label ? obj.label : obj.name,
            amount: thisAmount,
        };

        // Check if the object has groupName, groupUuid or subgroup keys, and include them if they exist
        if ('groupName' in obj) {
            newObj.groupName = obj.groupName;
        }
        if ('groupUuid' in obj) {
            newObj.groupUuid = obj.groupUuid;
        }
        if ('subgroups' in obj) {
            newObj.subgroups = obj.subgroups;
        }

        return newObj;
    });

    return newArrayOfObjects;
}


