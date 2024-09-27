module.exports = class  {
    static escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
  
    static isIgnoredNumber(number) {
      return isNaN(number) || number > 1000;
    }
  
    static isNegativeNumber(number) {
      return number < 0;
    }
  
    static throwForNegatives(negatives) {
      throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
    }
  }
  