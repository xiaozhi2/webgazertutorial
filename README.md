# Webgazer Tutorial
> This tutorial is used for embedding an eye-tracking library called WebGazer within the JsPsych experiment. The first two sections provide a general overview regarding the JsPysch experiment and Webgazer library.
After a brief overview, we provided an introduction to the files in our template by specifying the purposes of the folders and files in the template.
We then list the steps to make eye-tracking work during the experiment using the template we provided as an instance. 
In the Template operation section, we provide instructions regarding how to make the template work on your own device.
Please check our preprint here: https://psyarxiv.com/qhme6/! 
- Library introduction
  - [Prepare your experiment in jsPsych](#JsPysch)
  - [Tracking eye positions in Webgazer](#Webgazer)
- Introduction to the files in the Template 
  - [Template](#Template)
  - [Run the template on your own device](#Operation)
- Eye tracking experiment steps:
  - [Check webcam](#Webcam)
  - [Initial calibration](#Calibration)
  - [Eye tracking during the experiment](#Recording)
- Server and data
  - [Server side and data saving](#Server)
- Other notes
  - [Others](#Others)




## JsPsych

- You may want to check JsPsych website:  <a href="https://www.jspsych.org" target="_blank">https://www.jspsych.org</a>.

- Use this as a general reference for making the experiment trials, function calls in JavaScript.



## Webgazer
- Important link about WebGazer: <a href="https://webgazer.cs.brown.edu" target="_blank"> https://webgazer.cs.brown.edu</a>.

- We used this external resource as our library for tracking eye positions during the experiment. 

- After you prepare the experiment in JsPsych. You need to add the eye-tracking library (webgazer.js), eye-calibration plugin (eye-tracking.js), and their linked CSS files (eye-tracking.css, tolcam.css), 

## Template

The template presents a preferential choice experiment. The public folder contains sources for the front end and app.js is for the back end. 

In the app.js file, we wrapped our experiment into a node.js app. Please use this as a reference for packing the jspsych experiment into an node.js app and save data into dropbox. <a href="https://github.com/winsonfzyang/jsPsychTutorial" target="_blank"> https://github.com/winsonfzyang/jsPsychTutorial</a>.


In the public folder, there're three main folders - css,img, js, and one index.html file.
JS folder contains the plugins, javascript library, and your task script where you put all the experimental trials together.

- for an eye-tracked experiment, the following plugins must be included:
   - eye-tracking.js
- for an eye-tracked experiment, the following libraries must be included:
   - jquery.js
   - jspsych.js
   - webgazer.js (and its associated webgazer-worker folder)
   - jcanvas.js
   
css folder contains all the css files for your experiment.
- for an eye-tracked experiment, the following css must be included:
   - eye-tracking.css
   - jspsych.css
   - tolcam.css
   
index.html file specifies the consent form for the experiment and launches your experiment.

Img folder contains the food image stimuli.


## Operation

- If you want to make this template work on your laptop, you should first go to https://www.dropbox.com/developers/apps to create an app and then replace your access token in the app.js file. You had better create a separate file to save your access token to protect the data. 

```javascript
const dbx = new Dropbox({
    accessToken: 'YOURACCESSTOKEN',
    fetch
});
```

- Once you have your app set up in your dropbox, you can cd to your experiment folder: 

```shell
$ npm install
$ node app.js
```


-  Next, you can go to your Chrome or Firefox browser and type in the port number (default is 2500) and begin the experiment.
   - In your browser, type in : localhost:2500

- The mp4(zoom_1.mp4) video shows the whole process of downloading from the github and operating on a new device. 

## Webcam

- The first step for an online eye-tracking experiment after you prepare your experiment in the JsPsych is to check users' webcams.This is important because some browsers may block the webcams automatically. Therefore, in the "index.html" file of this template, we add the following code chunk to make sure the user's webcam is ready at the beginning of the study:

```javascript
$('body').on('click', '.goExp', function () {
        showAlert();
    }).on('click', '.checkmark', function (event) {
        goExp.addEventListener('click', () => {
            ensureWebcam(() => startExperiment()); // start the experiment after the webcam is ready.
        });
        event.stopPropagation();
    });

// ensure the user's webcam is able to use. Some browsers may automatically block the webcams.
    function ensureWebcam(callback) {
        $('body').html('<p class="center", style="font-family:Arial, Helvetica, sans-serif">Checking webcam ...</p>');
        window.navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            stream.getTracks().forEach(track => track.stop());
            callback();
        })
        .catch(function() {
            alert('Cannot open webcam.\nIs it blocked? This app requires webcam.');
            location.reload();
        });
    }
   
```


## Calibration
After starting the experiment, participants need to pass an initial calibration before the main task starts. The "eye-tracking.js" plugin is to launch this calibration process. the calibration and validation process can be thought as one experimental trial in your study. 

- This video provides an example of calibration:

[![](http://img.youtube.com/vi/PRz2LWKyngw/0.jpg)](http://www.youtube.com/watch?v=PRz2LWKyngw "webgazercalibration")


- In the template, you will see the eye-tracking.js plugin in the plugin folder. It does the calibration and validation phases before the start of the task using WebGazer.

- Here are the parameters with a default value of undefined must be specified. Other parameters can be left unspecified if the default value is acceptable.


| Parameter           | Type    | Default value | Description                                                                                                                                        |
|---------------------|---------|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| doInit              | boolean | False         | Specifies whether it is the first time to load the web cam and do the calibration.                                                                 |
| doVideo             | boolean | False         | If true, the video from the web cam is shown to the subject.                                                                                       |
| showPoint           | boolean | False         | If true, the prediction points will be shown on the screen.                                                                                        |
| doCalibration       | boolean | False         | If true, Calibration phase is initiated.                                                                                                           |
| showVideoInterTrial | boolean | true         | If true, the view will be showed during the intertrial calibration.                                                                                                          |
| calibrationMethod   | string  | ‘watch’       | Label determines which calibration method is used.                                                                                                 |
| calibrationDots     | numeric | 5             | Specifies the number of calibration dots used.                                                                                                     |
| calibrationDuration | numeric | 3             | Specifies how long the calibration dot appears on the screen in seconds                                                                            |
| doValidation        | boolean | False         | If true, validation phase is initiated.                                                                                                            |
| validationDots      | numeric | 5             | Specifies the number of validation dots to be used.                                                                                                |
| validationnDuration | numeric | 2             | Specifies how long the validation dot appears on the screen in seconds                                                                             |
| validationTol       | numeric | 200           | Specifies the tolerance level in pixels for a prediction to be considered successful.                                                              |
| validationThreshold | numeric | 0.7           | Specifies the proportion of successful validation points that need to be successful in order for the validation phase to be considered successful. |
    

- In the main task.js file, you will see one object called  initial_eye_calibration (see the following code chunk). This is an initial calibration trial using the tracking.js plugin. The timeline for this object is:
    -  eyeTrackingNote: show the instruction for eye calibration.
    -  do calibration: specify the plugin-in type: "eye-tracking", and then specify the parameters. 

```javascript
var initial_eye_calibration = {
  timeline: [
    eyeTrackingNote, // instruction 
    {
      type: "eye-tracking",
      doInit: true, //make sure you specify this as true for an initial calibration.
      doCalibration: true,
      doValidation: true,
      calibrationDots:  13,
      calibrationDuration: 3, 
      doValidation: true,
      validationDots:  13,
      validationDuration: 2,
      validationTol: 130,
     ],
};

```

- if doInit is true, this message will be shown. This is a waiting page for subjects to adjust their positions for their first calibration attempt.

```HTML
Before you begin the calibration, please wait until the video feed appears on your screen. Follow the previous tips to adjust your position relative to your webcam.  When you are ready, please press the SPACE BAR to continue.
```

- if doInit is false, this message will be shown. This is a waiting page for later re-calibration:

```HTML
We need to re-calibrate you.  Take a short break and proceed by pressing the SPACE BAR when you are ready.
```

- The output of the calibration/validation data: 
    - hitCounts: the number of predictions that are within the threshold within two seconds.
    - hitRatio: hitcounts/totalCounts.
    - totalCounts: the total number of predictions within two seconds.
    - valid: whether the dot is valid or not.
    - x/y: the x,y coordinates of the validation dots.
  

## Recording:
- The experiment in the template contains the following sections: initial calibration, rating task, recalibration, choice task I, break, recalibration, and choice task II. Eye-tracking data is recorded for the calibration trials and two parts of the choice task.

- We begin the recording at the calibration trial using the following command:

```javascript
webgazer.begin() // startwebgazer function in the eye-tracking.js plugin file
```
- We pause the recording between the calibration and recalibration using the following command:


```javascript
webgazer.pause() // on_start function of the rating trial in the main task.js file.
```

- We resume the recording  at the beginning of the recalibration using the following command:

```javascript
webgazer.resume() // on_start function of the recalibration trial in the main task.js file.
```



- We record the eye-tracking data during the choice task with the following steps:


    - Step 1:  add an option for doEyeTracking in the plugin infomation. An example in the binary-choice.js plugin:
    ```javascript
    doEyeTracking: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'eye-tracking',
        default: true,
        description: 'Whether to do the eye tracking during this trial.'
      }
    ```
    
     - Step 2: create an object to save eye tracking data.
    ```javascript
    var eyeData = {history:[]};
     ```
     
     - Step 3:  add this code chunk to begin the recording within a trial.
     ```javascript
        if(trial.doEyeTracking) {
      webgazer.resume();
    webgazer.showVideo(false);
    webgazer.showPredictionPoints(true);
    webgazer.showFaceOverlay(false);
    webgazer.showFaceFeedbackBox(false);
    var starttime = performance.now();
    var eye_tracking_interval = setInterval(
      function() {
        var pos = webgazer.getCurrentPrediction();
        if (pos) {

          var relativePosX = pos.x/screen.width ;
          var relativePosY = pos.y/screen.height;
          eyeData.history.push({
           // 'x': pos.x,
          //  'y': pos.y,
            'relative-x': relativePosX,
            'relative-y': relativePosY,
            'elapse-time': performance.now() - starttime
          });
        }
      },20);
    };
  ```
     
    - Step 4:  add this code chunk to save eye tracking data within a trial:
      
     ```javascript
    if(trial.doEyeTracking) {
    webgazer.pause(); // pause the webgazer before you save the data, this is optional
    clearInterval(eye_tracking_interval); } // clear the time interval before you save the data, so next time you use this trial, the timer will start from beginning. 
      // data saving
      var trial_data = {
        "rt": response.rt,
        "key_press": response.key,
        "choices": trial.choices,
        "eyeData": JSON.stringify(eyeData), //save your eye tracking data
      };
      jsPsych.finishTrial(trial_data);
    };
    ```


- In the template, we used the threadedRidge regression method to get gaze prediction. If you want to try other regression methods, please take a look at the WebGazer website.


- "eyeData" is the eye-tracking data. It contains three variables: 
      - relative-x: relative gaze position over the x-axis on the screen
      - relative-y: relative gaze position over the y-axis on the screen
      - elapse-time: elapsed time
           


## Server
- After coding an eye-tracking experiment, you have to build an experiment online and collect data. As we mentioned before, we packed our experiment into an node.js app, and then deploy the experiment on Heroku. https://www.heroku.com. We send our data to our dropbox account using the Dropbox API.
   - Helpful Links: https://blog.heroku.com/six-strategies-deploy-to-heroku
    - Heroku has its own data storage service that you can save your data. 
        - Helpful Links: https://www.heroku.com/managed-data-services
    - We directly upload the data into our dropbox account. 
        - Helpful Links: https://www.dropbox.com/developers/documentation/javascript#tutorial
    - Tutorial on GitHub: https://github.com/winsonfzyang/jsPsychTutorial
    
    
- If your lab has in-house server, then you just have to link the experiment to your server and post the link to experimental platform.
    - If you are running the experiment on MTurk, use PsiTurk as a server support will be an option: https://www.jspsych.org/overview/mturk/
  

- Save data to dropbox:
    - First, create an app in your dropbox app folder (https://www.dropbox.com/developers/documentation/javascript#tutorial).
      - After you create the app, you will be shown accessToken for an app. We need to link this token with our node.js app.
    - Second, create coding chunks (in the main_task.js file) as following to send front-end data to your dropbox.
    - two data files will be sent into your dropbox for one subject:
         - the first is a separate JSON file that will update whether this subject has passed the initial calibration or not. If a subject passes the calibration, his/her folder name will begin with 'cg'; otherwise, his/her folder name will begin by 'sb'.
            - related objects are as follows:

              ```javascript
              function makeSurveyCode(status) {
                  uploadSubjectStatus(status);
                  var prefix = {'success': 'cg', 'failed': 'sb'}[status]
                  return ... 
                  }
              var uploadSubjectStatus = function(status) {...}
              var on_finish_callback = function () {...}
              ```
        - the second is all the experiment data.
          - related objects are as follows:
          ```javascript
           var on_finish_callback = function () {
          jsPsych.data.addProperties({
            subject: subject_id,
          });
          var data = JSON.stringify(jsPsych.data.get().values());
          $.ajax({
              type: "POST",
              url: "/data",
              data: data,
              contentType: "application/json"
            })
            .done(function () {
              // alert("your data has been saved!")
            })
            .fail(function () {
              //alert("problem occured while writing data to box.");
            })
          }
          ```       
    - Third, create coding chunk (in the app.js file) as following to specify your dropbox option.
    
        ```javascript
        const dbx = new Dropbox({
            accessToken: 'YOURACCESSTOKEN',
            fetch});
        ```
    - Fourth,  test your experiment app in your local environment. The following chunk showed the port setting. 3500 represents the port number in your local environment. 
    
       ```javascript
         app.set('port', (process.env.PORT || 2000));
        ```
        In the terminal, you can cd to your experiment folder, and type in the following chunk to test your experiment app in your local environment:
        
        ```shell
        $ npm install
        $ node app.js
        ```
                
   - After you successfully tested the experiment app in your local environment and successfully receive the data from your dropbox, then you can push your experiment onto Heroku.  
        - pushing code from a Git repository to a Heroku app. 
        - You simply add your Heroku app as a remote to an existing Git repository, then use git push to send your code to Heroku
        - details can be found here: https://blog.heroku.com/six-strategies-deploy-to-heroku
        - you may check your server status by looking at the log files to see if the experiment is successfully pushing on to the server or not.
   
   
   




## Others
- All the data will be saved in JSON format. We associate the code to transfer data into csv in python.
- Others: useful git command:
```shell
$ Git add   
$ Git commit -m “message”
$ Git status  
$ Git push  
$ Git pull 
$ Git log
```

## Reference
