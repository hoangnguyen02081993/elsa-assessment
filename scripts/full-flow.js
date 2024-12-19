const axios = require('axios');
const uuid = require('uuid');

const config = {
    apiGatewayUrl: 'http://localhost:4000',
    concurrentUsers: 1,
    intevalTestTime: 1000,
}

const randomLogin = async () => {
    const username = uuid.v4();
    const password = 'password';

    const response = await axios.post(`${config.apiGatewayUrl}/api/v1.0/auth/login`, {
        username,
        password,
    }, {}).then((response) => {
        if (response.status < 300) {
            const requestData = response.data;
            return requestData.data;
        }
        throw new Error('Login failed');
    }); 

    return response;
}

const fetchQuizzes = async (accessToken) => {
    const response = await axios.get(`${config.apiGatewayUrl}/api/v1.0/quizzes`, {  
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }).then((response) => {
        if (response.status < 300) {
            const requestData = response.data;
            return requestData.data;
        }
        throw new Error('Fetch quizzes failed');
    }); 

    return response;
}

const submitQuiz = async (data, accessToken) => {
    const response = await axios.post(`${config.apiGatewayUrl}/api/v1.0/quiz-sessions`, data, {  
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }).then((response) => {
        if (response.status < 300) {
            const requestData = response.data;
            return requestData.data;
        }
        throw new Error('Submit quiz failed');
    }); 

    return response;
}

async function executeTest() {
    const {accessToken} = await randomLogin();
    const quizzes = await fetchQuizzes(accessToken);
    for(const quiz of quizzes) {
        const quizCode = quiz.code;
        const answers = quiz.questions.reduce((result, question) => {
            const randomIndex = Math.floor(Math.random() * question.options.length);
            result[question.id] = question.options[randomIndex].id;
            return result;
        }, {});
        await submitQuiz({
            quizCode,
            answers,
        }, accessToken);
    }
}

async function main() {
    setInterval(async () => {
        await Promise.all(Array(config.concurrentUsers).fill(1).map(() => executeTest()));
    }, config.intevalTestTime);
}

main().catch(console.error);