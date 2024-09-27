const Utils = require('./utils');

class StringCalculator {
  constructor() {
    this.defaultDelimiter = /,|\n/;
  }

  add(numbers) {
    if (this.isEmpty(numbers)) {
      return 0;
    }

    let delimiter = this.defaultDelimiter;

    if (this.hasCustomDelimiter(numbers)) {
      const { customDelimiter, remainingNumbers } = this.extractCustomDelimiter(numbers);
      delimiter = customDelimiter;
      numbers = remainingNumbers;
    }

    const numArray = numbers.split(delimiter);
    return this.calculateSum(numArray);
  }

  isEmpty(numbers) {
    return numbers === '';
  }

  hasCustomDelimiter(numbers) {
    return numbers.startsWith('//');
  }

  extractCustomDelimiter(numbers) {
    const delimiterDeclarationEnd = numbers.indexOf('\n');
    let delimiterPattern = numbers.substring(2, delimiterDeclarationEnd).trim();

    let customDelimiter;
    if (delimiterPattern.startsWith('[') && delimiterPattern.endsWith(']')) {
      const delimiters = delimiterPattern.match(/\[(.*?)\]/g).map(d => d.slice(1, -1));
      customDelimiter = new RegExp(delimiters.map(d => Utils.escapeRegExp(d)).join('|'));
    } else {
      customDelimiter = new RegExp(Utils.escapeRegExp(delimiterPattern));
    }

    const remainingNumbers = numbers.substring(delimiterDeclarationEnd + 1);
    return { customDelimiter, remainingNumbers };
  }

  calculateSum(numArray) {
    let sum = 0;
    let negatives = [];

    for (let num of numArray) {
      const number = parseInt(num, 10);

      if (Utils.isIgnoredNumber(number)) continue;
      if (Utils.isNegativeNumber(number)) negatives.push(number);

      sum += number;
    }

    if (negatives.length > 0) {
      Utils.throwForNegatives(negatives);
    }

    return sum;
  }
}

module.exports = StringCalculator;
