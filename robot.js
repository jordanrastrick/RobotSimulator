var _ = require('lodash');

// We know from basic mathematics that we can conveniently represent both 
// locations and differences in location (i.e. movements) through the same 
// abstraction - vectors from the origin. Vectors can be added together,
// allowing us to combine a location with any number of movements to determine
// a new position.

// I considered representing locations and movements with their own types, 
// i.e. restricting the addition operation on locations to only take 
// movements as an argument. However it seemed like an unnecessary complication
// with the current simple specification of the project, that could perhaps be
// revisited if making a future extension.

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


// The grid in the problem specification does not actually need any internal 
// data structure; it is "only" a boundary condition on the robot's movement. 
// However this interface should be extensible to Grids of more complex shapes, 
// internal obstacles, potentially even multiple robots, etc.


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



module.exports = {Vector, SimpleGrid};