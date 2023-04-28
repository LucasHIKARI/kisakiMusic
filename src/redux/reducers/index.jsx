// 汇总reducer


import {combineReducers} from 'redux'
import headerReducer from'./header_reducer'
import homePlayReducer from './homePlay'

// combineReducers()会爆类型错误，先不汇总reducer

export default combineReducers({headerReducer:headerReducer,homePlayReducer:homePlayReducer})

// console.log("allReducer",allReducer);
console.log("headerReducer",headerReducer);
console.log("homePlayReducer",homePlayReducer);
 
