//jshint moz:true

var iconsDefault = {
      "16": "./icon-16.png",
      "32": "./icon-32.png",
      "64": "./icon-64.png"
    };

var iconsPressed = {
      "16": "./icon-16-g.png",
      "32": "./icon-32-g.png",
      "64": "./icon-64-g.png"
    };

const defaultState = {
  "label": "Block Images",
  "icon": iconsDefault
};

const pressedState = {
  "label": "Enable Images",
  "icon": iconsPressed
};


var prefName = "permissions.default.image";
var imagesAllowedStatus = require("sdk/preferences/service").get(prefName);
var launchState = (imagesAllowedStatus === 1) ? defaultState : pressedState;

var tabs = require('sdk/tabs');
var { ToggleButton } = require("sdk/ui/button/toggle");
var imageBlockerButton = ToggleButton({
    id: "image-blocker-button",
    label: launchState.label,
    icon: launchState.icon,
    onChange: function(state) {
       if(state.checked){
          imageBlockerButton.state(imageBlockerButton, pressedState);
          require("sdk/preferences/service").set(prefName, 2);
          console.log("now blocking..");
       } else {
          imageBlockerButton.state(imageBlockerButton, defaultState);
          require("sdk/preferences/service").set(prefName, 1);
          console.log("unblocking");
          tabs.activeTab.reload();
       }
    }
  });



