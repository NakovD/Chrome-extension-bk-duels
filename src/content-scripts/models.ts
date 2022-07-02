export interface ILocalStorageData {
    currentStep: number;
    highscorePage: number;
    lastAttackedEnemyIndex: number;
    topLvlThreshold: number;
    bottomLvlThreshold: number;
    bkExtensionsWorking: boolean;
    hasRegexElixir: boolean;
}

export interface IConstants {
    localStorageCurrentStepLabel: string;
    localStoragelastAttackedEnemyLabel: string;
    extensionWorkingLabel: string;
    FIVE_MINS: number;
    OVER_TIME: number;
    minimumHealth: number;
}