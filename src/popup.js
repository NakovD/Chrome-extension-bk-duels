const submitButton = document.querySelector('#bk-submit-data');
const highscorePage = document.querySelector('#highscore-page');
const topLvlThreshold = document.querySelector('#top-lvl-threshold');
const bottomLvlThreshold = document.querySelector('#bottom-lvl-threshold');
const hasRegexElixir = document.querySelector('#has-regen-elixir');

let neededTab = 0;

submitButton.addEventListener('click', function () {
    const data = {
        ['BattleKnight Extension']: true,
        highscorePage: highscorePage.value,
        topLvlThreshold: topLvlThreshold.value,
        bottomLvlThreshold: bottomLvlThreshold.value,
        hasRegexElixir: hasRegexElixir.checked
    }
    debugger;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, data, function (response) { });
    });
});