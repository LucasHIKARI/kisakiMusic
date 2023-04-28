import { Redirect } from 'umi'
import React from 'react'



const index = () => {
    return (
        // 有token默认跳转home
        <Redirect to='/home'/> 
    )
}
// 没token进行权限判断wrappers的Auth
// index.wrappers = ['@/wrappers/Auth'];
export default index