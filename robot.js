var _ = require('lodash');
var fs = require('fs');

// We know from basic mathematics that we can conveniently represent both 
// locations and differences in location (i.e. movements) through the same 
// abstraction - vectors from the origin. Vectors can be added together,
// allowing us to combine a location with any number of movements to determine
// a new position.
class Vector {
  constructor(x, y) {
    if (!_.isInteger(x) || !_.isInteger(y)) {
      throw new Error("Can't construct an integer vector from non-integer(s): " 
          + x + ', ' + y); 
    }
    this._x = x;
    this._y = y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  equals(other) {
    return this._x === other._x && this._y === other._y;
  }

  add(other) {
    return new Vector(this._x + other._x, this._y + other._y);
  }
}




class SimpleGrid {
  constructor(width, height) {
    if (!_.every([
      _.isInteger(width), 
      _.isInteger(height), 
      width > 0, 
      height > 0,
    ])) { 
      throw new Error('Can only construct SimpleGrid with positive integers ' 
          + '(' + width + ', ' + height + ')'); 
    }
    this._width = width;
    this._height = height;  
  }

  navigable(location) {
    return 0 <= location.x && location.x < this._width
        && 0 <= location.y && location.y < this._height;
  } 

}

// Get the number n, where 0 <= n < divisor, such that, 
// quotient === k * divisor + n, for some integer k
function positiveMod(quotient, divisor) {
  var regularMod = quotient % divisor;
  return regularMod < 0 ? regularMod + Math.abs(divisor) : regularMod;  
}

class Direction {
  static get _count() {
    return 4;
  }

  static get _stringValues() {
    return ['NORTH', 'EAST', 'SOUTH', 'WEST'];
  }

  static get _unitMovements() {
    return [
      new Vector(0, 1), 
      new Vector(1, 0), 
      new Vector(0, -1),
      new Vector(-1, 0),
    ];

  }

  constructor(clockwiseRightAngles) {
      this._clockwiseRightAngles =
          positiveMod(clockwiseRightAngles, this.constructor._count);
  }

  
  static fromString(str) {
    var ix = this._stringValues.indexOf(str);
    if (ix ===- 1) {
      throw new Error('Invalid value for constructing a Direction');
    } else {
      return new Direction(ix);
    }
  }

  toString() {
    return this.constructor._stringValues[this._clockwiseRightAngles];
  }

  _rotateBy(clockwiseRightAngles) {
    return new Direction(this._clockwiseRightAngles + clockwiseRightAngles); 
  }
  
  rotateLeft() {
    return this._rotateBy(-1);
  }

  rotateRight() { 
    return this._rotateBy(1);
  }  
  
  // Get the unit (length 1) movement in this direction:
  unitMovement() {
    return this.constructor._unitMovements[this._clockwiseRightAngles];
  }

}


class Robot {
  constructor() {
    this.grid = new SimpleGrid(5, 5);
  }


  processCommands(input) {
      
    _(input.split('\n'))
        .map(cmd => cmd.trim()) // stripe out extraneous ws for convenience
      // Any command prior to a PLACE is invalid and should be ignored:
        .dropWhile(cmd => !cmd.startsWith('PLACE'))
        .map(cmd => cmd.split(' '))
        .forEach(([cmdName, argStr]) => {
      if (!_.includes(['PLACE', 'LEFT', 'RIGHT', 'MOVE', 'REPORT'], cmdName)) {
        throw new Error('Invalid command given to robot: ' + cmdName);
      }
      var args;
      if (cmdName === 'PLACE') {
        args = argStr.split(',');
        args[0] = parseInt(args[0]);
        args[1] = parseInt(args[1]);
      } else {
        args = [];
      }
      var methodName = cmdName.toLowerCase();
      this[methodName](...args);            
    });
  }

  place(x, y, facing) {
    var newLocation = new Vector(x, y);
    if (this.grid.navigable(newLocation)) {
      this.location = newLocation;
      this.direction = Direction.fromString(facing);
    } 
    // otherwise ignore the invalid place command 
  }

  left() {
    this.direction = this.direction.rotateLeft();
  }

  right() {
    this.direction = this.direction.rotateRight();    
  }

  move() {
    var newLocation = this.location.add(this.direction.unitMovement());
    if (this.grid.navigable(newLocation)) {
      this.location = newLocation;
    }    
  }

  report() {
    console.log([this.location.x, this.location.y, this.direction.toString()]
        .join(','));  
  }

}

// Read from stdin only if this is being executed as a script, not imported:
// https://nodejs.org/docs/latest/api/all.html#modules_accessing_the_main_module

if (require.main === module) {
  var r2d2 = new Robot();
  var buffer = fs.readFileSync(0);
  r2d2.processCommands(buffer.toString());
}

// Export components (primarily for testing)

module.exports = {Vector, SimpleGrid, Direction, Robot};