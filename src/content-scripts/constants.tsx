interface IConstants {
    localStorageCurrentStepLabel: string;
    localStoragelastAttackedEnemyLabel: string;
    extensionWorkingLabel: string;
    FIVE_MINS: number;
    OVER_TIME: number;
    minimumHealth: number;
}


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