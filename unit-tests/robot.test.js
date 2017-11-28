// Load and configure the test libraries:

const chai = require('chai');
chai.use(require('chai-string'));
chai.use(require('sinon-chai'));
// chai.use(require('chai-as-promised'));
chai.config.includeStack = true;
const expect = chai.expect;
require('sinon');


// The module under test:

var {Vector, SimpleGrid, Direction} = require('../robot');


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

  
  describe('SimpleGrid', function() {
    it('throws on invalid arguments to the constructor', function() {
      var invalidGridFactory = () => new SimpleGrid(0, 5);
      expect(invalidGridFactory).to
          .throw(/Can only construct SimpleGrid/);
    });

    it('reflects navigability of interior, corner and edge points', function() {
      var grid = new SimpleGrid(3, 5);
      var interior = new Vector(1, 3);
      var corner = new Vector(0, 0);
      var edge = new Vector(2, 3);
      expect(grid.navigable(interior)).to.be.true;
      expect(grid.navigable(corner)).to.be.true;
      expect(grid.navigable(edge)).to.be.true;
    });
    
    it('reflects non-navigability of exterior, corner-adjacenet and ' + 
        'edge-adjacent points', function() {
      var grid = new SimpleGrid(6, 4);
      var exterior = new Vector(10, 10);
      var cornerAdj = new Vector(6, -1);
      var edgeAdj = new Vector(2, 4);
      expect(grid.navigable(exterior)).to.be.false;
      expect(grid.navigable(cornerAdj)).to.be.false;
      expect(grid.navigable(edgeAdj)).to.be.false;
    });
  });


  describe('Direction',  function() {
    it('acts as the identity when converting from a string and back',
        function() {
      ['NORTH', 'EAST', 'SOUTH', 'WEST'].forEach(function(str) {
        expect(Direction.fromString(str).toString()).to.equal(str);
      });
    });
    it('composes rotateLeft and rotateRight to the identity',
        function() {
      ['NORTH', 'EAST', 'SOUTH', 'WEST'].forEach(function(str) {
        var direction = Direction.fromString(str); 
        expect(direction.rotateLeft().rotateRight().toString()).to.equal(str);
      });
    });
    it('composes four rotateLefts to the identity',
        function() {
      ['NORTH', 'EAST', 'SOUTH', 'WEST'].forEach(function(str) {
        var direction = Direction.fromString(str); 
        var sameDir = direction
            .rotateLeft()
            .rotateLeft()
            .rotateLeft()
            .rotateLeft();
        expect(sameDir.toString().to.equal(str));            
      });
    });
    it('composes four rotateRights to the identity',
        function() {
      ['NORTH', 'EAST', 'SOUTH', 'WEST'].forEach(function(str) {
        var direction = Direction.fromString(str); 
        var sameDir = direction
            .rotateRight()
            .rotateRight()
            .rotateRight()
            .rotateRight();
        expect(sameDir.toString().to.equal(str));            
      });
    });
    it('gives a different direction from a single rotation',
        function() {
      ['NORTH', 'EAST', 'SOUTH', 'WEST'].forEach(function(str) {
        var direction = Direction.fromString(str); 
        var sameDir = direction.rotateRight();
        expect(sameDir.toString().not.to.equal(str));            
      });
    });

  });

});