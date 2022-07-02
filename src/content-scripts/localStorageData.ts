import { parseBoolFromString } from './helpers';
import { ILocalStorageData } from './models';
import labels from './localStorageLabels';

const {
    currentStepLabel,
    highscorePageLabel,
    lastAttackedEnemyIndexLabel,
    topLvlThresholdLabel,
    bottomLvlThresholdLabel,
    hasRegenElixirLabel,
    bkExtensionsWorkingLabel,
} = labels;

const currentStep = localStorage.getItem(currentStepLabel);
const highscorePage = localStorage.getItem(highscorePageLabel);
const lastAttackedEnemyIndex = localStorage.getItem(lastAttackedEnemyIndexLabel) ?? 0;
const topLvlThreshold = localStorage.getItem(topLvlThresholdLabel) ?? Number.MAX_SAFE_INTEGER;
const bottomLvlThreshold = localStorage.getItem(bottomLvlThresholdLabel) ?? Number.MIN_SAFE_INTEGER;
const hasRegenElixir = localStorage.getItem(hasRegenElixirLabel) ?? 'false';
const isExtensionWorking = localStorage.getItem(bkExtensionsWorkingLabel) ?? 'false';

const isAnyNeededDataNull = currentStep && highscorePage;

const localStorageData: ILocalStorageData = {
    currentStep: currentStep ? +currentStep : 0,
    highscorePage: highscorePage ? +highscorePage : 0,
    lastAttackedEnemyIndex: +lastAttackedEnemyIndex as number,
    topLvlThreshold: +topLvlThreshold as number,
    bottomLvlThreshold: +bottomLvlThreshold as number,
    hasRegenElixir: parseBoolFromString(hasRegenElixir),
    bkExtensionsWorking: isAnyNeededDataNull ? false : parseBoolFromString(isExtensionWorking),
};

export default localStorageData;
