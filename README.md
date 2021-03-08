# CrowdStreet Automation Challenge

##Getting Setup

To get started, for Ubuntu, use the following (probably as sudo) in order to get the system libraries you need:

`$ apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb`


Next, make sure npm is installed with this:

`$ sudo apt install npm`


Next, make sure you are in the directory you want to put this project in, and run:

`$ npm install cypress --save-dev`

`$ npm install typescript --save-dev`



After that, making sure you are in ~/path/to/where/you/cloned/repo/to/CrowdStreetTest/ run:

`$ npm install`




##Running the Test

Next, run:

`$ npx cypress run -b chrome "cypress/tests/test-to-register.ts"`


This should execute the test to register a new user, and assert that the modal congratulating the new user on a successful completion.

####Note:  If you want to run it in HEADLESS mode and get a video recording of it to review later, you can.  This command also helps if you want to loop on it to run over and over to check for reliability:

`$ npx cypress run -b chrome --headless -s "cypress/tests/test-to-register.ts"`

The output of this will look something like this, and provide a path to where the video can be viewed at:

```

====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:    6.5.0                                                                              │
  │ Browser:    Chrome 88 (headless)                                                               │
  │ Specs:      1 found (test-to-register.ts)                                                      │
  │ Searched:   cypress/tests/test-to-register.ts                                                  │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────
                                                                                                    
  Running:  test-to-register.ts                                                             (1 of 1)


  New Registration Test
    ✓ Creates a New User (33518ms)


  1 passing (54s)


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        1                                                                                │
  │ Passing:      1                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     53 seconds                                                                       │
  │ Spec Ran:     test-to-register.ts                                                              │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Started processing:  Compressing to 32 CRF                                                     
  -  Finished processing: /home/kenny/odds/CrowdStreetTest/cypress/videos/test-to-reg    (6 seconds)
                          ister.ts.mp4                                                              


====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  test-to-register.ts                      00:53        1        1        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        00:53        1        1        -        -        -  

``` 
