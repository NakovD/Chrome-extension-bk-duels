import { IConstants } from "./models";

const constants: IConstants = {
    localStorageCurrentStepLabel: 'currentStep',
    localStoragelastAttackedEnemyLabel: 'lastAttackedEnemy',
    extensionWorkingLabel: 'bk-extension-working',
    //other
    FIVE_MINS: 300_000,
    OVER_TIME: 30_000,
    minimumHealth: 26
};

export default Object.freeze(constants);