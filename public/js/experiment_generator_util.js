function populateExperimentConfig(config) {
        //generate vignettes
    for (let i = 0; i < v.length; i++) {
        config.push({
        type: 'image-text',
        imageUrls: v[i].content,
        prompt: "Click the button below to continue.",
        buttonTextOptions: Array.from({ length: v[i].content.length }, (_, i) => `${getOrdinalPage(i+1)}`).concat("Next")
    });

    for (let j = 0 ; j < v[i].questions.length; j++) {
        switch (v[i].questions[j].type) {
            case 'audio-input':
                config.push({
                    type: v[i].questions[j].type,
                    prompt: v[i].questions[j].prompt,
                    img_html: "<img src=\"/images/v" + (i+1) + "_one_page_no_text.png\" alt=\"Story in one page\" style=\"width: 600px; \">",
                    buttonText: 'Submit'
                });
                break;
            case 'audio-input-goodbye':
                config.push({
                    type: v[i].questions[j].type,
                    prompt: v[i].questions[j].prompt,
                    buttonText: 'Submit'
                });
                break;
            case 'multiple-choice-image':               
                config.push({
                    type: 'multiple-choice-image',
                    stimulus: "<img src=\"/images/v" + (i+1) + "_one_page_no_text.png\" alt=\"Story in one page\" style=\"width: 600px; \">",
                    prompt: v[i].questions[j].prompt,
                    options: v[i].questions[j].options,
                    buttonText: 'Next'
                });
                break;
            case 'multiple-choice':
                config.push({
                    type: v[i].questions[j].type,
                    stimulus: "<img src=\"/images/v" + (i+1) + "_one_page_no_text.png\" alt=\"Story in one page\" style=\"width: 600px; \">",
                    prompt: v[i].questions[j].prompt,
                    options: v[i].questions[j].options,
                    buttonText: 'Next'
                });
                break;
            case 'image-button':({
                type: v[i].questions[j].type,
                prompt: v[i].questions[j].prompt,
                stimulus: v[i].questions[j].stimulus,
                options: v[i].questions[j].options
            });
        }
    }

    config.push({
        type: 'update',
        prompt: "Please click \"continue\" to advance to the next story.",
        options: ['Continue'],
        buttonText: 'Next'
    });
    }

    // generate rmie

    for (let i = 0; i < rmie.questions.length; i++) {
        config.push({
            type: rmie.questions[i].type,
            prompt: rmie.questions[i].prompt,
            options: rmie.questions[i].options,
            stimulus: rmie.questions[i].stimulus
        });
    }                    

    config.push({
        type: 'thank-you',
        prompt: 'Thank you for participating in the experiment!',
        buttonText: 'Finish'
    });
}


// Function to create a JsPsych trial based on configuration
function createTrial(config) {

    switch (config.type) {

        case 'hello':
            return {
                type: jsPsychHtmlButtonResponse,
                stimulus: `<p>${config.prompt}</p>`,
                choices: ['Continue'],
                button_html:[`<button class="jspsych-btn">%choice%</button>`],
                on_start: function(data) {
                    getUUID().then((text) => {
                        uuidStr = text;
                    });

                },
                on_finish: function() {
                    jsPsych.data.displayData();
                }
            };
        case 'image-text':
            return { //Stimulus will be an array, choices array be will numbers 1-(stimulus.length), then add next at the end
                type: jsPsychMutliImageButtonResponse,
                stimulus: config.imageUrls,
                render_on_canvas: false,
                stimulus_width: 600,
                prompt: `<p style="color:red !important;">${config.prompt}</p>`,
                choices: config.buttonTextOptions,
                on_finish: function(data) {
                    console.log('User choice:', data.response);
                }
            };

        case 'audio-input':
            return {
                timeline: [
                    {
                        type: jsPsychHtmlButtonResponse,
                        stimulus: `<br>${config.img_html}<br>
                        The next page will record your voice. Please respond to this question: <br><br><i>${config.prompt}</i><br><br>`,
                        button_html: [`<button class="jspsych-btn">Continue</button>`],
                        choices: ['Continue'],                    
                    },
                    {
                        type: jsPsychHtmlAudioResponse,
                        stimulus: 'Recording...',
                        show_done_button: true,
                        done_button_label: 'Stop Recording',
                        allow_playback: true,
                        recording_duration: 60 * 1000,
                        on_finish: function(data) {
                            uploadAudio(uuidStr,data.trial_index,data.response);
                            data.response = ''
                            console.log("In audio input on_finish: ", data.response);                                }
                    }
                ]
            };
        case 'audio-input-goodbye':
            return {
                timeline: [
                    {
                        type: jsPsychHtmlButtonResponse,
                        stimulus: `
                        ${config.prompt}`,
                        button_html: [`<button class="jspsych-btn">Continue</button>`],
                        choices: ['Continue'],                    
                    },
                    {
                        type: jsPsychHtmlAudioResponse,
                        stimulus: 'Recording...',
                        show_done_button: true,
                        done_button_label: 'Stop Recording',
                        allow_playback: true,
                        recording_duration: 60 * 1000,
                        on_finish: function(data) {
                            uploadAudio(uuidStr,data.trial_index,data.response);
                            data.response = ''
                            console.log("In audio input on_finish: ", data.response);                                }
                    }
                ]
            };

        case 'multiple-choice-image':
            return {
                type: jsPsychHtmlButtonResponse,
                stimulus: config.stimulus,
                button_html: config.options.map(choice => `<img src="${choice}" style="width: 175px; height: 175px;">`),
                choices: config.options,

                prompt: `<p>${config.prompt}</p>`
            };

        case 'multiple-choice':
            return {
                type: jsPsychHtmlButtonResponse,
                stimulus: config.stimulus,
                button_html: config.options.map(choice => `<button class="jspsych-btn">${choice}</button>`),
                choices: config.options,
                prompt: `<p>${config.prompt}</p>`
            };
        case 'update':
            return {
                type: jsPsychHtmlButtonResponse,
                stimulus: config.prompt,
                button_html: config.options.map(choice => `<button class="jspsych-btn">${choice}</button>`),
                choices: config.options,
                prompt: ''
            };
        case 'user-id':
            return {
                type: jsPsychSurveyText,
                questions: [{prompt: config.prompt, rows: 1, columns: 40}],
                button_label: config.buttonText,
                on_finish: function(data) {

                    var code = data.response.Q0;

                    jsPsych.data.addProperties({

                        participantID: code

                    });
                }
            };

        case 'thank-you':
            return {
                type: jsPsychHtmlButtonResponse,
                stimulus: `<p>${config.prompt}</p>`,
                choices: [config.buttonText],
                button_html:[`<button class="jspsych-btn">%choice%</button>`],
                on_start: function(data) {
                    console.log("In Thank you: " + uuidStr)
                    uploadData(uuidStr, jsPsych.data.get().csv());
                },
                on_finish: function() {
                    jsPsych.data.displayData();
                }
            };
        case 'image-button':
            return {
                type: jsPsychImageButtonResponse,
                stimulus: config.stimulus,
                prompt: config.prompt,
                button_html: config.options.map(choice => `<button class="jspsych-btn">${choice}</button>`),
                choices: config.options,
                stimulus_width: 600,
                on_finish: function(data) {
                    console.log('User choice:', data.response);
                }
            };

        default:
            console.warn(`Unsupported type: ${config.type}`);
            return null;
    }
}