import { checkIfNumberAndReturnFloat, countDecimals, manageTrailingZeroesInDecimals } from '../calculationHelpers';

test('CalculationHelpers: checkIfNumberAndReturnFloat', () => {
    expect(checkIfNumberAndReturnFloat("30")).toBe(30);
    expect(checkIfNumberAndReturnFloat("30.8")).toBe(30.8);
    expect(checkIfNumberAndReturnFloat(5)).toBe(5);
    expect(checkIfNumberAndReturnFloat(1670.309000)).toBe(1670.309);
    expect(checkIfNumberAndReturnFloat("x")).toBe(false);
    expect(checkIfNumberAndReturnFloat(0)).toBe(0);
    expect(checkIfNumberAndReturnFloat("0")).toBe(0);
});

test('CalculationHelpers: countDecimals', () => {
    expect(countDecimals(0)).toBe(0);
    expect(countDecimals(2.3678906)).toBe(7);
    expect(countDecimals("89.567")).toBe(3);
    expect(() => countDecimals("x")).toThrow(new Error("Invalid number."));
});

test('CalculationHelpers: manageTrailingZeroesInDecimals', () => {
    //Console warn being ignored on the first two functions.
    jest.spyOn(console, 'warn').mockImplementation(() => { });
    expect(manageTrailingZeroesInDecimals(0)).toBe("0.00");
    expect(manageTrailingZeroesInDecimals("18", "x")).toBe("18.00");
    console.warn.mockRestore();
    expect(manageTrailingZeroesInDecimals(30)).toBe("30.00");
    expect(manageTrailingZeroesInDecimals(1670.309000)).toBe("1670.309");
    expect(manageTrailingZeroesInDecimals("36.1000", 3)).toBe("36.100");
    expect(manageTrailingZeroesInDecimals("7.908900", 1)).toBe("7.9089");
    expect(manageTrailingZeroesInDecimals("7.908900", 9)).toBe("7.908900000");
});