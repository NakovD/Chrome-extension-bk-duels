import constants from "./constants";
import { getNextEnemyToTryDuel, tryToDuel, attackPhase2, waitAfterDuel } from "./attackingLogic";
import localStorageData from "./localStorageData";

//labels
const { localStorageCurrentStepLabel, extensionWorkingLabel, localStoragelastAttackedEnemyLabel } = constants;

const { currentStep, highscorePage, lastAttackedEnemyIndex, topLvlThreshold, bottomLvlThreshold, bkExtensionsWorking } = localStorageData;

const { minimumHealth } = constants;

const health = +((document.querySelector('#lifeCount') as HTMLElement).textContent as string);

const goToHighScores = () => {
    if (currentStep) { return; }
    const highScoresButton = document.querySelector('#navScores') as HTMLButtonElement;
    localStorage.setItem(localStorageCurrentStepLabel, '1');
    highScoresButton.click();
}

const sortBylevel = () => {
    if (currentStep !== 1) return;
    const sortByLevelIcon = document.querySelector('.iconLevel') as HTMLElement;
    localStorage.setItem(localStorageCurrentStepLabel, '2');
    sortByLevelIcon.click();
}

const choosePage = () => {
    if (currentStep !== 2) return;
    const select = document.querySelector('#highscoreOffset') as HTMLSelectElement;
    select.value = highscorePage.toString();
    localStorage.setItem(localStorageCurrentStepLabel, '3');
    select.dispatchEvent(new Event('change'));
}

const checkHealth = () => {
    if (health <= minimumHealth) return true;
    return false;
}

const heal = () => {
    const potions = document.querySelectorAll('.sourceInventory');
    if (!potions.length) return false;
    const firstPotion = potions[0].querySelector('a') as HTMLAnchorElement;
    firstPotion.click();
    const confirmHealButton = document.querySelector('#topPotionPopup .button:first-child') as HTMLButtonElement;
    confirmHealButton.click();
    return true;
}

const handleHealingResult = () => {
    setTimeout(() => {
        const isHealSuccessful = heal();
        if (isHealSuccessful) {
            localStorage.setItem(localStorageCurrentStepLabel, '0');
            location.reload();
            return;
        }

        localStorage.setItem(extensionWorkingLabel, 'false');
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
            getNextEnemyToTryDuel({ allEnemiesCache: undefined, topLvlThreshold, bottomLvlThreshold, lastAttackedEnemyIndex })
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

const reinitExtension = (bkExtensionsWorking: boolean) => {
    if (!bkExtensionsWorking) return;
    fightDuels();
}

reinitExtension(bkExtensionsWorking);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const { highscorePage, topLvlThreshold, bottomLvlThreshold, hasRegexElixir } = request;
    localStorage.clear();
    localStorage.setItem('highscorePage', highscorePage);
    localStorage.setItem('topLvlThreshold', topLvlThreshold);
    localStorage.setItem('bottomLvlThreshold', bottomLvlThreshold);
    localStorage.setItem(extensionWorkingLabel, 'true');
    localStorage.setItem('hasRegexElixir', hasRegexElixir);

    fightDuels();
    sendResponse({ farewell: "goodbye" });
});

