import constants from "./constants";
import { parseBoolFromString } from "./helpers";
import { ILocalStorageData } from "./models";

const { localStorageCurrentStepLabel, extensionWorkingLabel, localStoragelastAttackedEnemyLabel } = constants;

const currentLocalStorageData = {
    currentStep: localStorage.getItem(localStorageCurrentStepLabel),
    highscorePage: localStorage.getItem('highscorePage'),
    lastAttackedEnemyIndex: localStorage.getItem(localStoragelastAttackedEnemyLabel),
    topLvlThreshold: localStorage.getItem('topLvlThreshold'),
    bottomLvlThreshold: localStorage.getItem('bottomLvlThreshold'),
    hasRegexElixir: localStorage.getItem('hasRegexElixir'),
}

const isExtensionWorking = localStorage.getItem(extensionWorkingLabel) ?? 'false';

const isAnyDataNull = Object.values(currentLocalStorageData).some(el => el === null);

const localStorageData: ILocalStorageData = { ...currentLocalStorageData as unknown as ILocalStorageData, bkExtensionsWorking: isAnyDataNull ? isAnyDataNull : parseBoolFromString(isExtensionWorking) };

export default localStorageData;