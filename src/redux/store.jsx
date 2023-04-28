import {createStore,applyMiddleware} from 'redux'

import {composeWithDevTools}from 'redux-devtools-extension'
import thunk from 'redux-thunk'
// 引入汇总后的reducers,会报错暂时不用 
// import reducers from './reducers/index'



import headerReducer from './reducers/header_reducer'
// import homePlayReducer from './homePlay'


export default createStore(headerReducer,composeWithDevTools(applyMiddleware(thunk)))


// export function createStore(headerReducer,composeWithDevTools(applyMiddleware(thunk)))
// export function createStore(homePlayReducer,composeWithDevTools(applyMiddleware(thunk)))

//  export{createHeaderStore,createHomeStore}
