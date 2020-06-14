/*
 * Example plugin template
 */

jsPsych.plugins["decoy-gamble"] = (function() {

    var plugin = {};
  
    plugin.info = {
      name: "decoy-gamble",
      parameters: {
        stimulus: {
          type: jsPsych.plugins.parameterType.OBJECT,
          default:null,
          pretty_name: 'stimuli element'
        },
        choices: {
            type: jsPsych.plugins.parameterType.KEYCODE,
            array: true,
            pretty_name: 'choices',
            default: ['leftarrow', 'uparrow','rightarrow'],
            description: 'The keys the subject is allowed to press to respond to the stimulus.'
          },
          timing_response: {
            type: jsPsych.plugins.parameterType.INT,
            pretty_name: 'timing_response',
            default: 0,
            description: 'Timing response.'
          },
          doEyeTracking: {
            type: jsPsych.plugins.parameterType.BOOL,
            pretty_name: 'eye-tracking',
            default: false,
            description: 'Whether to do the eye tracking during this trial.'
          }
          }    
      } 
  
    plugin.trial = function(display_element, trial) {
        //Note on '||' logical operator: If the first option is 'undefined', it evalutes to 'false' and the second option is returned as the assignment
        var setTimeoutHandlers = [];
  
        thisTrial = utils.shuffle([[ trial.stimulus.oA_w, trial.stimulus.oA_h], 
                   [ trial.stimulus.oB_w,trial.stimulus.oB_h], 
                   [trial.stimulus.oC_w, trial.stimulus.oC_h]]);
         
        trial.maxArea_width = trial.stimulus.correct_w ||[];
        trial.maxArea_height = trial.stimulus.correct_h ||[];
        
        trial.option1_w = thisTrial[0][0] ||[];
        trial.option1_h = thisTrial[0][1] ||[];
        trial.option2_w = thisTrial[1][0] ||[];
        trial.option2_h = thisTrial[1][1] ||[];
        trial.option3_w = thisTrial[2][0] ||[];
        trial.option3_h = thisTrial[2][1] ||[];

        trial.correct_area = trial.maxArea_width * trial.maxArea_height; 
       
        var response = {
          rt: -1,
          key: -1
        };
        
         //--------Set up Canvas start-------
        var gambleCanvas = document.createElement("canvas");
        display_element.appendChild(gambleCanvas);


        var body = document.getElementsByClassName("jspsych-display-element")[0];
		
		//Save the current settings to be restored later
		var originalMargin = body.style.margin;
		var originalPadding = body.style.padding;
		var originalBackgroundColor = body.style.backgroundColor;
		
		//Remove the margins and paddings of the display_element
		body.style.margin = 0;
		body.style.padding = 0;
		body.style.backgroundColor = "black"; //Match the background of the display element to the background color of the canvas so that the removal of the canvas at the end of the trial is not noticed


        //Declare variables for width and height, and also set the canvas width and height to the window width and height
		var canvasWidth = gambleCanvas.width = window.innerWidth * 0.9;
        var canvasHeight = gambleCanvas.height = window.innerHeight * 0.9;
        
        
		//Remove the margins and padding of the canvas
		gambleCanvas.style.margin = 0;
    gambleCanvas.style.padding = 0;	
        
        //Get the context of the canvas so that it can be painted on.

        
        //img.src = 'imgsrc/icon-gamble.png';

        var draw = function() {
             var ctx = gambleCanvas.getContext("2d");



             ////lower left: 37
             ctx.beginPath();
             ctx.fillStyle = "grey";
             ctx.fillRect((3/16-6/64)*canvasWidth, (1/64 +39/64)*canvasHeight,trial.option1_w*2.5,trial.option1_h*2.5);
             ctx.stroke();

              ////upper middle: 38
             ctx.beginPath();
             ctx.fillStyle = "grey";
             ctx.fillRect((7/16)*canvasWidth, (1/64)*canvasHeight,trial.option2_w*2.5 ,trial.option2_h*2.5);
             ctx.stroke();



              ///lower right: 39
             ctx.beginPath();
             ctx.fillStyle = "grey";
             ctx.fillRect((3/16 + 1/2 + 6/64)*canvasWidth, (1/64 +39/64)*canvasHeight,trial.option3_w*2.5, trial.option3_h*2.5);
             ctx.stroke();
       
        };

        var display_selection = function () {
          var ctx = gambleCanvas.getContext("2d");
          if (response.key == 37) {
            ctx.beginPath();
            ctx.strokeStyle = "red";
          ctx.rect((2/16-6/64)*canvasWidth, (1/256 +39/64)*canvasHeight,(16/64)*canvasWidth,(24/64)*canvasHeight);
        // ctx.rect((2/16-6/64)*canvasWidth, (1/256 +39/64)*canvasHeight,trial.option1_w*3 + 1/16*canvasWidth,trial.option1_h*3 + (1/64 - 1/256)*canvasHeight );
            ctx.stroke();
          } if (response.key == 38) {
         
            ctx.beginPath();
            ctx.strokeStyle = "red";
          ctx.rect((6/16)*canvasWidth, (1/256)*canvasHeight,(16/64)*canvasWidth,(24/64)*canvasHeight);

           // ctx.rect((6/16)*canvasWidth, (1/256)*canvasHeight,trial.option2_w*3 + 1/16*canvasWidth, trial.option2_h*3 + (1/64 - 1/256)*canvasHeight);
            
            ctx.stroke();
          } if (response.key == 39){
            ctx.beginPath();
            ctx.strokeStyle = "red";
           ctx.rect((2/16 + 1/2+ 6/64)*canvasWidth, (1/256 +39/64)*canvasHeight,(16/64)*canvasWidth,(24/64)*canvasHeight);
         // ctx.rect((2/16 + 1/2+ 6/64)*canvasWidth, (1/256 +39/64)*canvasHeight,trial.option3_w*3 + 1/16*canvasWidth, trial.option3_h*3+ 1/128*canvasHeight);
            ctx.stroke();
          }
        };

       var kill_timers = function () {
            for (var i = 0; i < setTimeoutHandlers.length; i++) {
              clearTimeout(setTimeoutHandlers[i]);
            }
          };
      
          var kill_listeners = function () {
            if (typeof keyboardListener !== 'undefined') {
              jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
            }
          };

          var correct = 0;
          var chosen_area; 

          var start_response_listener = function () {
            if (trial.choices != jsPsych.NO_KEYS) {
              keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
                valid_responses: trial.choices,
                rt_method: 'performance',
                persist: false,
                allow_held_key: false,
                callback_function: function (info) {
                  kill_listeners();
                  kill_timers();
                  response = info;
                  if (response.key==37) { 
                    trial.decision_width = thisTrial[0][0];
                    trial.deicison_height = thisTrial[0][1];
                  }  if (response.key==38) { 
                    trial.decision_width = thisTrial[1][0];
                    trial.deicison_height = thisTrial[1][1];
                  } if (response.key==39) { 
                    trial.decision_width = thisTrial[2][0];
                    trial.deicison_height = thisTrial[2][1];
                  }
                  chosen_area = trial.decision_width*trial.deicison_height;
                  if (chosen_area == trial.correct_area) {
                    correct = 1;
                  } 
                  display_selection();
                  setTimeout(() => end_trial(false), 500);
                },
              });
            }
          };

           
    var display_stimuli = function () {
      kill_timers();
      kill_listeners();
      draw();
      start_response_listener();
  
      if (trial.timing_response > 0) {
        var response_timer = setTimeout(function () {
          kill_listeners();
          setTimeout(() => end_trial(true), 1000);
        }, trial.timing_response);
         setTimeoutHandlers.push(response_timer);
      }
    };
    

    var end_trial = function () {
      if(trial.doEyeTracking) {
        webgazer.pause();
        clearInterval(eye_tracking_interval);
      }
     



      // data saving
      var trial_data = {
        "rt": response.rt,
        "key_press": response.key,
        "choices": JSON.stringify(trial.choices),
        "stimulus":trial.stimulus.index,
        "stimulus_label": trial.stimulus.label,
        "chosen_area": chosen_area,
        "correct":   correct  ,
        "eyeData": JSON.stringify(eyeData) 
      };
      	//Remove the canvas as the child of the display_element element
			display_element.innerHTML='';
			
			//Restore the settings to JsPsych defaults
			body.style.margin = originalMargin;
			body.style.padding = originalPadding;
      body.style.backgroundColor = originalBackgroundColor
      

      // console.log(trial_data);
      jsPsych.finishTrial(trial_data);
    };

    var eyeData = {history:[]};
    display_stimuli();
    if(trial.doEyeTracking) {
      webgazer.resume();
    webgazer.showVideo(false);
    webgazer.showFaceOverlay(false);
    webgazer.showFaceFeedbackBox(false);
    var starttime = performance.now();
    var eye_tracking_interval = setInterval(
      function() {
        var pos = webgazer.getCurrentPrediction();
        if (pos) {

          var relativePosX = pos.x/screen.width ;
          var relativePosY = pos.y/screen.height;
          var relativePosX2= pos.x/innerWidth ;
          var relativePosY2 = pos.y/innerHeight;
          eyeData.history.push({
           // 'x': pos.x,
          //  'y': pos.y,
            'relative-x': relativePosX,
            'relative-y': relativePosY,
            'relative-x2': relativePosX2,
            'relative-y2': relativePosY2,
            'elapse-time': performance.now() - starttime
          });
        }
      },1);
    }
     
    };
  
    return plugin;
  })();
  