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
    FIVE_MINS: number;
    OVER_TIME: number;
    minimumHealth: number;
}
