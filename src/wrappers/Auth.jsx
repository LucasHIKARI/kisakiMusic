import React, { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'umi';

// 该组件用于权限判断



const Auth = (props) => {
  const [backRouteList, setbackRouteList] = useState([])
  const location = useLocation()

  const isLogin = localStorage.getItem('token')
  // 下面是jsonserver的数据获取方式
  // const { role: { rights } } = JSON.parse(localStorage.getItem('token'))
  // 下面是从自己数据库获取
  const { rights  } = JSON.parse(localStorage.getItem('token'))
  // 下面是jsonserver的数据获取方式
  // console.log(rights)
  // rights.checked.push('/')
  // if (isLogin) {
  //   if (rights.checked.includes(location.pathname)) {
  //     return <div>{props.children}</div>;
  //   }
  //   return <Redirect to="/404" />;
  // }
  // return <Redirect to="/login" />;

  // 下面是从自己数据库获取
  console.log(rights)
  rights.push('/')
  if (isLogin) {
    if (rights.includes(location.pathname)) {
      return <div>{props.children}</div>;
    }
    return <Redirect to="/404" />;
  }
  return <Redirect to="/login" />;

};

export default Auth;