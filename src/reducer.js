export default function reducer(state={},action){
    if(action.type === "add"){
        return {...state,...action.playload};
    }
    return state;
}