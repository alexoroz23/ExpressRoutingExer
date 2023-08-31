const { expect } = require("chai");
const { findMean, findMedian, findMode } = require("./helpers");

describe("findMedian", function() {
  it("should find the median of an even set", function() {
    expect(findMedian([1, -1, 4, 2])).to.equal(1.5);
  });

  it("should find the median of an odd set", function() {
    expect(findMedian([1, -1, 4])).to.equal(1);
  });
});

describe("findMean", function() {
  it("should find the mean of an empty array", function() {
    expect(findMean([])).to.equal(0);
  });

  it("should find the mean of an array of numbers", function() {
    expect(findMean([1, -1, 4, 2])).to.equal(1.5);
  });
});

describe("findMode", function() {
  it("should find the mode", function() {
    expect(findMode([1, 1, 1, 2, 2, 3])).to.equal(1);
  });
});
