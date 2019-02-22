const request = require(`superagent`);
const container = document.querySelector(`.show-advice__container`);
const button = document.querySelector(`.show-advice`);
const form = document.querySelector(`form`);
const searchValue = document.querySelector(`#search`);
const getDataFromApi = () => {
    request
        .get('https://api.adviceslip.com/advice')
        .then(res => JSON.parse(res.text))
        .then(json => json.slip.advice)
        .then(advice => {
            showAdvice(advice);
        })
        .catch(err => console.error(err));
};

const showAdvice = (advice) => {
    container.innerHTML = advice;
};

button.addEventListener(`click`, getDataFromApi);
getDataFromApi();

const getDataFromSearch = (inputValue) => {
    request
        .get(`https://api.adviceslip.com/advice/search/${inputValue}`)
        .then(res => JSON.parse(res.text))
        .then(json => json.slips[0].advice)
        .then(advice => {
            showAdvice(advice);
        })
        .catch(err => showAdvice(`Sorry, try another word`));
};



form.addEventListener(`submit`, (event) => {
    event.preventDefault();
    getDataFromSearch(searchValue.value);
})