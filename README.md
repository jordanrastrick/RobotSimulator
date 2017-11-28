# RobotSimulator

The RobotSimulator is a program that executes a simple simulation of a robot navigating its way around an empty 5 x 5 grid in response to commands. 

## Environments 

This program was developed on `Windows 10 Pro (v1709) 64 bit`, using `node 6.11.2`.  

I expect it to run on any operating system that supports concurrent or later version of `node`. Earlier versions of `node` will probably also work, provided they supply relevant ES6 features (e.g. object destructuring).

## System dependencies

The only dependency besides `node` is `npm`, to install and manage relevant packages.

Get the current LTS version of `node` from:

[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

This should include an appropriate version of `npm`. 

To check your versions run

`> node -v`

and 

`> npm -v`

## Installation

[@todo: git clone]

## Usage

`> node robot`

[@todo: example]


## Testing

Run:

`> mocha ./unit-tests/` 

to execute the unit test suite. 

To execute the integration tests, pipe `e2e-tests.in` into the main application:

`> node robot < e2e-tests.in`

## Overview

The program is designed to read from `stdin` a series of commands to the robot, and (possibly) print to standard output statements about the robot's current status, when relevant `REPORT` commands are issued. 

## Input Format

A series of lines each containing one of the following commands:

* `LEFT`
* `RIGHT`
* `MOVE`
* `REPORT`
* `PLACE X,Y,F`

`LEFT` and `RIGHT` cause the robot to turn (on the spot) 90 degrees left and right, respectively.

`MOVE` causes the robot to move forward one square, unless it is at an edge of the 5 x 5 grid, in which case it ignores the command.

`REPORT` causes the robot to output its current status (see Output Format)

`PLACE X,Y,F` causes the robot to be placed on the grid at square (X, Y), facing direction F (one of `NORTH`, `SOUTH`, `EAST`, `WEST`). If (X,Y) is not on the grid the command is ignored. All commands before the first `PLACE` are also ignored.


## Output Format

A robot will `REPORT` by printing to `stdout` its current status in the same format as  the `PLACE` command, namely `X,Y,F` where (X, Y) are its grid coordinates and F the direction it is facing.


## Example

(taken from exercise specification "Code Test -Robot.pdf")

`stdin`:
```
PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT
```

`stdout`:
```
3,3,NORTH
```


## Design

### Launch

On application launch the parser interprets the commands passed in through `stdin`. These are interpreted into methods of the Robot class. These methods in turn make use of the core data structures:
  * `Vector` --> For keep tracking of robot's location, and representing movement
  * `SimpleGrid` --> For enforcing the boundaries on the robot's movement
  * `Direction` --> For tracking where the robot faces, and calculating rotations   

### Discussion

The simple core data structure classes - Vector, SimpleGrid, Direction - are all immutable (provided their public-facing interfaces are respected). In my experience with both immutable and mutable data structures that represent small, simple pieces of information, the former are less bug prone.    

With respect to the Vector class, I considered representing locations and movements with their own types, i.e. restricting the addition operation on locations to only take movements as an argument. However it seemed like an unnecessary complication with the current simple specification of the project, that could perhaps be revisited if making a future extension.

The grid in the problem specification does not actually need any internal data structure; it is "only" a boundary condition on the robot's movement. However the interface of the provided SimpleGrid class should be extensible to Grids of more complex shapes, internal obstacles, potentially even multiple robots, etc.



## License 

MIT License

## Contributing

On the off chance you'd like to contribute to further development of this project contact me, [jordanrastrick@gmail.com](jordanrastrick@gmail.com)

