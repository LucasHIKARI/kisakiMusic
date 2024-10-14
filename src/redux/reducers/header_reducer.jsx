import {QUERY_SONG,DELETE_SONG,DISPATH_SONG_ID,DISPATH_SONGLIST_ID}from '../constant'

// action直接写在Header

const initState = ""
  function headerReducer(state=initState, action) {
        // console.log(state);
    const {type,data} = action
    switch (type) {
      case QUERY_SONG:
        console.log("query_song",data);
        return data

      case DISPATH_SONG_ID:
        console.log("DISPATH_SONG_ID",data);
        return data

      case DISPATH_SONGLIST_ID:
        console.log("DISPATH_SONGLIST_ID",data);
          return data
          
        default:
        return state
    }
  }
  
  export default headerReducer