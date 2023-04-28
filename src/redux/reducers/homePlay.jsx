

const defaultState = 0
  
  function homePlayReducer(state = defaultState, action) {
        console.log(state);
    const {type,data} = action
    switch (type) {
      case "querySongUrl":
        console.log("querySongUrl",data);
       
        return data
      case "querySongListUrl":
        console.log("querySongListUrl",data);

        return data
      default:
        return state
    }
  }
  
  export default homePlayReducer