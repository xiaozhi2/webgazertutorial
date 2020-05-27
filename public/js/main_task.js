/**************/
/** Constants */
/**************/
const nrating = 7; 
const nchoice = 5; //180 trials , 60 every conditions
const ntrials = 5;
const fixation_duration = 500;


/** load all the images, and remember to preload before starting the experiment */
var exp_images = [];
for (var i = 0; i < nrating; i++) {
  exp_images.push('../img/charity' + i + '.jpg');
}

/** Prepare */
var subject_id = 3412132;
//jsPsych.randomization.randomID(1);
//var condition_assignment = jsPsych.randomization.sampleWithoutReplacement(['conditionA', 'conditionB', 'conditionC'], 1)[0];
jsPsych.data.addProperties({
  subject: subject_id,
 // condition: condition_assignment
});




//preassign a probability string

/***********************/
/******** Trials *******/
/***********************/


/** full screen */
var fullscreen = {
  type: 'fullscreen',
  fullscreen_mode: true,
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

instuct_img = "../img/instruct_eye.png";


var eyeTrackingInstruction = {
  type: 'html-keyboard-response',
  stimulus: `<div> In today's experiment, you will be eye-tracked. Please see the instruction below. If you are back in this page, it means you need to re-calibrate.
            <br><img height="300px" width="1000px" src="${instuct_img}"><br/>  Press any key to start.</div>`,
  post_trial_gap: 500,

}

//eye tracking parameters
var calibrationMax = 3;
var calibrationAttempt = 0;
var validationAccuracy = 0.7;
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
    eyeTrackingInstruction,
    {
      type: "eye-tracking",
      doInit: () => init_flag(),
      doCalibration: true,
      doValidation: true,
      calibrationDots: 10,
      calibrationDuration:8,
      doValidation: true,
      validationDots: 5,
      validationDuration:3,
      on_finish: function (data) {
        calibrationAttempt++;
        if (data.accuracy >= validationAccuracy)  calibration_state = true;
        if (!calibration_state && calibrationAttempt == calibrationMax) {
          jsPsych.endExperiment('The experiment was ended. Eye-tracking failed too many times.');
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
  validationTol:300,
  validationDuration: 1,
  calibrationDuration: 1,
  on_finish: (data) => binary_choice_state_logger(data.accuracy)
};



var choiceInstruction = {
  type: 'html-keyboard-response',
  stimulus: `<div> Now you are going to the choice task
            <br><br/>  Press any key to start.</div>`,
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




var decoy_gamble = {
  timeline: [
    fixation,
    {
      type: "decoy-gamble",
     // stimulus: () => get_multichoice_images(),  //() => multi_choice_images[multi_choice_count],
     stimulus: () => thisStimuli[choice_count], 
      timing_response: 0,
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
  jsPsych.data.displayData();
  $.ajax( {
    type: "POST",
    url: "/experiment-data",
    data:JSON.stringify(jsPsych.data.get().values()),
    contentType: "application/json"
  })
  .done(function() {
    alert("your data has been saved!")
  })
  .fail(function() {
    alert("problem occured while writing data to box.");
    var csv = jsPsych.data.get().csv();
    var filename = jsPsych.data.get().values()[0].subject_id + ".csv";
    utils.downloadCSV(csv,filename);
  })
}


function startExperiment() {
  jsPsych.init({
    timeline: [
       fullscreen,
     // instructions,
      inital_eye_calibration,
      choiceInstruction,
     // binary_choice,
     decoy_gamble,
      end
    ],
    preload_images:[exp_images,instuct_img],
    on_finish: () => on_finish_callback()
    //on_finish: saveData,

   //on_finish: () => jsPsych.data.displayData('csv'),
   // on_close: () => save_data_to_server(jsPsych.data.get().json())
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

