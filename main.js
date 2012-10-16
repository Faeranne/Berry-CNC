//===============================
//This was written for a friend
//who wanted to control a CNC
//with a Raspberry Pi.  So no
//guarente will be given, and
//little support will be avalible
//Use at your own risk.
//===============================

var gpio = require('gpio');
var gcode = require('./gcode.js');

//-------------------------------
//All configuration options are below
//replace your gpio number
//for each part.
//-------------------------------

//Steper driver step pin
var step_x = gpio.export(0);
var step_y = gpio.export(1);
var step_z = gpio.export(4);
//Stepper driver direction pin
var dir_x = gpio.export(21);
var dir_y = gpio.export(22);
var dir_z = gpio.export(23); 
//Stop sensors
var stop_x = gpio.export(24 ,"in");
var stop_y = gpio.export(25 ,"in");
var stop_z = gpio.export(26 ,"in");

var tool = gpio.export(27);

//-------------------------------
//Configuration end
//-------------------------------
//Function Setup
//-------------------------------

function stepx(steps,dir){
  dir_x.set(dir);
  for(i=0;i<steps;i++){
    step_x.set();
    step_x.reset();
  }
}

function stepy(steps,dir){
  dir_y.set(dir);
  for(i=0;i<steps;i++){
    step_y.set();
    step_y.reset();
  }
}

function stepz(steps,dir){
  dir_z.set(dir);
  for(i=0;i<steps;i++){
    step_z.set();
    step_z.reset();
  }
}

function home(){
  var done = false;
  if(stop_x.value){
    stepx(10,0);
  }
  if(stop_x.value){
    stepx(10,0);
  }
  if(stop_x.value){
    stepx(10,0);
  }
  while(!done){
    if(!(stop_x.value)){
      stepx(1,1);
    }
    if(!(stop_y.value)){
      stepy(1,1);
    }
    if(!(stop_z.value)){
      stepz(1,1);
    }
    if(stop_x.value){
      if(stop_y.value){
        if(stop_z.value){
          done=true;
        }
      }
    }
  }
}

function move(line){
  console.log(line);
}

function set(event,code){
  console.log("event "+event+", Code "+code);
}

function print(file){
  gcode.readcode(file,move,home,set);
}

