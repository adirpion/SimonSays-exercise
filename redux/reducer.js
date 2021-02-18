const initialState = {
    topTen: [],
    score: 0,
}

function reducer(state = initialState , {type, newPlayer, name} ){
    switch(type){
        case "INCREASE_SCORE":
            return {
                ...state,
                score: state.score + 1
            }

        case "RESET_SCORE":
            return {
                ...state,
                score: state.score = 0
            } 
        
        case "SET_PLAYER_RESULT":
            return { 
                ...state,
                topTen: [...state.topTen,newPlayer]
            }

        case "DELETE_LOW_SCORE_USER":
            const newList = state.topTen.filter(player => player.name !== name)
            return{
                ...state,
                topTen: newList
            }
        
        default: return state
        
    }
}

export default reducer;