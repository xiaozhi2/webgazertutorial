/**************/
/** Constants */
/**************/
const nrating = 8;
const nchoices = 10;
const fixation_duration = 500;
const nprac = 3;
const nImageInst = 2;
const debugModeCaliDot = 1;
const realCaliDot = 12;


var subject_id = jsPsych.randomization.randomID(15);

/** load all the images, and remember to preload before starting the experiment */
var exp_images = [];
for (var i = 0; i < nrating; i++) {
  exp_images.push('../img/charityStimuli/charityStimulus_' + i + '.jpg');
}

var slideshow_images = [];
for (var i = 0; i < nrating; i++) {
  slideshow_images.push('../img/charitySlide/charitySlide_' + i + '.jpg');
}



/** load all the images, and remember to preload before starting the egitxperiment */
var instruct_img = [];
for (var i = 0; i < nImageInst; i++) {
  instruct_img.push('../img/instruct' + i + '.png');
}

var quiz_img = [];
for (var i = 1; i <= 5; i++) {
  quiz_img.push('../img/quizImg/quiz' + i + '.jpg');
}



var charity_choice_images = []; // one-d array
var charity_choice_images_zero = []

var get_prac_images = function () {
  var allcom = Combinatorics.combination(exp_images, 2);
  var multi_choice_temp = []
  while (temp = allcom.next()) {
    multi_choice_temp.push(jsPsych.randomization.shuffle(temp));
  }
  return utils.getRandomSample(multi_choice_temp, 3);

};

var get_multichoice_images = function () {
  var allcom = Combinatorics.combination(charity_choice_images, 2);
  var allcom_zero = Combinatorics.combination(charity_choice_images_zero, 2);
  var multi_choice_temp = []
  var multi_choice_temp_zero = []
  while (temp = allcom.next()) {
    multi_choice_temp.push(jsPsych.randomization.shuffle(temp));
  }
  while (temp = allcom_zero.next()) {
    multi_choice_temp_zero.push(jsPsych.randomization.shuffle(temp));
  }
  if (multi_choice_temp.length < nchoices) {
    if (multi_choice_temp_zero.length < nchoices) {
      return utils.getRandomSample(multi_choice_temp_zero, multi_choice_temp_zero.length);
    }
    return utils.getRandomSample(multi_choice_temp_zero, nchoices);
  } else {
    return utils.getRandomSample(multi_choice_temp, nchoices);
  }
};


//preassign a probability string

/***********************/
/******** Trials *******/
/***********************/

/** full screen */
var fullscreenEnter = {
  type: 'fullscreen',
  message: `<div> Before we begin, please close any unnecessary programs or applications on your computer. <br/>
  This will help make the study run more smoothly.  <br/>
  Also, please close any browser tabs that could produce popups or alerts and interfere with the study.   <br/>
  Finally, once the study has started, <b>DO NOT EXIT</b> fullscreen mode or you will terminate the study and not receive any payment. <br/>   
  <br><br/>
  The study will switch to full screen mode when you press the button below.  <br/>
            When you are ready, press the button below to begin.</div>`,
  fullscreen_mode: true,
  on_finish: function () {
    document.body.style.cursor = 'none'
  }
};


var eyeTrackingInstruction1 = {
  type: 'html-keyboard-response',
  stimulus: `<div> <font size=120%; font color = 'green';>Calibration & Validation </font><br/>
                                             <br><br/>
                Before we begin with the study, we need to turn on and adjust your webcam for eye-tracking.  <br/>
                There are two parts to this process. The first part is calibration and the second part is validation.<br/>
                <br><br/>
                During calibration, you will see a series of dots like this <span id="calibration_dot_instruction"></span> appear on the screen, each for 5 seconds.<br/>
                Your task is simply to stare directly at each dot until it disappears.<br/>
                Then, quickly move your eyes to the next dot and repeat.<br/>
                <br><br/>
                Validation is basically the same as calibration. You simply need to stare at each dot until it turns <b><font color='green'>green</font></b> and disappears.<br/>
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
         <img height="220px" width="270px" src="${instruct_img[0]}"><br/>
       <br><br/>
                         Try to keep your entire face within the box. When your face is in a good position, the box will turn <b><font color='green'>green</font></b>. <br/>
                         <font size=5px; font color = 'red';> <b>NOTE</b>: the video feed only appears during calibration.</font><br/>
                         <br><br/>
                         <font size=5px; >When you are ready, press the  <b>SPACE BAR</b> to continue.</font>
              
                         </div>`,
  post_trial_gap: 500,
  choices: ['spacebar'],

}

