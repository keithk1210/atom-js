var v1_text = [
    'This is a story about two friends, Jason and Lisa. This is Jason and this is Lisa (points to picture). They are playing in Jason’s room. Jason has a letter from his friend, Susan. Lisa really wants to know what the letter says but Jason does not want her to read it.'
    ,'Jason’s mom calls him. Jason puts the letter under his blanket and leaves the room. While Jason is gone, Lisa takes the letter and reads it.'
    , 'Then she puts it away in Jason’s desk. But Jason finishes talking to his mom and comes back. He sees Lisa putting the letter in the desk. Jason watches Lisa, but Lisa does not see Jason.'
]

var v1_images = [
    'images/v1_p1.png',
    'images/v1_p2.png',
    'images/v1_p3.png',
    'images/v1_one_page.png'
]



var v1_content = v1_text.map((text, index) => {
    return {
        text: text,
        image: v1_images[index]
    };
});

var v1_q = [
    {
        type: 'text-input',
        prompt: 'Where did Jason put his letter before he went to see his mom?'
    },
    {
        type: 'text-input',
        prompt: 'Where did Lisa put the letter after she read it?'
    },
    {
        type: 'text-input',
        prompt: 'Does Jason know where the letter is now?'
    }
]

var v1_q_image_test = [
    {
        type: 'multiple-choice-image',
        prompt: 'Where did Jason put his letter before he went to see his mom?',
        options: [ 
            'images/blanket1.jpg',
            'images/desk1.jpg',
            'images/question.jpg'
        ]
    } 
]

var v1 = {
    content: v1_images,
    questions: v1_q_image_test
}

var v2_text = [
    "Okay, now this next story is about football. Johnny and Bob are best friends. They really enjoy playing football together. Johnny and Bob both want to play on the school football team. The school football team plays every Monday after school.",
    "Johnny thinks that he is not as good at football as Bob is. He thinks that the football manager is more likely to choose Bob for the football team.",
    "But the football manager thinks that both Johnny and Bob are good football players. He wants them both to play in the school football team. But the manager knows that Johnny doesn’t think he will get on the team."
]

var v2_images = [
    'images/v2_p1.png',
    'images/v2_p2.png',
    'images/v2_p3.png',
    'images/v2_one_page.png'
]

var v2_content = v2_text.map((text, index) => {
    return {
        text: text,
        image: v2_images[index]
    };
});

var v2_q = [
    {
        type: 'multiple-choice',
        prompt: 'Which of the two statements do you think is right?',
        options: [
            'The football team play on Fridays.',
            'The football team play on Mondays.'
        ]
    },
    {
        type: 'multiple-choice',
        prompt: 'Good! Now think about the story to answer this one… which reasoning is correct?',
        options: [
            'The manager thinks that Johnny knows he wants him to be on the football team.',
            'The manager knows that Johnny doesn’t know that he wants him to be on the team.'
        ]
    }
]

var v2 = {
    content: v2_images,
    questions: v2_q
}

var v3_text = [
    "Okay… one more story! Sarah and Joe are in the same class at school. Sarah and Joe often sit next to each other. Their teacher is Mrs. Brown. One day Mrs. Brown suggests that Sarah and Joe should bring a video into school to watch with the other children as a treat for being good in class. Mrs. Brown also says to them: 'Make sure you bring in something really funny that I will like too!",
    "Sarah’s favorite videos are cartoons. Joe’s favorite videos are adventure films. Which will it be? Cartoons or adventure films?",
    "Joe says to Sarah: ‘We just can’t decide so I think that we should take in the film that Mrs. Brown would like. Sarah, do you know which Mrs. Brown would like best?’ Sarah has a little think. She doesn’t have a clue which film Mrs. Brown would like! But Sarah decides to tell Joe that she knows that Mrs. Brown likes cartoons best. Sarah thinks that this will make Joe decide to take cartoon videos into school. Joe listens to this and then Joe says; 'We will take in a video of cartoons then.' So Sarah gets to enjoy her favorite cartoons!"
]

var v3_images = [
    'images/v3_p1.png',
    'images/v3_p2.png',
    'images/v3_p3.png',
    'images/v3_one_page.png'
]

var v3_content = v3_text.map((text, index) => {
    return {
        text: text,
        image: v3_images[index]
    };
});

var v3_q = [
    {
        type: 'multiple-choice',
        prompt: 'Let’s see how well you remember the story!',
        options: [
            'Mrs Brown asks Sarah and Joe to bring in something funny to watch.',
            'Mrs Brown asks Sarah and Joe to bring in something scary to watch.'
        ]
    },
    {
        type: 'multiple-choice',
        prompt: 'Good! Now think about the story to answer this one… which reasoning is correct?',
        options: [
            'Sarah hoped that Joe would know that she didn’t know what Mrs. Brown wanted.',
            'Sarah hoped that Joe would believe that she knew what Mrs. Brown wanted.'
        ]
    }
]

var v3 = {
    content: v3_images,
    questions: v3_q
}

var v4_text = [
    "During the war, the Red army captured a member of the Blue army. They want him to tell them where his army's tanks are; they know they are either by the sea or in the mountains. They know that the prisoner will not want to tell them, he will want to save his army, and so he will certainly lie to them.",
    "The prisoner is very brave and very clever, he will not let them find his tanks. The tanks are really in the mountains.",
    "Now when the other side asks him where his tanks are, he says, 'They are in the mountains."
]

var v4_images = [
    'images/v4_p1.png',
    'images/v4_p2.png',
    'images/v4_p3.png',
    'images/v4_one_page.png'
]

var v4_content = v4_text.map((text, index) => {
    return {
        text: text,
        image: v4_images[index]
    };
});

var v4_q = [
    {
        type: 'text-input',
        prompt: 'Is it true what the prisoner said?'
    },
    {
        type: 'text-input',
        prompt: 'Where will the other army look for his tanks?'
    },
    {
        type: 'text-input',
        prompt: 'Why did the prisoner say what he said?'
    }
]    

var v4 = { 
    content: v4_images,
    questions: v4_q
}

var v5_text = [
    "Okay, last story! Jill wanted to buy a kitten, so she went to see Mrs. Smith, who had lots of kittens she didn't want. Now Mrs. Smith loved the kittens, and she wouldn't do anything to harm them, though she couldn't keep them all herself.",
    "When Jane visited she wasn't sure she wanted one of Mrs. Smith's kittens, since they were all males and she had wanted a female.",
    "But Mrs. Smith said, 'If no one buys the kittens I'll just have to drown them!'"
]

var v5_images = [
    'images/v5_p1.png',
    'images/v5_p2.png',
    'images/v5_p3.png',
    'images/v5_one_page.png'
]   

var v5_content = v5_text.map((text, index) => {
    return {
        text: text,
        image: v5_images[index]
    };
});

var v5_q = [
    {
        type: 'text-input',
        prompt: 'Was it true, what Mrs. Smith said? Why did Mrs. Smith say this to Jane?'
    },
    {
        type: 'text-input',
        prompt: 'Thank you so much for listening to all of these stories and answering the questions! Is there anything else you would like to tell us about the stories you heard?'
    }
]

var v5 = {
    content: v5_images,
    questions: v5_q
}


var v = [v1,v2,v3,v4,v5];
