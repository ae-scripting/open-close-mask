﻿{// basic panelrun_script(this); function run_script(thisObj){// this is global  var ocdata = {        "closed":false      };///   THIS WILL CHECK IF PANEL IS DOCKABLE OR FLAOTING WINDOW  var win   = buildUI(thisObj );if ((win != null) && (win instanceof Window)) {    win.center();    win.show();}; // end if win  null and not a instance of window  function buildUI (thisObj  ) {        var H = 25; // the height        var W = 30; // the width        var G = 5; // the gutter        var x = G;         var y = G;            var win = (thisObj instanceof Panel) ? thisObj :  new Window('palette', 'example',[0,0,W*5+G*3,H+2*G],{resizeable: true});     if (win != null) {            win.check_box = win.add('checkbox',[x,y,x+W*2,y + H],'closed?');        x+=W*2+G;        win.button = win.add('button', [x,y,x+W*3,y + H], 'do it');        win.check_box.onClick = function (){            ocdata.closed = this.value;        };        win.button.onClick = function () {        main_script();        }    }    return win;}  function main_script(){                    var curComp = app.project.activeItem;   if (!curComp || !(curComp instanceof CompItem)){        alert('please select a comp');        return;    }    if(curComp.selectedLayers.length < 1){        alert('Please select at least one layer');    return;        }    app.beginUndoGroup('open-close-mask');                    for(var i = 0; i < curComp.selectedLayers.length;i++){        var layer = curComp.selectedLayers[i];        var masks = get_selected_masks (layer);        for(var j=0;j < masks.length;j++){                        var prop = masks[j].maskPath;            shape = prop.value;            shape.closed = ocdata.closed;            prop.setValue(shape);                                                                }                }              app.endUndoGroup();     }              function get_selected_masks(layer){ // this is taken again from redefinerys fundamentals// http://www.redefinery.com/ae/fundamentals/masks/#masks_getselected// given:// layer = Layer object, and the layer can have masks applied//var masksGroup = layer("Masks");var selectedMasks = [];                 // Store masks in an array; starts as emptyif (masksGroup != null){                                                 // Iterate through properties of masksGroup                                                 // Append selected mask to the array                                                     for (var i = 1; i <= masksGroup.numProperties; i++){       if (masksGroup.property(i).selected)            selectedMasks[selectedMasks.length] = masksGroup.property(i);            }        }// The selectedMasks array now contains the list of selected masks // in top-to-bottom order       return selectedMasks;    }    };// close run_script}    