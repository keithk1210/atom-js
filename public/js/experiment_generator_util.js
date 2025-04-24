function populateExperimentTimeline(timeline) {


    timeline.push( {
        type: jsPsychHtmlButtonResponse,
        stimulus: `<p>Hello, welcome to the experiment!</p>`,
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
    });

        //generate vignettes
    for (let i = 0; i < v.length; i++) {
        timeline.push(
            // {
            // type: 'image-text',
            // imageUrls: v[i].content,
            // prompt: "Click the button below to continue.",
            // buttonTextOptions: Array.from({ length: v[i].content.length }, (_, i) => `${getOrdinalPage(i+1)}`).concat("Next")
            // }
            { //Stimulus will be an array, choices array be will numbers 1-(stimulus.length), then add next at the end
                type: jsPsychMutliImageButtonResponse,
                stimulus: v[i].content,
                render_on_canvas: false,
                stimulus_width: 600,
                prompt: `<p style="color:red !important;">Click the button below to continue.</p>`,
                choices: Array.from({ length: v[i].content.length }, (_, i) => `${getOrdinalPage(i+1)}`).concat("Next"),
                on_finish: function(data) {
                    console.log('User choice:', data.response);
                }
            }
            
    );

    for (let j = 0 ; j < v[i].questions.length; j++) {
        switch (v[i].questions[j].type) {
            case 'audio-input':
                timeline.push(
                    // {
                    // type: v[i].questions[j].type,
                    // prompt: v[i].questions[j].prompt,
                    // img_html: "<img src=\"/images/v" + (i+1) + "_one_page_no_text.png\" alt=\"Story in one page\" style=\"width: 600px; \">",
                    // buttonText: 'Submit'
                    // }
                    {
                        timeline: [
                            {
                                type: jsPsychHtmlButtonResponse,
                                stimulus: `<br><img src=\"/images/v${(i+1)}_one_page_no_text.png\" alt=\"Story in one page\" style=\"width: 600px; \"><br>
                                The next page will record your voice. Please respond to this question: <br><br><i>${v[i].questions[j].prompt}</i><br><br>`,
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
                    }
            );
                break;
            case 'audio-input-goodbye':
                timeline.push(
                    // {
                    // type: v[i].questions[j].type,
                    // prompt: v[i].questions[j].prompt,
                    // buttonText: 'Submit'
                    // }
                    {
                        timeline: [
                            {
                                type: jsPsychHtmlButtonResponse,
                                stimulus: `
                                ${v[i].questions[j].prompt}`,
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
                                    console.log("In audio input on_finish: ", data.response);   
                                    
                                    jsPsych.pluginAPI.getCameraRecorder().stop();
        
                                   
                                }
                            }
                        ]
                    }
                );
                break;
            case 'multiple-choice-image':               
                timeline.push(
                //     {
                //     type: 'multiple-choice-image',
                //     stimulus: "<img src=\"/images/v" + (i+1) + "_one_page_no_text.png\" alt=\"Story in one page\" style=\"width: 600px; \">",
                //     prompt: v[i].questions[j].prompt,
                //     options: v[i].questions[j].options,
                //     buttonText: 'Next'
                // }

                {
                    type: jsPsychHtmlButtonResponse,
                    stimulus: "<img src=\"/images/v" + (i+1) + "_one_page_no_text.png\" alt=\"Story in one page\" style=\"width: 600px; \">",
                    button_html: v[i].questions[j].options.map(choice => `<img src="${choice}" style="width: 175px; height: 175px;">`),
                    choices: v[i].questions[j].options,
                    prompt: `<p>${v[i].questions[j].prompt}</p>`
                });
                timeline.push(
                {
                    type: jsPsychHtmlKeyboardResponse,
                    stimulus: 
                    `
                    <img id="fadeImage" src="images/smile.jpg" alt="Placeholder" style="opacity:0; transition:opacity 1s; width: 175px">
                    <p id="fadeText" style="opacity:0; transition:opacity 1s; font-size:24px; margin-top:20px;">Thank you for your response! On to the next question...</p>
                        `,
                    stimulus_width: 175,
                    response_ends_trial: false,
                    trial_duration: 3250,
                    on_load: function (data) {
                        console.log("On_start:");
                        
                        const display_element = jsPsych.getDisplayElement();
                        
                        console.log(jsPsych.getDisplayElement().innerHTML);

                        const image = display_element.querySelector("#fadeImage");
                        const text = display_element.querySelector("#fadeText");

                        // Fade in
                        setTimeout(() => {
                            console.log("setting timeout!");
                            image.style.opacity = '1';
                            text.style.opacity = '1';
                        }, 250);

                        //250 nothing, 1250 fade in,  1250 -> 2250 pause, 2250 -> 3250  fade out

                        // Fade out after 2s + 1s delay (for a pause)
                        setTimeout(() => {
                            console.log("setting timeout!!");
                            image.style.opacity = '0';
                            text.style.opacity = '0';
                        }, 2250);
                    }

                });
                break;
            case 'multiple-choice':
                timeline.push(
                //     {
                //     type: v[i].questions[j].type,
                //     stimulus: "<img src=\"/images/v" + (i+1) + "_one_page_no_text.png\" alt=\"Story in one page\" style=\"width: 600px; \">",
                //     prompt: v[i].questions[j].prompt,
                //     options: v[i].questions[j].options,
                //     buttonText: 'Next'
                // }
                {
                    type: jsPsychHtmlButtonResponse,
                    stimulus: "<img src=\"/images/v" + (i+1) + "_one_page_no_text.png\" alt=\"Story in one page\" style=\"width: 600px; \">",
                    button_html: v[i].questions[j].options.map(choice => `<button class="jspsych-btn">${choice}</button>`),
                    choices: v[i].questions[j].options,
                    prompt: `<p>${v[i].questions[j].prompt}</p>`
                }
                );
                break;
            case 'image-button':(
                // {
                // type: v[i].questions[j].type,
                // prompt: v[i].questions[j].prompt,
                // stimulus: v[i].questions[j].stimulus,
                // options: v[i].questions[j].options
                // }
                {
                    type: jsPsychImageButtonResponse,
                    stimulus: v[i].questions[j].stimulus,
                    prompt: v[i].questions[j].prompt,
                    button_html: v[i].questions[j].options.map(choice => `<button class="jspsych-btn">${choice}</button>`),
                    choices: v[i].questions[j].options,
                    stimulus_width: 600,
                    on_finish: function(data) {
                        console.log('User choice:', data.response);
                    }
                }
            );
        }
    }

    timeline.push(
    //     {
    //     type: 'update',
    //     prompt: "Please click \"continue\" to advance to the next story.",
    //     options: ['Continue'],
    //     buttonText: 'Next'
    // }
    {
        type: jsPsychHtmlButtonResponse,
        stimulus: "Please click \"continue\" to advance to the next story.",
        button_html: ['Continue'].map(choice => `<button class="jspsych-btn">${choice}</button>`),
        choices: ['Continue'],
        prompt: ''
    }
    );
    }

    // generate rmie

    for (let i = 0; i < rmie.questions.length; i++) {
        timeline.push(
        //     {
        //     type: rmie.questions[i].type,
        //     prompt: rmie.questions[i].prompt,
        //     options: rmie.questions[i].options,
        //     stimulus: rmie.questions[i].stimulus
        // }
        {
            type: jsPsychImageButtonResponse,
            stimulus: rmie.questions[i].stimulus,
            prompt: rmie.questions[i].prompt,
            button_html: rmie.questions[i].options.map(choice => `<button class="jspsych-btn">${choice}</button>`),
            choices: rmie.questions[i].options,
            stimulus_width: 600,
            on_finish: function(data) {
                console.log('User choice:', data.response);
            }
        }
        );
    }                    

    timeline.push(
    //     {
    //     type: 'thank-you',
    //     prompt: 'Thank you for participating in the experiment!',
    //     buttonText: 'Finish'
    // }
    {
        type: jsPsychHtmlButtonResponse,
        stimulus: `<p>Thank you for participating in the experiment!</p>`,
        choices: ['Finish'],
        button_html:[`<button class="jspsych-btn">%choice%</button>`],
        on_start: function(data) {
            console.log("In Thank you: " + uuidStr)
            uploadData(uuidStr, jsPsych.data.get().csv());
        },
        on_finish: function() {
            jsPsych.data.displayData();
        }
    }
    );
}

