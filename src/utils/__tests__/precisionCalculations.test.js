import { divideWithPrecision, multiplyWithPrecision } from '../precisionCalculations';

test('Precision Calculations: divideWithPrecision', () => {
    //Console warn being ignored on the first function.
    jest.spyOn(console, 'warn').mockImplementation(() => { });
    expect(divideWithPrecision(1, 1, -7)).toBe("1.00");
    console.warn.mockRestore();
    expect(() => divideWithPrecision("x", 8)).toThrow(new Error("Invalid input for division."));
    expect(() => divideWithPrecision(4, "x")).toThrow(new Error("Invalid input for division."));
    expect(() => divideWithPrecision(5, 0)).toThrow(new Error("Invalid input for division."));
    expect(() => divideWithPrecision(0, 0)).toThrow(new Error("Invalid input for division."));
    expect(divideWithPrecision(0, 3)).toBe("0.00");
    expect(divideWithPrecision(10, 3)).toBe("3.33");
    expect(divideWithPrecision("7.2", "2.4")).toBe("3.00");
    expect(divideWithPrecision(168381.51, "2.85571")).toBe("58963.10");
    expect(divideWithPrecision(134965.83, 0.01)).toBe("13496583.00");
    expect(divideWithPrecision("367.10", 3, 3)).toBe("122.367");
    expect(divideWithPrecision(367.10, 3, 4)).toBe("122.3667");
    expect(divideWithPrecision(1111.1, 0.01, 0)).toBe("111110");
});

test('Precision Calculations: multiplyWithPrecision', () => {
    //Console warn being ignored on the first function.
    jest.spyOn(console, 'warn').mockImplementation(() => { });
    expect(multiplyWithPrecision(1, 1, -1)).toBe("1.00");
    console.warn.mockRestore();
    expect(() => multiplyWithPrecision("x", 8)).toThrow(new Error("Invalid input for multiplication."));
    expect(() => multiplyWithPrecision(4, "x")).toThrow(new Error("Invalid input for multiplication."));
    expect(multiplyWithPrecision(0, 2)).toBe("0.00");
    expect(multiplyWithPrecision(0.1, 3)).toBe("0.30");
    expect(multiplyWithPrecision("3.11", 10)).toBe("31.10");
    expect(multiplyWithPrecision("500", "0.00656327", 6)).toBe("3.281635");
    expect(multiplyWithPrecision(58963.1, "2.85571 ", 2)).toBe("168381.51");
});



