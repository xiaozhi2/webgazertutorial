/**************/
/** Constants */
/**************/
const nrating = 7; 
const nchoice = 40; //180 trials , 60 every conditions
const ntrials = 40;
const fixation_duration = 500;
const nprac = 2;
const nImageInst = 5;

/** load all the images, and remember to preload before starting the experiment */
var exp_images = [];
for (var i = 0; i < nrating; i++) {
  exp_images.push('../img/charity' + i + '.jpg');
}

/** Prepare */
//var subject_id = 3412132;
var subject_id = jsPsych.randomization.randomID(15);


var instruct_img = [];
for( var i = 0 ; i < nImageInst; i++) {
  instruct_img.push('../img/instruct' + i + '.png');
}






//preassign a probability string

/***********************/
/******** Trials *******/
/***********************/


/** full screen */
var fullscreen = {
  type: 'fullscreen',
  fullscreen_mode: true,
  on_finish: function() {
    document.body.style.cursor = 'none'
  }
};

var experimentOverview= {
  type: 'html-keyboard-response',
  stimulus: `<div> <font size=120%; font color = 'green';>Experiment Overview </font><br/>
                                       <br><br/>
             In Today's experiment, you will make a series of choices involved gambles.<br/>
             Your webcam will be initiated during the choice task for tracking your eye movements. <br/>
             Please follow the instruction as you proceed the experiment. <br/>
             Please also <b>DO NOT EXIT</b> the fullscreen mode during the experiment. <br/>
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

/** practice choice without eye-tracking first  */
var gambleInstruction = {
  type: 'html-keyboard-response',
  stimulus: `<div><font size=120%; font color = 'green';>Gambling Choice </font><br/>
                                        <br><br/>
           Each round, you will see three gambles. For example, you might see the following choice: <br/>
                             <img height="500px" width="800px" src="${instruct_img[1]}"><br/>
                             Each square represents a choice. The column bar in each square indicates the probability of getting the corresponding amount below.  <br/>
                             So, if you decide to choose the lower left choice, you would have a 70% chance to win $10 extra dollars at the end of the experiment.</br>
                             <b><font color = 'red'>NOTE</font></b>: The probability will  <font color='green'>NOT</font> be visible in the actual task. </br>
                                        <br><br/>
                            If you are ready, please press the  <b>SPACE BAR</b> to begin.</div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
  on_finish: function() {
    document.body.style.cursor = 'none'
  }
}


