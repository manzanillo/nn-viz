const CONSTANTS = require('./constants.js')
// link classes
var Neuron = synaptic.Neuron,
	   Layer = synaptic.Layer,
	   Network = synaptic.Network,
       Trainer = synaptic.Trainer,
       Architect = synaptic.Architect;

// create the network
var inputLayer = new Layer(2);
var hiddenLayer = new Layer(3);
var outputLayer = new Layer(1);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

var myNetwork = new Network({
	input: inputLayer,
	hidden: [hiddenLayer],
	output: outputLayer
});


myNetwork.train = function(){
    console.log("start training")
    // train the network
    for (var i = 0; i < 20000; i++)
    {
        // 0,0 => 0
        myNetwork.activate([0,0]);
        myNetwork.propagate(CONSTANTS.learningRate, [0]);

        // 0,1 => 1
        myNetwork.activate([0,1]);
        myNetwork.propagate(CONSTANTS.learningRate, [1]);

        // 1,0 => 1
        myNetwork.activate([1,0]);
        myNetwork.propagate(CONSTANTS.learningRate, [1]);

        // 1,1 => 0
        myNetwork.activate([1,1]);
        myNetwork.propagate(CONSTANTS.learningRate, [0]);
    }
    console.log("Training finished")
}

// test the network
myNetwork.activate([0,0]); // [0.015020775950893527]
myNetwork.activate([0,1]); // [0.9815816381088985]
myNetwork.activate([1,0]); // [0.9871822457132193]
myNetwork.activate([1,1]); // [0.012950087641929467]

module.exports = myNetwork