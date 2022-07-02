import { ILocalStorageData } from './models';

export default {
    currentStepLabel: nameof<ILocalStorageData>(x => x.currentStep),
    highscorePageLabel: nameof<ILocalStorageData>(x => x.highscorePage),
    lastAttackedEnemyIndexLabel: nameof<ILocalStorageData>(x => x.lastAttackedEnemyIndex),
    topLvlThresholdLabel: nameof<ILocalStorageData>(obj => obj.topLvlThreshold),
    bottomLvlThresholdLabel: nameof<ILocalStorageData>(obj => obj.bottomLvlThreshold),
    bkExtensionsWorkingLabel: nameof<ILocalStorageData>(obj => obj.bkExtensionsWorking),
    hasRegexElixirLabel: nameof<ILocalStorageData>(obj => obj.hasRegexElixir),
};
