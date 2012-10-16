var lineReader = require('line-reader');

module.exports.readcode = function(file,move,home, set){
  lineReader.eachLine(file, function(line) {
    if(line.match(/^G1/)){
      move(line);
    }
    if(line.match(/^G28/)){
      home();
    }
    if(line.match(/^G20/)){
      set(0,1);
    }
    if(line.match(/^G21/)){
      set(0,0);
    }
    if(line.match(/^G90/)){
      console.log("This machine does not support absolute positioning.");
      console.log("Stoping Build.");
      set(1,0);
      return false;
    }
    
      
  }).then(function(){
    console.log('finished file: '+file);
  });
};
