const { test, expect } = require("@jest/globals")
describe('test cases', () => {
    test('object', () => {
        const data = { a: 1 };
        data['b'] = 4;
        expect(data).toEqual({ a: 1, b: 4 });
    });

    test("equality matchers", () => {
        expect(4 * 4).toBe(16);
        expect(5 - 2).not.toBe(1);
    })
    test("truthy operators", () => {
        var name = "Software testing help"
        var n = null
        expect(n).toBeNull()
        expect(name).not.toBeNull
        expect(name).toBeTruthy()
        expect(n).toBeFalsy()
        expect(0).toBeFalsy()
    })
    test("numeric operators", () => {
        var num1 = 100;
        var num2 = -20;
        var num3 = 0;
        expect(num1).toBeGreaterThan(10)
        expect(num2).toBeLessThanOrEqual(0)
        expect(num3).toBeGreaterThanOrEqual(0)
    })
    test("string matchers", () => {
        var string1 = "hi how are you"
        expect(string1).toMatch(/hi/);
        expect(string1).not.toMatch(/hlo/)
    })

    describe('arrayContaining', () => {
        const expected = ['Alia', 'lina'];
        it('matches ', () => {
            expect(['Alia', 'lina', 'Eve']).toEqual(expect.arrayContaining(expected));
        });
        it('does not match', () => {
            expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
        });
    });

});

const mathCalculations = require('./service');

describe("Test cases", () => {
    test("Addition", () => {
        var result = mathCalculations.sum(2, 3)
        expect(result).toBe(5);
    });

    test("Subtraction ", () => {
        var result = mathCalculations.diff(14, 2)
        expect(result).toBe(12);
    });

    test("Multiplication ", () => {
        var result = mathCalculations.product(4, 8)
        expect(result).toBe(32);
    });
    test("Division ", () => {
        var result = mathCalculations.divide(32, 8)
        expect(result).toBe(4);
    });
})