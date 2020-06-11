/**************/
/** Constants */
/**************/
const nrating = 7; 
const ntrials = 70;
const nprac = 2;
const fixation_duration = 500;
const nImageInst = 4;

/** load all the images, and remember to preload before starting the egitxperiment */
var instruct_img = [];
for( var i = 0 ; i < nImageInst; i++) {
  instruct_img.push('../img/instruct' + i + '.png');
}


/** Prepare */
//var subject_id = 3412132;
var subject_id = jsPsych.randomization.randomID(15);




//preassign a probability string

/***********************/
/******** Trials *******/
/***********************/


/** full screen */
var fullscreen = {
  type: 'fullscreen',
  message: `<div> Before we begin, please close any unnecessary programs or applications on your computer. <br/>
  This will help make the study run more smoothly.  <br/>
  Also, please close any browser tabs that could produce popups or alerts and interfere with the study.   <br/>
  Finally, once the study has started, <b>DO NOT EXIT</b> fullscreen mode or you will terminate the study and not receive any payment. <br/>   
  <br><br/>
  The experiment will switch to full screen mode when you press the button below.  <br/>
            When you are ready, press the button below to begin.</div>`,
  fullscreen_mode: true,
  on_finish: function() {
    document.body.style.cursor = 'none'
  }
};

var experimentOverview= {
  type: 'html-keyboard-response',
  stimulus: `<div> <font size=120%; font color = 'green';>Experiment Overview </font><br/>
                                       <br><br/>
             In Today's study, you will be making a series of decisions involved rectangles.<br/>
             There will be multiple parts to the study, and you will receive instructions before each new part. <br/>
             The decisions that you make will affect your final earnings, so make sure to pay attention to the instructions. <br/>
                                       <br><br/>
             Keyboard responses will be recorded. Please put your fingers on the keyboard. <br/>
            You will only need to use <b><font color = 'red'>SPACE BAR</font></b> and <b><font color = 'red'>ARROW KEYS</font></b> on your keyboard: <br/>
            <img height="300px" width="1000px" src="${instruct_img[0]}"> <br/>
            <br><br/>
               Please put your fingers to the corresponding positions before proceeding.  <br/>
                                          <br><br/>
                If you are ready, please press the  <b>SPACE BAR</b> to begin</div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
  on_finish: function() {
    document.body.style.cursor = 'none'
  }
}





var choiceInstruction = {
  type: 'html-keyboard-response',
  stimulus: `<div><font size=120%; font color = 'green';> Choice Overview</font><br/>
                                        <br><br/>
  
      
       Each round, you will see three rectangles. For example, you might see the following choice: <br/>

                             <img height="500px" width="800px" src="${instruct_img[1]}"><br/>
                             Each rectangle represents a choice. You should select the rectangle that has the largest area.  <br/>
                             During the experiment, if you decide to choose the rectangle on the lower/left, please press  <b><font color='green'>LEFT ARROW</font></b> key; <br/>
                             If you  decide to choose the rectangle on the upper/middle, please press <b><font color='green'>UP ARROW</font></b>  key;<br/>
                             If you  decide to choose the rectangle on the lower/right, please press <b><font color='green'> RIGHT ARROW</font></b> key. <br/>
                             After each choice, stare at the red circle at the center of the screen.
                                        <br><br/>
                            If you are ready, please press the  <b>SPACE BAR</b> to continue.</div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
  on_finish: function() {
    document.body.style.cursor = 'none'
  }
}


var eyeTrackingInstruction1 = {
  type: 'html-keyboard-response',
  stimulus: `<div> <font size=120%; font color = 'green';>Calibration & Validation </font><br/>
                                             <br><br/>
                Before we begin with the real decisions, we need to turn on and adjust your webcam for eye-tracking.  <br/>
                There are two parts to this process. The first part is calibration,  and the second part is validation.<br/>
                <br><br/>
                During calibration, you will see a series of dots like this <span id="calibration_dot_instruction"></span> appear on the screen, each for 5   seconds.<br/>
                Your task is simply to stare directly at each dot until it disappears.<br/>
                Then, quickly move your eyes to the next dot and repeat.<br/>
                <br><br/>
                Validation is basically the same as calibration. You simply need to stare at each dot until it disappears.<br/>
                During validation, the dot may turn <b><font color='yellow'>yellow</font></b>, indicating that you don’t seem to be staring directly at it.  <br/>
                Try to keep this from happening! 
                <br><br/>
                When you are ready, press the SPACE BAR to continue. </div>`,
                post_trial_gap: 500,
                choices: ['spacebar'],
                
              }