/** practice choice without eye-tracking first  */
var keyInstruction = {
  type: 'html-keyboard-response',
  stimulus: `<div><font size=120%; font color = 'green';>Gambling Choice </font><br/>
                                        <br><br/>
                  <img height="500px" width="800px" src="${instruct_img[2]}"><br/>
                  During the experiment, if you decide to choose the choice on the lower/left, please press  <b><font color='green'>LEFT ARROW</font></b> key; <br/>
                  If you  decide to choose the choice on the upper/middle, please press <b><font color='green'>UP ARROW</font></b>  key;<br/>
                  If you  decide to choose the choice on the lower/right, please press <b><font color='green'> RIGHT ARROW</font></b>  key;<br/>
                  <br><br/>
                  After each choice, look at the "fixation" symbol in the center of the screen. 
                                               <br><br/>
                            If you are ready, please press the <b>SPACE BAR</b> to begin the practice</div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
  on_finish: function() {
    document.body.style.cursor = 'none'
  }
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










var get_choice_images = function() {
  //console.log(jsPsych.data.get());
 // var Combinatorics = require('js-combinatorics');
  var allcom = Combinatorics.combination(exp_images, 2);
  var multi_choice_temp = []
  while(temp = allcom.next()) {
      multi_choice_temp.push(jsPsych.randomization.shuffle(temp)); // do you want to do diagonal larger rating but another diagonal smaller rating?
  }
  if (multi_choice_temp.length < nchoice) {
    return utils.getRandomSample(multi_choice_temp, multi_choice_temp.length);
  } else {
    return utils.getRandomSample(multi_choice_temp, nchoice);
  }
};




var eyeTrackingInstruction1 = {
  type: 'html-keyboard-response',
  stimulus: `<div> <font size=120%; font color = 'green';>Eye Tracking Overview </font><br/>
                                             <br><br/>
                Before you enter into the real task, you webcam will be initiated. You have to pass the eye-tracking calibration task to enter into the real choice task.<br/>
                When the eye-calibration starts, you will see a video feed with your face at the left corner like this:<br/>
                                          <br><br/>
                <img height="180px" width="220px" src="${instruct_img[3]}"><br/>
                In the video feed, gaze tracker tries to find your face with it's predicition <b><font color='green'>in green</font></b>.<br/>
                On top of the video feed is the suggested box for your face to be in for the best prediciton. <br/>
                If it turns into <b><font color='green'>green</font></b>, the prediciton will be more accurate. <br/>
                <br><br/>
                <b><font color='green'>NOTE</font></b>: the video feed will be removed after the calibration.
                <br><br/>
                If you understand how the gaze tracker works, press the  <b>SPACE BAR</b> to continue. </div>`,
                post_trial_gap: 500,
                choices: ['spacebar'],
                
              
              }


var eyeTrackingInstruction2 = {
  type: 'html-keyboard-response',
  stimulus: `<div><font size=120%; font color = 'green';>Eye Calibration Task </font><br/>
                                              <br><br/>
                During the eye calibration, you will see a dot like this <span id="calibration_dot_instruction"></span> appear on the screen for seconds and follow by another dot. Your task is to gaze at the dot. 
                <br><br/>
                <font size = 5px font color = "yellow">There are several <b>IMPORTANT</b> notes that are useful for passing the calibration task:<br/></font>
                <img height="200px" width="1000px" src="${instruct_img[4]}"><br/>
                <br><br/>
                <div style="text-align-last:left">
                (1). Use your eyes to look and AVOID moving your head. If you move too much, the calibration can fail. <br/>
                (2). Adjust your enviroment illumination. Your performance may get better when you sit in a place WITHOUT direct daylight. <br/>
                (3). Adjust the distance between your eyes and your screen. Make sure your face is well-captured by the face overlay in the video feed. <br/></div>
                <br><br/>
                <font size=5px; font color = 'red';> <b>NOTE</b>: If you are back in this page, it means you need to re-calibrate. Only <b>THREE</b> attempts are allowed for the calibration task. </font><br/>
                <br><br/>
                <font size=5px; >If you are ready, press the  <b>SPACE BAR</b> to continue. </font></div>`,
  post_trial_gap: 500,
  choices: ['spacebar'],

}



//eye tracking parameters
var calibrationMax = 3;
var calibrationAttempt = 0;
var validationAccuracy = 0.75;
var calibration_state = false; //update if there's a success

var eye_calibration_state = {
  doInit: true
};

var init_flag = function() {
 if (calibrationAttempt == 0)  {
   return true;
  } else return false;
};



/** first we need a calibration and validation step before entering into the main choice task */
var inital_eye_calibration = {
  timeline: [
    eyeTrackingInstruction2,
    {
      type: "eye-tracking",
      doInit: () => init_flag(),
      doCalibration: true,
      doValidation: true,
      calibrationDots: 12,
      calibrationDuration:5,
      doValidation: true,
      validationDots: 10,
      validationDuration:3,
     // showPoint: true,
      on_finish: function (data) {
        calibrationAttempt++;
        if (data.accuracy >= validationAccuracy)  calibration_state = true;
        if (!calibration_state && calibrationAttempt == calibrationMax) {
          jsPsych.endExperiment('We are sorry that eye-calibration failed too many times.The experiment was ended. Thanks for your participation! ');
        }
      } 
    }
  ],
  loop_function: () => (calibrationAttempt < calibrationMax) && (!calibration_state),
};

///choice stage: use validation as fixation, if validation fail (less than the initally specified accuacy) => add a calibration afterwards. 

var binary_choice_states = {
  //set the default 
  doCalibration: false,
  calibrationDots: 10,
  dovalidation: true,
  validationDots:  2
};

function binary_choice_state_logger(finish_data_accuracy) {
   // ...TODO
   if(finish_data_accuracy >= validationAccuracy) {
    binary_choice_states = {
      doCalibration: false,
      dovalidation: true,
      validationDots: 2 }
    } else {
     binary_choice_states = {
      //set the default 
      doCalibration: true,
      calibrationDots: 8,
      dovalidation: false,
    };
   };
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
  validationTol:220,
  validationDuration: 2,
  calibrationDuration: 5,
  on_finish: (data) => binary_choice_state_logger(data.accuracy)
};




/** practice choice without eye-tracking first  */
var choiceInstruction = {
  type: 'html-keyboard-response',
  stimulus: `<div><font size=120%; font color = 'green';>Gambling Choice Task </font><br/>
                                        <br><br/>
                   You have passed the eye calibration task! Now, you are going to the choice task. Please do not move your head and follow the notes in the previous task.
                   You will have time to break during the experiment, you can move your head during the break.<br/>
                   To recall, this is one of the choice you did in the practice task: <br/>
                  <img height="500px" width="800px" src="${instruct_img[2]}"><br/>
                  If you decide to choose the choice on the lower/left, please press  <b><font color='green'>LEFT ARROW</font></b> key; <br/>
                  If you  decide to choose the choice on the upper/middle, please press <b><font color='green'>UP ARROW</font></b>  key;<br/>
                  If you  decide to choose the choice on the lower/right, please press <b><font color='green'> RIGHT ARROW</font></b>  key;<br/>
                  <br><br/>
                  Before each choice, please gaze at the dot symbols on screen. 
                  <font size=5px; font color = 'red';> <b>NOTE</b></font>: The gazing results will be used as a measure of your eye-tracking data quality and determines how long your experiment will last. </br>
                                               <br><br/>
                            If you are ready, please press the <b>SPACE BAR</b> to begin the practice choice</div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
}




