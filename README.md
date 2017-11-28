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

