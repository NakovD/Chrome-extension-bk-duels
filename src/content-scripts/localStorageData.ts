import { parseBoolFromString } from './helpers';
import { ILocalStorageData } from './models';
import labels from './localStorageLabels';

const {
    currentStepLabel,
    highscorePageLabel,
    lastAttackedEnemyIndexLabel,
    topLvlThresholdLabel,
    bottomLvlThresholdLabel,
    hasRegexElixirLabel,
    bkExtensionsWorkingLabel,
} = labels;

const currentLocalStorageData = {
    currentStep: localStorage.getItem(currentStepLabel),
    highscorePage: localStorage.getItem(highscorePageLabel),
    lastAttackedEnemyIndex: localStorage.getItem(lastAttackedEnemyIndexLabel),
    topLvlThreshold: localStorage.getItem(topLvlThresholdLabel),
    bottomLvlThreshold: localStorage.getItem(bottomLvlThresholdLabel),
    hasRegexElixir: localStorage.getItem(hasRegexElixirLabel),
};

const isExtensionWorking = localStorage.getItem(bkExtensionsWorkingLabel) ?? 'false';

const isAnyDataNull = Object.values(currentLocalStorageData).some(el => el === null);

const localStorageData: ILocalStorageData = {
    ...(currentLocalStorageData as unknown as ILocalStorageData),
    bkExtensionsWorking: isAnyDataNull ? isAnyDataNull : parseBoolFromString(isExtensionWorking),
};

export default localStorageData;