var choice_count = 0;
var binary_choice = {
  timeline: [
    fixation,
    {
      type: "binary-choice",
     // stimulus: () => get_multichoice_images(),  //() => multi_choice_images[multi_choice_count],
     stimulus: () => get_choice_images()[choice_count], 
     choices: ["F", "J"],
      timing_response: 0,
      on_finish:() => choice_count++
    }
  ],
  loop_function: () => choice_count < ntrials,
};


var thisStimuli = utils.shuffle(allstimuli);
console.log(thisStimuli[0]);




var decoy_gamble1 = {
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
  loop_function: () => choice_count < 20,
};



var breaktime = {
  type: "html-keyboard-response",
  stimulus: `<p>You now have time to take a break. You can move your head during the break. Please press SPACE BAR when you are ready to proceed.</p>`,
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
  stimulus: `<p>Before you return to the task, you need to recalibration your eyes. Please make sure you follow the red dots and not move your head. Please press SPACE BAR when you are ready to proceed.</p>`,
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
  stimulus: `<p>You have completed the task. Press any key to exit.</p>`
};




var on_finish_callback = function() {
 // var csv = jsPsych.data.get().csv();
 // var filename = "Webgazeapp.csv";
  //downloadCSV(csv,filename);
  //jsPsych.data.displayData();
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
       fullscreen,
       experimentOverview,
       gambleInstruction,
       keyInstruction,
       practice_choice,
       eyeTrackingInstruction1,
      inital_eye_calibration,
     choiceInstruction,
     // binary_choice,
     decoy_gamble1,
     breaktime,
     recalibration,
     decoy_gamble2,
      end,
    ],
    on_trial_finish: function() {
      trialcounter = jsPsych.data.get().count();
      console.log(JSON.parse(jsPsych.data.get().json()));
      if (trialcounter ==20) {
        on_finish_callback();
        jsPsych.data.reset();
      }
    },
    preload_images:[exp_images,instruct_img],
    on_finish: () => on_finish_callback(),
    on_close:() => on_finish_callback()

  });
};





// Usage: download('test.txt', 'Hello world!');
// function download(filename, text) {
//   var element = document.createElement('a');
//   element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
//   element.setAttribute('download', filename);

//   element.style.display = 'none';
//   document.body.appendChild(element);

//   element.click();

//   document.body.removeChild(element);
// }



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

