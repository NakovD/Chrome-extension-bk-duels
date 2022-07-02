const submitButton = document.querySelector('#bk-submit-data') as HTMLButtonElement;
const highscorePage = document.querySelector('#highscore-page') as HTMLInputElement;
const topLvlThreshold = document.querySelector('#top-lvl-threshold') as HTMLInputElement;
const bottomLvlThreshold = document.querySelector('#bottom-lvl-threshold') as HTMLInputElement;
const hasRegexElixir = document.querySelector('#has-regen-elixir') as HTMLInputElement;

submitButton.addEventListener('click', function () {
    const data = {
        ['BattleKnight Extension']: true,
        highscorePage: highscorePage.value,
        topLvlThreshold: topLvlThreshold.value,
        bottomLvlThreshold: bottomLvlThreshold.value,
        hasRegexElixir: hasRegexElixir.checked
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0];
        chrome.tabs.sendMessage(currentTab.id as number, data, function (response) { });
    });
});