var eyeTrackingInstruction2 = {
  type: 'html-keyboard-response',
  stimulus: `<div><font size=120%; font color = 'green';>Calibration & Validation </font><br/>
                                                            <br><br/>
           When the calibration begins, you will see a video feed with your face at the top left corner of your screen like this:  <br/>
           <br><br/>
           <img height="220px" width="270px" src="${instruct_img[2]}"><br/>
           <br><br/>
           Try to keep your entire face within the box. When your face is in a good position the box will turn <b><font color='green'>green</font></b>. <br/>
           <font size=5px; font color = 'red';> <b>NOTE</b>: the video feed only appears during calibration.</font><br/>
           <br><br/>
           <font size=5px; >When you are ready, press the  <b>SPACE BAR</b> to continue.</font>

           </div>`,
  post_trial_gap: 500,
  choices: ['spacebar'],
              
 }

 var eyeTrackingNote = {

  type: 'html-keyboard-response',
  stimulus: `<div><font size=120%; font color = 'green';> Calibration & Validation Notes</font><br/>
                                                            <br><br/>
            <font size = 5px font color = "yellow">There are several <b>IMPORTANT</b> notes that are useful for passing the calibration task:<br/></font>
            <img height="200px" width="1000px" src="${instruct_img[3]}"><br/>
               <br><br/>
             <div style="text-align-last:left">
             In addition to the notes in the figure: <br/>
            (1). Use your eyes to look around the screen and try to avoid moving your head. <br/>
            (2). Try to keep lights in front of you rather than behind you so that the webcam can clearly see your face. Avoid sitting with a window behind you.  <br/>
            (3). After you have made these adjustments, check again that your face fits nicely within the box on the video feed and that the box is green. <br/></div>
              <br><br/>
             <font size=5px; font color = 'red';> <b>NOTE</b>:  <br/>
             If you are back on this page, it means the calibration and validation did not work as well as we would like.  <br/>
             Please read the notes above again, make any adjustments, and try again.  <br/>
             There are only <b>THREE</b> chances to get this right.  <br/>
             Otherwise, you will terminate the study and receive $1 for the participation. </font><br/>
             <br><br/>
             <font size=5px; >When you are ready, press the <b>SPACE BAR</b> to continue. </font></div>`,
  post_trial_gap: 500,
  choices: ['spacebar'],

 }


//eye tracking parameters
var calibrationMax = 3;
var calibrationAttempt = 0;
var success = false; //update if there's a success
var eye_calibration_state = {
  doInit: true
};

var init_flag = function() {
 if (calibrationAttempt == 0)  {
   return true;
  } else return false;
};

var validationTols = [130,165,200];
var validationAccuracys = [0.8,0.7,0.6];

/** first we need a calibration and validation step before entering into the main choice task */
var inital_eye_calibration = {
  timeline: [
    eyeTrackingNote,
    {
      type: "eye-tracking",
      doInit: () => init_flag(),
      doCalibration: true,
      doValidation: true,
      calibrationDots: 12,
      calibrationDuration:5,
      doValidation: true,
      validationDots: 12,
      validationDuration:3,
      validationTol: validationTols[calibrationAttempt],
     // showPoint: true,
      on_finish: function (data) {
        calibrationAttempt++;
        if (data.accuracy >= validationAccuracys[calibrationAttempt - 1])  success= true;
        if (!success && calibrationAttempt == calibrationMax) {
          jsPsych.endExperiment('We are sorry that eye-calibration failed too many times.The experiment was ended. Thanks for your participation! ');
        }
      } 
    }
  ],
  loop_function: () => (calibrationAttempt < calibrationMax) && (!success),
};


