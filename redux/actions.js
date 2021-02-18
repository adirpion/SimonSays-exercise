export const increaseScore = () => {
    return {
        type: "INCREASE_SCORE"
    } 
}

export const resetScore = () => {
    return {
        type: "RESET_SCORE"
    } 
}

export const setPlayerResult = (name, score) => {
    return {
        type: "SET_PLAYER_RESULT",
        newPlayer: {name, score}        
    } 
}

export const deletePlayerWithLowscore = (name) => {
    return {
        type: "DELETE_LOW_SCORE_USER",
        name: name
    }
}