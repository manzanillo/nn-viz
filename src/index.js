const CONSTANTS = require('./constants.js')
const myNetwork = require('./network.js')


// set up actions
window.onload = function () {
    document.getElementById("start-training-btn").addEventListener("click", myNetwork.train);
    //object.addEventListener("click", myScript);

const nodeImgElement = document.getElementById("node")
      const knobImgElement = document.getElementById("knob")
      const network = [2, 3, 1]
      const maxNodeNumberForLayer = Math.max(...network)
      let data=[
          {
           input: [1,0],
           output: [1] 
          },
          {
           input: [1,1],
           output: [0] 
          },
          {
           input: [0,0],
           output: [0] 
          },
          {
           input: [0,1],
           output: [1] 
          },
      ]
      let input = data[0].input
      
      // this network learns the XOR gate (through neuro-evolution)
// create the network

      function getRandomInt(max) {
        min = 0
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
      }

      function switchDraggingMode(element) {
        element.lockMovementX = !element.lockMovementX
        element.lockMovementY = !element.lockMovementY
      }

      function switchDraggingModeForList(list) {
        list.forEach(elem => switchDraggingMode(elem))
      }

      function shuffle(array) {
        return array.sort(() => Math.random() - 0.5)
      }

      var canvas = new fabric.Canvas("canvas")
      canvas.selection = false
      window.addEventListener("resize", resizeCanvas, false)

      function resizeCanvas() {
        canvas.setHeight(window.innerHeight)
        canvas.setWidth(window.innerWidth)
        canvas.renderAll()
      }

      canvas.on("object:rotating", function(evt) {
        console.log(evt)
        evt.target.to.set(
          "strokeWidth",
          evt.target.from.get("strokeWidth") *
            (((evt.target.angle + 180) % 360) / 360)
        )
        canvas.renderAll()
      })

      // resize on init
      resizeCanvas()

      let networkNodes = []
      for (let layer = 0; layer < network.length; layer++) {
        let nodes = []
        let left =
          canvas.width * 0.1 + ((canvas.width * 0.9) / network.length) * layer
        for (let i = 0; i < network[layer]; i++) {
          var node = new fabric.Image(nodeImgElement, {
            left: left,
            top:
              ((canvas.height * 0.8) / network[layer]) * i +
              canvas.height * 0.1 * (1 + maxNodeNumberForLayer- network[layer]),
            originX: "center",
            originY: "center",
            selectable: false
          })
        
          if (layer === 0){
            var text = canvas.add(new fabric.Text(String(input[i]), { 
                left: node.left - 25 , //Take the block's position
                top: node.top,
                originX: "right",
                originY: "center"
            }));
          }
          node.scaleToWidth(canvas.height / 20)
          node.scaleToHeight(canvas.height / 20)
          nodes.push(node)
          canvas.add(node)
        }
        networkNodes.push(nodes)
      }

      let networkKnobs = [],
        networkLines = []
      for (let layer = 0; layer < network.length - 1; layer++) {
        const layer1 = networkNodes[layer]
        const layer2 = networkNodes[layer + 1]
        let knobs = [],
          lines = []
        for (let layer1Index = 0; layer1Index < layer1.length; layer1Index++) {
          for (
            let layer2Index = 0;
            layer2Index < layer2.length;
            layer2Index++
          ) {
            let knob = new fabric.Image(knobImgElement, {
              left:
                layer1[layer1Index].left +
                (layer2[layer2Index].left - layer1[layer1Index].left) * 0.8,
              top:
                layer1[layer1Index].top +
                (layer2[layer2Index].top - layer1[layer1Index].top) * 0.8,
              originX: "center",
              originY: "center"
            })
            knob.setControlsVisibility({
              mt: false,
              mb: false,
              ml: false,
              mr: false,
              tr: false,
              tl: false,
              br: false,
              bl: false,
              mtr: true //the rotating point (defaut: true)
            })
            knob.lockMovementX = knob.lockMovementY = true
            knob.scaleToWidth(canvas.height / 24)
            knob.scaleToHeight(canvas.height / 24)
            knobs.push(knob)

            let points1 = [
              layer1[layer1Index].left,
              layer1[layer1Index].top,
              knob.left,
              knob.top
            ]
            let points2 = [
              knob.left,
              knob.top,
              layer2[layer2Index].left,
              layer2[layer2Index].top
            ]

            let line1 = new fabric.Line(points1, {
              strokeWidth: 10,
              stroke: "black",
              originX: "center",
              originY: "center",
              selectable: false
            })
            let line2 = new fabric.Line(points2, {
              strokeWidth: 3,
              stroke: "black",
              originX: "center",
              originY: "center",
              selectable: false
            })
            lines.push({
              to: line1,
              from: line2
            })
            canvas.add(line1)
            canvas.add(line2)
            knob["from"] = line1
            knob["to"] = line2
            canvas.add(knob)
          }
        }
        networkKnobs.push(knobs)
        networkLines.push(lines)
      }
}