/** practice choice without eye-tracking first  */
var choiceInstructionReinforce = {
  type: 'html-keyboard-response',
  stimulus: `<div><font size=120%; font color = 'green';>Choice Task </font><br/>
                                        <br><br/>
                Success! The calibration and validation was successful.<br/>
                Now, we will begin with the choice task. Please keep your head still, otherwise we may have to redo the calibration and validation.<br/>                               
                There will be a break roughly every ten minutes. During the breaks you can move your head if you need to.  <br/>
                 As a quick reminder, you are choosing the rectangle with the largest area. <br/>
               If you decide to choose the  rectangle on the lower/left, please press  <b><font color='green'>LEFT ARROW</font></b> key. <br/>
               If you  decide to choose the rectangle on the upper/middle, please press <b><font color='green'>UP ARROW</font></b> key.<br/>
               If you  decide to choose the rectangle  on the lower/right, please press <b><font color='green'> RIGHT ARROW</font></b> key.<br/>
               <br><br/>
               Between rounds, make sure to stare at the red dot on the screen until it disappears.<br/>
               This is part of ongoing adjustments to the eye-tracking.  <br/>
               <font size=5px; font color = 'red';> <b>NOTE</b></font>: If the computer thinks that you are looking somewhere other than directly at the red dot, you may need to redo the calibration and validation process, slowing down the study. <br/>
               <br><br/>
               When you are ready, please press the <b>SPACE BAR</b> to begin the practice choice. </div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
}



/** choices */
var fixation1 = {
  type: 'html-keyboard-response',
  stimulus: '<span id="calibration_dot_instruction"></span>',
  choices: jsPsych.NO_KEYS,
  trial_duration: fixation_duration,
};

var thisPrac = practice_stimuli;


var practice_choice_count = 0;
var practice_choice = {
  timeline: [
    fixation1,
    {
      type: "decoy-gamble",
     // stimulus: () => get_multichoice_images(),  //() => multi_choice_images[multi_choice_count],
     stimulus: () => thisPrac[practice_choice_count],
      timing_response: 0,
      doEyeTracking: false,
      on_finish: function() {
        practice_choice_count++,
        document.body.style.cursor = 'none'
      }
    }
  ],
  loop_function: () => practice_choice_count < nprac,
};



var EnterRealChoice = {
  type: 'html-keyboard-response',
  stimulus: `<div><font size=120%; font color = 'green';>Choice Task </font><br/>
                                        <br><br/>
         Now you can move on to the real choices. When you are ready, please press the <b>SPACE BAR</b> to begin the practice choice. </div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
}

///choice stage: use validation as fixation, if validation fail (less than the initally specified accuacy) => add a calibration afterwards. 

var binary_choice_states = {
  //set the default 
  doCalibration: false,
  calibrationDots: 10,
  dovalidation: true,
  validationDots:  2
};

var validate_counter = 0; 
validationAccuracy = 0.6;
function binary_choice_state_logger(finish_data_accuracy) {
   // ...TODO
   if(finish_data_accuracy >= validationAccuracy) {
    binary_choice_states = {
      doCalibration: false,
      dovalidation: true,
      validationDots: 2 },
      validate_counter = 0;
    } if (finish_data_accuracy < validationAccuracy & validate_counter <=2) {
      binary_choice_states = {
        doCalibration: false,
        dovalidation: true,
        validationDots: 2 },
        validate_counter += 1;
    }if (validate_counter ==3) {
      binary_choice_states = {
        //set the default 
        doCalibration: true,
        calibrationDots: 12,
        dovalidation: false,
        }
        validate_counter = 0;
    } 
};

var binary_state_updater =  function() {
  return binary_choice_states ; 
};



/** choices */
var fixation = {
  type:  "eye-tracking",
  doInit: false,
  doCalibration: () =>  binary_state_updater().doCalibration,
  calibrationDots: () =>  binary_state_updater().calibrationDots,
  doValidation: () =>  binary_state_updater().dovalidation,
  validationDots: () =>  binary_state_updater().validationDots,
  validationTol:130,
  validationDuration: 3,
  calibrationDuration: 5,
  on_finish: (data) => binary_choice_state_logger(data.accuracy)
};



