var VRGui;
var BRGui;
var folder; //BR GUI menu element
var pSizeSlider;
var scaleSlider;

var scaleInterface;

var scaleSystem = {
  scaleAll:function(){
    scaleInterface.y = scaleInterface.x;
    scaleInterface.z = scaleInterface.x;
    datasetAndAxisLabelGroup.scale.x = scaleInterface.x;
    datasetAndAxisLabelGroup.scale.y = scaleInterface.y;
    datasetAndAxisLabelGroup.scale.z = scaleInterface.z;
    for(var i = 0; i < otherUsers.length; i++){
      if(scaleInterface.x < 1 ){
        otherUsers[i].scale.x = scaleInterface.x * 0.5;
        otherUsers[i].scale.y = scaleInterface.x *0.5;
        otherUsers[i].scale.z = scaleInterface.x *0.5;
      }
    }
  }
};


function ScaleObject(){
  this.x = datasetAndAxisLabelGroup.scale.x;
  this.y = datasetAndAxisLabelGroup.scale.y;
  this.z = datasetAndAxisLabelGroup.scale.z;
};

//Creates the VR gui object which contains a number of useful tools
function VRGui() {
  VRGui = new dat.GUIVR.create("Tools");

  // //Dropdown for choosing X axis
  var xDrop = VRGui.add(selectedAxes, 'selectedX', axisMenu.axesOptions);
  xDrop.onChange(liveUpdate.liveX);

  // //Dropdown for choosing Y axis
  var yDrop = VRGui.add(selectedAxes, 'selectedY', axisMenu.axesOptions);
  yDrop.onChange(liveUpdate.liveY);

  // //Dropdown for choosing Z axis
  var zDrop = VRGui.add(selectedAxes, 'selectedZ', axisMenu.axesOptions);
  zDrop.onChange(liveUpdate.liveZ);

  // //Button to redraw using redraw with a vr switch to trigger the axis data to come from the vr GUI
  VRGui.add(redraw, 'redrawVR');

  //Button to trigger selection stats recalculation and redraw
  var stats = VRGui.add(redraw, 'selectionStats');
  stats.name("Update Stats");
 
  // //Button that pushes the currently drawn axis selection to the database
  var pushDB = VRGui.add(pushToDB, 'pushToDB');
  pushDB.name("Push Axis/Selection");

    //Point size slider
  var slider = VRGui.add(pointVars, 'plotPointSizeCoeff', 0.000, 0.5);
  slider.step(0.005);
  slider.onChange(redraw.redrawVR);
  slider.listen(pointVars.plotPointSizeCoeff);
  // slider.onChange(redraw.redrawVR);
  slider.name("Point Size");
}

/**
  This populates the axis menu in the browser
  **/
function BRGui() {
  (function () {
    var script2 = document.createElement('script');
    script2.onload = function () {
      BRGui = new dat.GUI();
      BRGui.autoPlace = false;
      folder = BRGui.addFolder("axis");

      //Point size slider
      var slider = folder.add(pointVars, 'plotPointSizeCoeff', 0.000, 0.1, 0.001);
      slider.listen(pointVars.plotPointSizeCoeff);
      slider.__onChange = redraw.redraw;

      //Dropdown for choosing X axis
      var xSelect = folder.add(axisMenu, 'xAxis', axisMenu.axesOptions);

      //Dropdown for choosing Y axis
      var ySelect = folder.add(axisMenu, 'yAxis', axisMenu.axesOptions);

      //Dropdown for choosing Z axis
      var zSelect = folder.add(axisMenu, 'zAxis', axisMenu.axesOptions);

      folder.add(redraw, 'redrawVR');
      folder.add(pushAxesToDB, 'pushAxesToDB');

      //Initializes with the selection from the loaded dataset
      xSelect.__select.selectedIndex = axisMenu.xAxis;
      ySelect.__select.selectedIndex = axisMenu.yAxis;
      zSelect.__select.selectedIndex = axisMenu.zAxis;
    };
    script2.src = '//rawgit.com/dataarts/dat.gui/master/build/dat.gui.js';
    document.head.appendChild(script2);
  })();
}

function scaleMenu() {
  scaleSlider = VRGui.add(scaleInterface, 'x', 0.1, 10);
  scaleSlider.onChange(scaleSystem.scaleAll);
  scaleSlider.name("Scale");
}

