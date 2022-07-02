import labels from './localStorageLabels';
import { parseBoolFromString, getAmountToWaitAfterDuel } from './helpers';

const { currentStepLabel, lastAttackedEnemyIndexLabel } = labels;
const currentStep = +(localStorage.getItem(currentStepLabel) as string);

const _hasRegenElixir = localStorage.getItem('hasRegexElixir') as string;
const hasRegenElixir = parseBoolFromString(_hasRegenElixir);

interface INextEnemyToDuelArgs {
    allEnemiesCache?: Element[] | NodeListOf<Element>;
    topLvlThreshold: number;
    bottomLvlThreshold: number;
    lastAttackedEnemyIndex: number;
}

const getNextEnemyToTryDuel = ({
    allEnemiesCache,
    topLvlThreshold,
    bottomLvlThreshold,
    lastAttackedEnemyIndex,
}: INextEnemyToDuelArgs): void => {
    if (currentStep !== 3) return;
    const allEnemiesToAttack =
        allEnemiesCache || getAllEnemiesFromSpecificLevels(topLvlThreshold, bottomLvlThreshold);
    localStorage.setItem(currentStepLabel, '4');
    if (lastAttackedEnemyIndex === allEnemiesToAttack.length - 1) {
        localStorage.setItem(currentStepLabel, 'stop');
    }
    const neededEnemy = allEnemiesToAttack[lastAttackedEnemyIndex];
    if (hasRegenElixir)
        return shortDuelAttack({
            enemyNode: neededEnemy,
            allEnemiesCache: allEnemiesToAttack,
            topLvlThreshold,
            bottomLvlThreshold,
            lastAttackedEnemyIndex,
        });
    openEnemyProfile(neededEnemy);
};

const getAllEnemiesFromSpecificLevels = (upperTreshold: number, lowerTreshold: number) => {
    const allEnemiesOnThisPage = document.querySelectorAll(
        '#highscoreTable tbody tr:not(.userSeperator)'
    );
    if (!upperTreshold && !lowerTreshold) return allEnemiesOnThisPage;
    const allEnemiesInTresholds = Array.from(allEnemiesOnThisPage).filter(e => {
        const currentEnemyLevelBox = e.querySelector('.highscore04') as HTMLElement;
        const currentEnemyLevel = Number(currentEnemyLevelBox?.textContent);
        return currentEnemyLevel <= upperTreshold && currentEnemyLevel >= lowerTreshold;
    });
    return allEnemiesInTresholds;
};

const openEnemyProfile = (enemyNode: Element) => {
    const enemyName = enemyNode.querySelector('#playerLink') as HTMLElement;
    enemyName?.click();
};

const tryToDuel = (lastAttackedEnemyIndex: number) => {
    if (currentStep !== 4) return;
    const isEnemyAvailableForAttack = checkIfEnemyIsAvailableForAttack();
    localStorage.setItem(lastAttackedEnemyIndexLabel, `${lastAttackedEnemyIndex + 1}`);
    if (!isEnemyAvailableForAttack) {
        localStorage.setItem(currentStepLabel, '0');
        location.reload();
        return;
    }

    localStorage.setItem(currentStepLabel, '5');
    attackEnemy();
};

const checkIfEnemyIsAvailableForAttack = () => {
    const attackButton = document.querySelector('#devAttackBtn');
    if (attackButton?.classList.contains('disabledBtn')) {
        return false;
    }
    return true;
};

const attackEnemy = () => {
    const attackButton = document.querySelector('#devAttackBtn') as HTMLElement;
    attackButton?.click();
};

const attackPhase2 = () => {
    if (currentStep !== 5) return;
    localStorage.setItem(currentStepLabel, '6');
    attackEnemy();
};

interface IShortDuelArgs {
    enemyNode: Element;
    allEnemiesCache: Element[] | NodeListOf<Element>;
    topLvlThreshold: number;
    bottomLvlThreshold: number;
    lastAttackedEnemyIndex: number;
}

const shortDuelAttack = ({
    enemyNode,
    allEnemiesCache,
    topLvlThreshold,
    bottomLvlThreshold,
    lastAttackedEnemyIndex,
}: IShortDuelArgs) => {
    const canDoShortAttack = document.querySelectorAll('.quickAttack').length;
    if (!canDoShortAttack) openEnemyProfile(enemyNode);
    const quickAttackButton = enemyNode.querySelector('.quickAttack') as HTMLElement;
    const canAttackEnemy = !quickAttackButton?.classList.contains('disabled');
    if (!canAttackEnemy)
        return getNextEnemyToTryDuel({
            allEnemiesCache,
            topLvlThreshold,
            bottomLvlThreshold,
            lastAttackedEnemyIndex: lastAttackedEnemyIndex + 1,
        });
    localStorage.setItem(currentStepLabel, '6');
    localStorage.setItem(lastAttackedEnemyIndexLabel, `${lastAttackedEnemyIndex + 1}`);
    quickAttackButton?.click();
};

const waitAfterDuel = () => {
    if (currentStep !== 6) return;
    const amountToWaitAfterDuel = getAmountToWaitAfterDuel(hasRegenElixir);
    const cbToCallAfterWaitIsOver = () => {
        localStorage.setItem(currentStepLabel, '0');
        location.reload();
    };
    setTimeout(cbToCallAfterWaitIsOver, amountToWaitAfterDuel);
};

export { getNextEnemyToTryDuel, tryToDuel, attackPhase2, waitAfterDuel };