var choice_count = 0;
var thisStimuli = utils.shuffle(allstimuli);


var decoy_gamble1 = {
  timeline: [
    fixation,
    {
      type: "decoy-gamble",
     // stimulus: () => get_multichoice_images(),  //() => multi_choice_images[multi_choice_count],
     stimulus: () => thisStimuli[choice_count], 
      timing_response: 0,
      doEyeTracking:false,
      on_finish:() => choice_count++
    }
  ],
  loop_function: () => choice_count < 35,
};



var breaktime = {
  type: "html-keyboard-response",
  stimulus: `<dive>You are halfway done! Now you can take a short break if you want.  You can move your head during the break.</br>
             <br></br>
             When you are ready to continue the study, press the <b>SPACE BAR</b>.</dive>`,
  choices: ['spacebar'],
  on_start: function() {
    webgazer.pause(),
    webgazer.clearData()
  },
  post_trial_gap: 500,
};

var recalibrationInstruction2= {
  type: "html-keyboard-response",
  on_start: () => webgazer.resume(),
  stimulus: `<div>We need to redo the calibration and validation before you return to the study. </br>
   As before, make sure you stare at each dot until it disappears and make sure you don’t move your head.</br>
   <br></br>
   Please press <b>SPACE BAR</b> when you are ready to begin.</div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
};



var recalibration = {
  timeline: [
    recalibrationInstruction2,
    {
      type: "eye-tracking",
      doCalibration: true,
      calibrationDots: 12,
      calibrationDuration:5,
      doValidation: false,
    }
  ],
};



var decoy_gamble2 = {
  timeline: [
    fixation,
    {
      type: "decoy-gamble",
     // stimulus: () => get_multichoice_images(),  //() => multi_choice_images[multi_choice_count],
     stimulus: () => thisStimuli[choice_count], 
      timing_response: 0,
      doEyeTracking:true,
      on_finish:() => choice_count++
    }
  ],
  loop_function: () => choice_count < ntrials,
};



var end = {
  type: "html-keyboard-response",
  stimulus: `<p>You have completed the task. The webcam will be closed when you close our browser. Press any key to exit.</p>`
};




var on_finish_callback = function() {
 // var csv = jsPsych.data.get().csv();
 // var filename = "Webgazeapp.csv";
  //downloadCSV(csv,filename);
  jsPsych.data.displayData();
 //jsPsych.data.get().addToAll({subject: subject_id});
  jsPsych.data.addProperties({
    subject: subject_id,
    interaction: jsPsych.data.getInteractionData().json(),
  });
  var  data = JSON.stringify(jsPsych.data.get().values());
  console.log(data.length/1024/1024 + "Mb") ; 
  $.ajax( {
    type: "POST",
    url: "/",
    data: data,
    contentType: "application/json"
  })
  .done(function() {
  //  alert("your data has been saved!")
  })
  .fail(function() {
  //  alert("problem occured while writing data to box.");
   // var csv = jsPsych.data.get().csv();
   // var filename = jsPsych.data.get().values()[0].subject_id + ".csv";
   // utils.downloadCSV(csv,filename);
  })
}

var trialcounter;
function startExperiment() {
  jsPsych.init({
    timeline: [
      fullscreen, experimentOverview, choiceInstruction,eyeTrackingInstruction1,eyeTrackingInstruction2, 
       inital_eye_calibration,choiceInstructionReinforce ,
       practice_choice ,EnterRealChoice , decoy_gamble1, breaktime,recalibration ,decoy_gamble2, end,
    ],
    on_trial_finish: function() {
      trialcounter = jsPsych.data.get().count();
      if (trialcounter ==20) {
        on_finish_callback();
        jsPsych.data.reset();
      }
    },
    preload_images:[instruct_img],
    on_finish: () => on_finish_callback(),
    on_close:() => on_finish_callback()

  });
};


function saveData() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'write_data.php'); // change 'write_data.php' to point to php script.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      var response = JSON.parse(xhr.responseText);
      console.log(response.success);
    }
  };
  xhr.send(jsPsych.data.get().json());
}