var eyeTrackingNote = {

  type: 'html-keyboard-response',
  stimulus: `<div><font size=120%; font color = 'green';> Calibration & Validation</font><br/>
                                                                          <br><br/>
             <font size = 5px font color = "yellow">There are several <b>IMPORTANT</b> notes that are useful for passing the calibration task:<br/></font>
             <img height="200px" width="1000px" src="${instruct_img[1]}"><br/>
             <br><br/>
             <div style="text-align-last:left">
            In addition to the tips in the figure: <br/>
            (1). Use your eyes to look around the screen and try to avoid moving your head. <br/>
            (2). Try to keep lights in front of you rather than behind you so that the webcam can clearly see your face. Avoid sitting with a window behind you.  <br/>
            (3). After you have made these adjustments, check again that your face fits nicely within the box on the video feed and that the box is green. <br/></div>
             <br><br/>
             <font size=5px; font color = 'red';> <b>NOTE</b>:  <br/>
            If you are back on this page, it means the calibration and validation did not work as well as we would like.  <br/>
            Please read the notes above again, make any adjustments, and try again.  <br/>
            There are only <b>THREE</b> chances to get this right.  <br/>
            Otherwise, you will terminate the study and receive 25 cents for the participation. </font><br/>
            <br><br/>
             <font size=5px; >When you are ready, press the <b>SPACE BAR</b> to bring up the video feed and make these adjustments. </font></div>`,
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

var init_flag = function () {
  if (calibrationAttempt == 0) {
    return true;
  } else return false;
};

var validationTols = [130, 165, 200];
var validationAccuracys = [0.8, 0.7, 0.6];

/** first we need a calibration and validation step before entering into the main choice task */
var inital_eye_calibration = {
  timeline: [
    eyeTrackingNote,
    {
      type: "eye-tracking",
      doInit: () => init_flag(),
      doCalibration: true,
      doValidation: true,
      calibrationDots: debugModeCaliDot, // change to 12
      calibrationDuration: 5, //change to 5
      doValidation: true,
      validationDots: debugModeCaliDot, //change to 12
      validationDuration: 3,
      validationTol: validationTols[calibrationAttempt],
      // showPoint: true,
      on_finish: function (data) {
        calibrationAttempt++;
        if (data.accuracy >= validationAccuracys[calibrationAttempt - 1]) success = true;
        if (!success && calibrationAttempt == calibrationMax) {
          jsPsych.endExperiment('We are sorry that eye-calibration failed too many times.The experiment was ended. Thanks for your participation! ');
        }
      }
    }
  ],
  loop_function: () => (calibrationAttempt < calibrationMax) && (!success),
};




var experimentOverview = {
  type: 'html-keyboard-response',
  on_start: function () {
    webgazer.pause(),
      webgazer.clearData()
  },
  stimulus: `<div> <font size=120%; font color = 'green';>Experiment Overview </font><br/>
                                                     <br><br/>
                          Success! The calibration and validation was successful. Now, we will begin with the study. 
                          In Today's study, you will be making a series of decisions about donating to charities. <br/>
                          There will be multiple parts to the study, and you will receive instructions before each new part. <br/>
                          The decisions that you make will affect your final earnings, so make sure to pay attention to the instructions. <br/>
                          At the end of the study, we will randomly select one of your decisions and carry it out. <br/>   
                          So, you should treat every decision as if it is the only one that counts. <br/>
                          In addition to the randomly selected donation, you will also earn a fixed fee of $3 for completing the study. <br/>
                                                        <br><br/>
                          When you are ready, press the  <b>SPACE BAR</b> to continue</div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
}


/** image slide show */


var slideshowOverview = {
  type: 'html-keyboard-response',
  stimulus: `<div> <font size=120%; font color = 'green';>Charity Overview </font><br/>
                                       <br><br/>
             In this part of the study, you will see all the charities for which you will make donation decisions.<br/>
             There will be a short description of each charity's mission. <br/>
             Each charity will only be displayed for 3 seconds. <br/>
             At the end of the study there will be a short quiz about some of these charities. Each correct answer will earn you an 10 cents bonus. <br/>
                                          <br><br/>
             When you are ready, press the  <b>SPACE BAR</b> to start viewing the charities.</div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
}

charity_show_images = jsPsych.randomization.shuffle(slideshow_images);
charity_show_duration = 3000;


/** slide show images  */
var charity_show = {
  type: 'image-keyboard-response',
  timeline: charity_show_images.map(img => ({
    stimulus: img
  })),
  choices: jsPsych.NO_KEYS,
  trial_duration: charity_show_duration,
};


/** willingness to donate rating */
var ratingOverview = {
  type: 'html-keyboard-response',
  on_start:   () => document.body.style.cursor = 'pointer',
  stimulus: `<div> <font size=120%; font color = 'green';>Willingness to Donate</font><br/>
                                       <br><br/>
             Now, you will make decisions about each charity one by one. <br/> 
             For each charity, you have a budget of $5 that you can use to donate to that charity.<br/>
             Click on the scale to indicate how much of your $5 you want to donate to the charity. <br/> 
             If you dislike a charity and would not want them to receive any money, even if it did not cost you anything, then click <b><font color = 'green'>DISLIKE</font></b>. <br/> 
             <br><br/>
        
             Remember, <b><font color = 'red'>only one decision will be selected</font></b> for payment in the end, so you should treat every decision as if it is the only one that counts.  <br/> 
             In other words, you do not need to spread out your money across charities.  <br/> 
             For each charity you can donate anything from $0 to $5, regardless of what you chose for the other charities.<br/> 
                                          <br><br/>
            When you are ready, press the  <b>SPACE BAR</b> to start.  </div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

ratings_images = jsPsych.randomization.shuffle(exp_images);
var ratings = {
  type: 'image-slider-response',
  timeline: ratings_images.map(img => ({
    stimulus: img
  })),
  labels: ['0', '1', '2', '3', '4', '5'],
  min: 0,
  max: 5,
  start: () => getRandomInt(0, 5),
  require_movement: false,
  // prompt: '<p>Willingness to donate.</p>',
  slider_width: 500,
  response_ends_trial: true,
  on_finish: (data) => {
    if (data.rating > 0) {
      charity_choice_images.push(data.stimulus);
    }
    if (data.rating >= 0) {
      charity_choice_images_zero.push(data.stimulus);
    }
    if (jsPsych.data.get().count() == nrating + 1) {
      multichoice_images = get_multichoice_images();
    }
  }
};



var choiceOverview = {
  type: 'html-keyboard-response',
  stimulus: `<div><font size=120%; font color = 'green';>Donating Preference </font><br/>
                                        <br><br/>
           In this part of the study you will be choosing between possible donations. <br/>    
           Each round, you will see two charities on the screen. You have to choose which charity you prefer to donate to. <br/>    
           To select the left charity, please <b><font color='green'>F</font></b> key. <br/>
           To select the right charity, please press  <b><font color='green'>J</font></b> key. <br/>
           After each choice, make sure to stare at the red circles that will appear on the screen, until they disappear. <br/>
           If one of these rounds is randomly selected for payment, then we will implement your decision from that round and send the money to that charity.  <br/>
           Again, you should treat each decision as if it is the only that counts. <br/>
           <br><br/>
           When you are ready, press the  <b>SPACE BAR</b> to continue.  </div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
  on_finish: () => document.body.style.cursor = 'none'
}


var recalibrationInstruction = {
  type: "html-keyboard-response",
  on_start: function ()  {
    webgazer.resume(),
   document.body.style.cursor = 'none'
  },
  stimulus: `<div>We need to redo the calibration and validation before you begin with the choice task. </br>
   As before, make sure you stare at each dot until it disappears and make sure you don’t move your head.</br>
   <br></br>
   Please press <b>SPACE BAR</b> when you are ready to begin.</div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
};

var recalibration = {
  timeline: [
    recalibrationInstruction,
    {
      type: "eye-tracking",
      doCalibration: true,
      calibrationDots: debugModeCaliDot, // change to 12
      calibrationDuration: 5,
      doValidation: true,
      validationDots: debugModeCaliDot,// change to 12
      validationDuration: 3,
      validationTol: 200
    }
  ],
};



var choiceInstructionReinforce = {
  type: 'html-keyboard-response',
  stimulus: `<div><font size=120%; font color = 'green';>Donating Preference</font><br/>
                                        <br><br/>
       Now, we will begin with the choice task. Please keep your head still, otherwise we may have to redo the calibration and validation.<br/>
       There will be a break halfway. During the break, you can move your head if you need to.  <br/>
       As a quick reminder, you are choosing which charity to donate to: <br/>
       If you want to donate to the left charity,  please press  <b><font color='green'>F</font></b> key; <br/>
       If you want to donate to the right charity,  please press <b><font color='green'>J</font></b>  key;<br/>
                  <br><br/>
       After each choice, make sure to stare at the red circles that will appear on the screen, until they disappear.  <br/>
       This is part of ongoing adjustments to the eye-tracking.  <br/>
       <br><br/>
       NOTE: If the computer thinks that you are looking somewhere other than directly at the red dot,  <br/>
       you may need to redo the calibration and validation process, slowing down the study.  <br/>
                                               <br><br/>
      Before the real decisions, there will be 3 practice rounds. <br/>
      When you are ready, press the <b>SPACE BAR</b> to begin with a couple of practice rounds. </div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
}


/** practice choices */
var fixation1 = {
  type: 'html-keyboard-response',
  on_start: () => document.body.style.cursor = 'none',
  stimulus: '<span id="calibration_dot_instruction"></span>',
  choices: jsPsych.NO_KEYS,
  trial_duration: fixation_duration,
};

var validationTols = [130, 165, 200];
var validationAccuracys = [0, 0.7, 0.6];//change to 0.8

var charity_prac_choice_count = 0;
var charity_prac_choice = {
  timeline: [
    fixation1,
    {
      type: "binary-choice",
      stimulus: () => get_prac_images()[charity_prac_choice_count],
      choices: ["F", "J"],
      on_finish: () => charity_prac_choice_count++,
    }
  ],
  loop_function: () => charity_prac_choice_count < 3,
};

var EnterRealChoice = {
  type: 'html-keyboard-response',
  stimulus: `<div> Now you can move on to the real choices. When you are ready, please press the <b>SPACE BAR</b> to begin.</div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
}






var binary_choice_states = {
  //set the default 
  doCalibration: false,
  calibrationDots: 10,
  dovalidation: true,
  validationDots: 2
};

var validate_counter = 0;
validationAccuracy = 0.6;

function binary_choice_state_logger(finish_data_accuracy) {
  // ...TODO
  if (finish_data_accuracy >= validationAccuracy) {
    binary_choice_states = {
        doCalibration: false,
        dovalidation: true,
        validationDots: 2
      },
      validate_counter = 0;
  }
  if (finish_data_accuracy < validationAccuracy & validate_counter <= 2) {
    binary_choice_states = {
        doCalibration: false,
        dovalidation: true,
        validationDots: 2
      },
      validate_counter += 1;
  }
  if (validate_counter == 3) {
    binary_choice_states = {
      //set the default 
      doCalibration: true,
      calibrationDots: 12, ///change to 12
      dovalidation: false,
    }
    validate_counter = 0;
  }
};

var binary_state_updater = function () {
  return binary_choice_states;
};




/** choices */
var fixation = {
  type: "eye-tracking",
  doInit: false,
  doCalibration: () => binary_state_updater().doCalibration,
  calibrationDots: () => binary_state_updater().calibrationDots,
  doValidation: () => binary_state_updater().dovalidation,
  validationDots: () => binary_state_updater().validationDots,
  validationTol: 130,
  validationDuration: 3,
  calibrationDuration: 5,
  on_finish: (data) => binary_choice_state_logger(data.accuracy)
};




/** real choice task */
var charity_choice_count = 0;
var charity_choice1 = {
  timeline: [
    fixation1, //change to fixation
    {
      type: "binary-choice",
      stimulus: () => get_multichoice_images()[charity_choice_count],
      choices: ["F", "J"],
      on_finish: () => charity_choice_count++,
    }
  ],
  loop_function: () => charity_choice_count < get_multichoice_images().length / 2,

};


var breaktime = {
  type: "html-keyboard-response",
  stimulus: `<dive>You are halfway done! Now you can take a short break if you want.  You can move your head during the break.</br>
             <br></br>
             When you are ready to continue the study, press the <b>SPACE BAR</b>.</dive>`,
  choices: ['spacebar'],
  on_start: function () {
    webgazer.pause(),
      webgazer.clearData()
  },
  post_trial_gap: 500,
};

var recalibrationInstruction2 = {
  type: "html-keyboard-response",
  on_start: () => webgazer.resume(),
  stimulus: `<div>We need to redo the calibration and validation before you return to the study. </br>
   As before, make sure you stare at each dot until it disappears and make sure you don’t move your head.</br>
   <br></br>
   Please press <b>SPACE BAR</b> when you are ready to begin.</div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
};



var recalibration2 = {
  timeline: [
    recalibrationInstruction2,
    {
      type: "eye-tracking",
      doCalibration: true,
      calibrationDots: debugModeCaliDot, ///change to 12
      calibrationDuration: 5,
      doValidation: false,
    }
  ],
};


var charity_choice2 = {
  timeline: [
    fixation1, // change to fixation
    {
      type: "binary-choice",
      stimulus: () => get_multichoice_images()[charity_choice_count],
      choices: ["F", "J"],
      on_finish: () => charity_choice_count++,
    }
  ],
  loop_function: () => charity_choice_count < get_multichoice_images().length,

};


/** slide show quiz  */

var slideshowQuizOverview = {
  type: 'html-keyboard-response',
  on_start: () => document.body.style.cursor = 'pointer',
  stimulus: `<div> <font size=120%; font color = 'green';> Charity quiz </font><br/>
                                       <br><br/>
            You have completed the choice task! There is one last small quiz before we are done. <br/> 
            In this short quiz, you will see five multiple-choice questions about the charities. <br/> 
            Please scroll down to answer all the quiz questions. <br/> 
                                          <br><br/>
             When you are ready, please press the  <b>SPACE BAR</b> to start the quiz. </div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
}

var postQuizScreen = {
  type: 'html-keyboard-response',
  on_start: () => document.body.style.cursor = 'pointer',
  stimulus: `<div>   You have completed the quiz! Press the space bar to see the selected donation decision. <br/>  </div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
}


var quiz_options = allQuizStimuli;
var quiz_img_count = 0;
var quiz_correct_count = 0
var slideshowQuiz = {
  type: 'survey-multi-choice',
  questions: [{
      prompt: quiz_img[0],
      options: [allQuizStimuli[0].A, allQuizStimuli[0].B, allQuizStimuli[0].C],
      required: true
    },
    {
      prompt: quiz_img[1],
      options: [allQuizStimuli[1].A, allQuizStimuli[1].B, allQuizStimuli[1].C],
      required: true
    },
    {
      prompt: quiz_img[2],
      options: [allQuizStimuli[2].A, allQuizStimuli[2].B, allQuizStimuli[2].C],
      required: true
    },
    {
      prompt: quiz_img[3],
      options: [allQuizStimuli[3].A, allQuizStimuli[3].B, allQuizStimuli[3].C],
      required: true
    },
    {
      prompt: quiz_img[4],
      options: [allQuizStimuli[4].A, allQuizStimuli[4].B, allQuizStimuli[4].C],
      required: true
    },
  ],
  on_finish: (data) => {
    all_quiz_response = Object.values(JSON.parse(data.quiz_responses));
    for (var i = 0; i < 5; i++) {
      correctResp = allQuizStimuli[i].correct;
      if (correctResp == all_quiz_response[i]) {
        quiz_correct_count++
      }
    }
  }
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


var select_trial = {
  type: "",
  charity: [],
  donation: 5
}
var randomselector = function (data) {
  var trials = jsPsych.data.get().filterCustom(function (trial) {
    return trial.rating > 0  || trial.trial_type == "binary-choice"
  })
  //trial.rating > 0  || 
 // console.log(trials.count())
  // console.log(trials.json());
  selectedtrialindex = getRandomInt(0, trials.count() - 1);
  selectedtrial = JSON.parse(trials.json())[selectedtrialindex];

  select_trial.type = selectedtrial.trial_type;
 //console.log(JSON.parse(trials.json())[selectedtrialindex]);

  if (select_trial.type === "image-slider-response") {
    select_trial.type = "Willingness to Donate"
    select_trial.donation = selectedtrial.rating;
    select_trial.charity = selectedtrial.stimulus;
  } else {
    select_trial.type = "Donating Preference"
    select_trial.donation = 5;
    if (selectedtrial.key_press == 70) {
      select_trial.charity = selectedtrial.stimulus[0];
    } else {
      select_trial.charity = selectedtrial.stimulus[1];
    }
  }
  html = ` <div> One trial from the <b><font color='red'>${select_trial.type}</font></b> task has been selected for donation! </br>
The charity you donate to is: </br>
<br></br>
<img height="300px" width="500px" src="${select_trial.charity}"/> </br>
 <br></br>
We will donate  <b><font color='red'>$${select_trial.donation}</font></b> to this charity on your behalf.</br>
<br></br>
Thank you for participating! The webcam will turn off when you close the browser tab.</br>
Your quiz score is ${(quiz_correct_count/5)*100}, we will add ${quiz_correct_count*3} to your final payment</br>
</div>`;
  return html
}





// `<p>You have completed the task. The webcam will be closed when you close our browser.</p>`
var end = {
  on_start: () => closeFullscreen(),
  type: "html-keyboard-response",
  on_start: () => closeFullscreen(),
  stimulus: (data) => randomselector(data)

};

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
}

var on_finish_callback = function () {
 // jsPsych.data.displayData();
  jsPsych.data.addProperties({
    subject: subject_id,
    interaction: jsPsych.data.getInteractionData().json(),
  });
  var data = JSON.stringify(jsPsych.data.get().values());
  console.log(data.length / 1024 / 1024 + "Mb");
  $.ajax({
      type: "POST",
      url: "/",
      data: data,
      contentType: "application/json"
    })
    .done(function () {
      //  alert("your data has been saved!")
    })
    .fail(function () {
      //  alert("problem occured while writing data to box.");
    })
}

var trialcounter;

function startExperiment() {
  jsPsych.init({
    timeline: [
      fullscreenEnter,eyeTrackingInstruction1 ,eyeTrackingInstruction2 , inital_eye_calibration ,
      experimentOverview,slideshowOverview,charity_show, 
      ratingOverview,  ratings,
       choiceOverview, recalibration,choiceInstructionReinforce, charity_prac_choice,
      EnterRealChoice, charity_choice1, breaktime, 
      recalibration2, charity_choice2, 
       slideshowQuizOverview,slideshowQuiz,postQuizScreen,
      end
    ],
    on_trial_finish: function () {
      trialcounter = jsPsych.data.get().count();
      if (trialcounter == 40) {
        on_finish_callback();
        jsPsych.data.reset();
      }
    },
    preload_images: [exp_images, instruct_img],
    on_finish: () => on_finish_callback(),
    on_close: () => on_finish_callback()

  });
};


function saveData() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'write_data.php'); // change 'write_data.php' to point to php script.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    if (xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      //   console.log(response.success);
    }
  };
  xhr.send(jsPsych.data.get().json());
}