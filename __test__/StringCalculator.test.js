const StringCalculator = require('../stringCalculator');

describe('StringCalculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new StringCalculator();
  });

  test('should return 0 for an empty string', () => {
    expect(calculator.add('')).toBe(0);
  });

  test('should return the number itself when only one number is provided', () => {
    expect(calculator.add('5')).toBe(5);
  });

  test('should sum two numbers separated by a comma', () => {
    expect(calculator.add('1,2')).toBe(3);
  });

  test('should sum multiple numbers separated by commas', () => {
    expect(calculator.add('1,2,3,4,5')).toBe(15);
  });

  test('should handle newlines as a delimiter', () => {
    expect(calculator.add('1\n2,3')).toBe(6);
  });

  test('should handle custom single character delimiter', () => {
    expect(calculator.add('//;\n1;2')).toBe(3);
  });

  test('should handle custom multi-character delimiters', () => {
    expect(calculator.add('//[***]\n1***2***3')).toBe(6);
  });

  test('should handle multiple custom delimiters', () => {
    expect(calculator.add('//[*][%]\n1*2%3')).toBe(6);
  });

  test('should ignore numbers greater than 1000', () => {
    expect(calculator.add('2,1001')).toBe(2);
  });

  test('should handle multiple delimiters of varying lengths', () => {
    expect(calculator.add('//[***][%%][#]\n1***2%%3#4')).toBe(10);
  });

  test('should throw an error for negative numbers', () => {
    expect(() => calculator.add('1,-2,3,-4')).toThrow('Negatives not allowed: -2, -4');
  });

  test('should throw an error for negative numbers even with custom delimiters', () => {
    expect(() => calculator.add('//;\n1;-2;3;-4')).toThrow('Negatives not allowed: -2, -4');
  });
});
