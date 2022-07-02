import constants from "./constants";
const { FIVE_MINS, OVER_TIME } = constants;

const getAmountToWaitAfterDuel = (hasRegenElixir: boolean): number => {
    const amountToWaitAfterDuel = hasRegenElixir ? FIVE_MINS : FIVE_MINS * 2;
    const timeWithOvertime = amountToWaitAfterDuel + OVER_TIME;
    return timeWithOvertime;
}

const parseBoolFromString = (boolAsString: string): boolean => {
    return (boolAsString.toLowerCase() === 'true');
}

export { getAmountToWaitAfterDuel, parseBoolFromString };