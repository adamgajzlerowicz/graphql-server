const fetch = require('node-fetch');
import moment from 'moment';
import config from '../.env.json';

const translate = (state) => {
    switch (state) {
        case 'YES':
            return 'nie ';
        case 'NO':
            return '';
        default:
            return 'być może ';
    }
};

const colorPicker = (state) => {
    switch (state) {
        case 'NO':
            return '#5cb85c';
        case 'YES':
            return '#d43f3a';
        default:
            return '#5bc0de';
    }
};

const notify = ({lunchAt, oneOThree, oneOFive}) => {
    const text = `
    .
    \n\n\n\n Na obiad idziemy o godzinie ${moment(lunchAt).format("HH:mm:ss")} 
    \n\n\n.
    `;
    const content = {
        'text': text,
        'username': 'Bill Lumbergh',
        "attachments": [
            {
                "text": `Pokoj 103 jest ${translate(oneOThree)}gotowy do jedzenia.`,
                "color": colorPicker(oneOThree),
                "attachment_type": "default",
            },
            {
                "text": `Pokoj 105 jest ${translate(oneOFive)}gotowy do jedzenia.`,
                "color": colorPicker(oneOFive),
                "attachment_type": "default",
            },
            {
                "text": `<http://oktorejjestobiad.pl|http://oktorejjestobiad.pl>`,
                "attachment_type": "default",
            }
        ]
    };

    fetch('https://hooks.slack.com/services/' + config.slack, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    });
};


export {
    notify
};
