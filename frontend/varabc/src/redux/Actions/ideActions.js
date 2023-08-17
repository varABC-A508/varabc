
export const setMode = (mode) => ({
    type: 'SET_MODE',
    payload: mode,
});

export const setFontSize = (fontSize) => ({
    type: 'SET_FONT_SIZE',
    payload: fontSize,
});

export const setTheme = (theme) => ({
    type: 'SET_THEME',
    payload: theme,
});

export const setIsIdeShown = (isIdeShown) => ({
    type: 'SET_IS_IDE_SHOWN',
    payload: isIdeShown,
});

export const setIsPractice = (isPractice) => ({
    type: 'SET_IS_PRACTICE',
    payload: isPractice,
});

export const setIsPlayerTurn = (isPlayerTurn) => ({
    type: 'SET_IS_PLAYER_TURN',
    payload: isPlayerTurn,
});