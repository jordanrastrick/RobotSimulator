// Load and configure the test libraries:

const chai = require('chai');
chai.use(require('chai-string'));
chai.use(require('sinon-chai'));
// chai.use(require('chai-as-promised'));
chai.config.includeStack = true;
const expect = chai.expect;
require('sinon');


// The module under test:

var {Vector} = require('../robot');


describe('robot.test.js', function() {
  describe('Vector', function() {
    
    it('performs a basic construction correctly', function() {
      var v = new Vector(3, 2);
      expect(v.x).to.equal(3);
      expect(v.y).to.equal(2);  
    });
    
    it('adds two positive vectors together correctly', function () {
      var v1 = new Vector(1, 2);
      var v2 = new Vector(3, 4);
      var sum = v1.add(v2);
      expect(sum.x).to.equal(4);
      expect(sum.y).to.equal(6);    
    });

    it('adds vectors with mixed signs together correctly', function () {
      var v1 = new Vector(-2, 1);
      var v2 = new Vector(3, -3);
      var sum = v1.add(v2);
      expect(sum.x).to.equal(1);
      expect(sum.y).to.equal(-2);    
    });

    it('obeys communitivity of addition', function () {
      var v1 = new Vector(4, 3);
      var v2 = new Vector(5, 6);
      var sum1 = v1.add(v2);
      var sum2 = v2.add(v1);
      expect(sum1.equals(sum2)).to.be.true;
    });

    it('obeys associativity of addition', function () {
      var v1 = new Vector(1, 1);
      var v2 = new Vector(-2, 3);
      var v3 = new Vector(-4, -2);
      var sum1 = v1.add(v2).add(v3);
      var sum2 = v1.add(v2.add(v3));
      expect(sum1.equals(sum2)).to.be.true;
    });

  });
});