import { IExtensionInitialData } from './models/extensionInitialData';

const submitButton = document.querySelector('#bk-submit-data') as HTMLButtonElement;
const highscorePage = document.querySelector('#highscore-page') as HTMLInputElement;
const topLvlThreshold = document.querySelector('#top-lvl-threshold') as HTMLInputElement;
const bottomLvlThreshold = document.querySelector('#bottom-lvl-threshold') as HTMLInputElement;
const hasRegenElixir = document.querySelector('#has-regen-elixir') as HTMLInputElement;
const stopExtensionButton = document.querySelector('#bk-stop-extension') as HTMLButtonElement;

submitButton?.addEventListener('click', function () {
    const data: IExtensionInitialData = {
        bkExtensionWorking: true,
        highscorePage: highscorePage.value,
        topLvlThreshold: topLvlThreshold.value,
        bottomLvlThreshold: bottomLvlThreshold.value,
        hasRegenElixir: hasRegenElixir.checked,
    };

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0];
        chrome.tabs.sendMessage(currentTab.id as number, data, function (response) {});
    });
});

stopExtensionButton?.addEventListener('click', function () {
    const data = {
        bkExtensionWorking: false,
    };

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0];
        chrome.tabs.sendMessage(currentTab.id as number, data, function (response) {
            alert(response.message);
        });
    });
});
