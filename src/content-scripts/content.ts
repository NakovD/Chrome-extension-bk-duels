import { getNextEnemyToTryDuel, tryToDuel, attackPhase2, waitAfterDuel } from './attackingLogic';
import constants from './constants';
import labels from './localStorageLabels';
import localStorageData from './localStorageData';

const {
    currentStepLabel,
    highscorePageLabel,
    topLvlThresholdLabel,
    bottomLvlThresholdLabel,
    hasRegenElixirLabel,
    bkExtensionsWorkingLabel,
} = labels;

const { minimumHealth } = constants;

const {
    currentStep,
    highscorePage,
    lastAttackedEnemyIndex,
    topLvlThreshold,
    bottomLvlThreshold,
    bkExtensionsWorking,
} = localStorageData;

const health = +((document.querySelector('#lifeCount') as HTMLElement).textContent as string);

const goToHighScores = () => {
    if (currentStep !== 0) {
        return;
    }
    const highScoresButton = document.querySelector('#navScores') as HTMLButtonElement;
    localStorage.setItem(currentStepLabel, '1');
    highScoresButton.click();
};

const sortBylevel = () => {
    if (currentStep !== 1) return;
    const sortByLevelIcon = document.querySelector('.iconLevel') as HTMLElement;
    localStorage.setItem(currentStepLabel, '2');
    sortByLevelIcon.click();
};

const choosePage = () => {
    if (currentStep !== 2) return;
    const select = document.querySelector('#highscoreOffset') as HTMLSelectElement;
    select.value = highscorePage.toString();
    localStorage.setItem(currentStepLabel, '3');
    select.dispatchEvent(new Event('change'));
};

const checkHealth = () => {
    if (health <= minimumHealth) return true;
    return false;
};

const heal = () => {
    const potions = document.querySelectorAll('.sourceInventory');
    if (!potions.length) return false;
    const firstPotion = potions[0].querySelector('a') as HTMLAnchorElement;
    firstPotion.click();
    const confirmHealButton = document.querySelector(
        '#topPotionPopup .button:first-child'
    ) as HTMLButtonElement;
    confirmHealButton.click();
    return true;
};

const handleHealingResult = () => {
    setTimeout(() => {
        const isHealSuccessful = heal();
        if (isHealSuccessful) {
            localStorage.setItem(currentStepLabel, '0');
            location.reload();
            return;
        }

        localStorage.setItem(bkExtensionsWorkingLabel, 'false');
    }, 1000);
};

const fightDuels = () => {
    const needToHeal = checkHealth();
    if (needToHeal) {
        handleHealingResult();
        return false;
    }

    switch (currentStep) {
        case 0:
            goToHighScores();
            break;
        case 1:
            sortBylevel();
            break;
        case 2:
            choosePage();
            break;
        case 3:
            getNextEnemyToTryDuel({
                allEnemiesCache: undefined,
                topLvlThreshold,
                bottomLvlThreshold,
                lastAttackedEnemyIndex,
            });
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
};

const reinitExtension = (bkExtensionsWorking: boolean) => {
    if (!bkExtensionsWorking) return;
    fightDuels();
};

reinitExtension(bkExtensionsWorking);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const { highscorePage, topLvlThreshold, bottomLvlThreshold, hasRegenElixir } = request;
    localStorage.clear();
    localStorage.setItem(highscorePageLabel, highscorePage);
    localStorage.setItem(topLvlThresholdLabel, topLvlThreshold);
    localStorage.setItem(bottomLvlThresholdLabel, bottomLvlThreshold);
    localStorage.setItem(bkExtensionsWorkingLabel, 'true');
    localStorage.setItem(hasRegenElixirLabel, hasRegenElixir);
    localStorage.setItem(currentStepLabel, '0');

    fightDuels();
    sendResponse({ farewell: 'goodbye' });
});
