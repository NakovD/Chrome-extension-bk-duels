import constants from "./constants";
import { getNextEnemyToTryDuel, tryToDuel, attackPhase2, waitAfterDuel } from "./attackingLogic";

//labels
const { localStorageCurrentStepLabel, extensionWorkingLabel, localStoragelastAttackedEnemyLabel } = constants;

const currentStep = +localStorage.getItem(localStorageCurrentStepLabel);
const highscorePage = +localStorage.getItem('highscorePage');
const lastAttackedEnemyIndex = +localStorage.getItem(localStoragelastAttackedEnemyLabel) || 0;
const topLvlThreshold = +localStorage.getItem('topLvlThreshold');
const bottomLvlThreshold = +localStorage.getItem('bottomLvlThreshold');

const { minimumHealth } = constants;

const health = +document.querySelector('#lifeCount').textContent;

const goToHighScores = () => {
    if (currentStep) { return; }
    const highScoresButton = document.querySelector('#navScores');
    localStorage.setItem(localStorageCurrentStepLabel, 1);
    highScoresButton.click();
}

const sortBylevel = () => {
    if (currentStep !== 1) return;
    const sortByLevelIcon = document.querySelector('.iconLevel');
    localStorage.setItem(localStorageCurrentStepLabel, 2);
    sortByLevelIcon.click();
}

const choosePage = () => {
    if (currentStep !== 2) return;
    const select = document.querySelector('#highscoreOffset');
    select.value = highscorePage;
    localStorage.setItem(localStorageCurrentStepLabel, 3);
    select.dispatchEvent(new Event('change'));
}

const checkHealth = () => {
    if (health <= minimumHealth) return true;
    return false;
}

const heal = () => {
    const potions = document.querySelectorAll('.sourceInventory');
    if (!potions.length) return false;
    potions[0].querySelector('a').click();
    const confirmHealButton = document.querySelector('#topPotionPopup .button:first-child');
    confirmHealButton.click();
    return true;
}

const handleHealingResult = () => {
    setTimeout(() => {
        const isHealSuccessful = heal();
        if (isHealSuccessful) {
            localStorage.setItem(localStorageCurrentStepLabel, 0);
            location.reload();
            return;
        }

        localStorage.setItem(extensionWorkingLabel, null);
    }, 1000);
}

const fightDuels = () => {
    const needToHeal = checkHealth();
    if (needToHeal) {
        handleHealingResult();
        return false;
    }

    switch (currentStep) {
        case 0:
            goToHighScores()
            break;
        case 1:
            sortBylevel()
            break;
        case 2:
            choosePage()
            break;
        case 3:
            getNextEnemyToTryDuel({ allEnemiesCache: null, topLvlThreshold, bottomLvlThreshold, lastAttackedEnemyIndex })
            break;
        case 4:
            tryToDuel(lastAttackedEnemyIndex);
            break;
        case 5:
            attackPhase2();
            break;
        case 6:
            waitAfterDuel();
            break;
        default:
            console.log('we are in the default statement');
            break;
    }
}

const reinitExtension = () => {
    let isExtensionWorking = localStorage.getItem(extensionWorkingLabel);
    isExtensionWorking = (isExtensionWorking?.toLowerCase() === 'true');
    if (!isExtensionWorking) return;
    fightDuels();
}

reinitExtension();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const { highscorePage, topLvlThreshold, bottomLvlThreshold, hasRegexElixir } = request;
    localStorage.clear();
    localStorage.setItem('highscorePage', highscorePage);
    localStorage.setItem('topLvlThreshold', topLvlThreshold);
    localStorage.setItem('bottomLvlThreshold', bottomLvlThreshold);
    localStorage.setItem(extensionWorkingLabel, true);
    localStorage.setItem('hasRegexElixir', hasRegexElixir);

    fightDuels();
    sendResponse({ farewell: "goodbye" });
});

