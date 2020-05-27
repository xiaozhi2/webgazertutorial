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
          }

          }    
      } 
  
    plugin.trial = function(display_element, trial) {
        //Note on '||' logical operator: If the first option is 'undefined', it evalutes to 'false' and the second option is returned as the assignment
        var setTimeoutHandlers = [];
        trial.choice1_o = trial.stimulus.out1 ||[];
        trial.choice1_p = trial.stimulus.prob1 ||[];
        trial.choice2_o = trial.stimulus.out2 ||[];
        trial.choice2_p = trial.stimulus.prob2 ||[];
        trial.choice3_o = trial.stimulus.out3 ||[];
        trial.choice3_p = trial.stimulus.prob3||[];
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
             ctx.beginPath();
             ctx.strokeStyle = "grey";
             ctx.rect((7/16)*canvasWidth, (1/64)*canvasHeight,(1/8)*canvasWidth,(1/16)*canvasHeight);
             ctx.rect((6/16)*canvasWidth, (1/256)*canvasHeight,(16/64)*canvasWidth,(24/64)*canvasHeight);
             ctx.fillStyle = "grey";
             ctx.fillRect((7/16)*canvasWidth, (1/64)*canvasHeight,(1/8)*canvasWidth*trial.choice1_p,(1/16)*canvasHeight);
             ctx.stroke();
             ctx.font = "35px Comic Sans MS";
             ctx.fillText("$" + trial.choice1_o,(15/32)*canvasWidth,(23/64)*canvasHeight);
             ctx.strokeStyle = "grey";


             ctx.beginPath();
             ctx.strokeStyle = "grey";
             ctx.rect((3/16-6/64)*canvasWidth, (1/64 +39/64)*canvasHeight,(1/8)*canvasWidth,(1/16)*canvasHeight);
             ctx.rect((2/16-6/64)*canvasWidth, (1/256 +39/64)*canvasHeight,(16/64)*canvasWidth,(24/64)*canvasHeight);
             ctx.fillStyle = "grey";
             ctx.fillRect((3/16-6/64)*canvasWidth, (1/64 + 39/64)*canvasHeight,(1/8)*canvasWidth*trial.choice2_p,(1/16)*canvasHeight);
             ctx.stroke();
             ctx.font = "35px Comic Sans MS";
             ctx.fillText("$" + trial.choice2_o,(7/32-6/64)*canvasWidth,(23/64 +39/64)*canvasHeight);
             ctx.strokeStyle = "grey";


             ctx.beginPath();
             ctx.strokeStyle = "grey";
             ctx.rect((3/16 + 1/2 + 6/64)*canvasWidth, (1/64 +39/64)*canvasHeight,(1/8)*canvasWidth,(1/16)*canvasHeight);
             ctx.rect((2/16 + 1/2+ 6/64)*canvasWidth, (1/256 +39/64)*canvasHeight,(16/64)*canvasWidth,(24/64)*canvasHeight);
             ctx.fillStyle = "grey";
             ctx.fillRect((3/16 + 1/2+ 6/64)*canvasWidth, (1/64 +39/64)*canvasHeight,(1/8)*canvasWidth*trial.choice3_p,(1/16)*canvasHeight);
             ctx.stroke();
             ctx.font = "35px Comic Sans MS";
             ctx.fillText("$" + trial.choice3_o,(7/32 +1/2+ 6/64)*canvasWidth,(23/64 +39/64)*canvasHeight);
             ctx.strokeStyle = "grey";
        };

        var display_selection = function () {
          var ctx = gambleCanvas.getContext("2d");
          if (response.key == 37) {
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.rect((2/16-6/64)*canvasWidth, (1/256 +39/64)*canvasHeight,(16/64)*canvasWidth,(24/64)*canvasHeight);
            ctx.stroke();
          } if (response.key == 38) {
         
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.rect((6/16)*canvasWidth, (1/256)*canvasHeight,(16/64)*canvasWidth,(24/64)*canvasHeight);
            ctx.stroke();
          } if (response.key == 39){
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.rect((2/16 + 1/2+ 6/64)*canvasWidth, (1/256 +39/64)*canvasHeight,(16/64)*canvasWidth,(24/64)*canvasHeight);
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
    

    var end_trial = function (timeout) {

      webgazer.pause();
      clearInterval(eye_tracking_interval);


      // data saving
      var trial_data = {
        "rt": response.rt,
        "key_press": response.key,
        "choices": trial.choices,
        "stimulus":JSON.stringify(trial.stimulus),
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

    display_stimuli();
    webgazer.resume();
    var eyeData = {history:[]};
    var eye_tracking_interval = setInterval(
      function() {
        var pos = webgazer.getCurrentPrediction();
        if (pos) {
          var relativePosX = pos.x/screen.width ;
          var relativePosY = pos.y/screen.height;
          eyeData.history.push({
            'x': pos.x,
            'y': pos.y,
            'relative-x': relativePosX,
            'relative-y': relativePosY,
          });
        }
      },1);
  
      
    };
  
    return plugin;
  })();
  