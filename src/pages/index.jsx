import { Redirect } from 'umi';
import React, { useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';


console.log('Index start');

const Index = () => {
  useEffect(() => {
    console.log('Index useEffect start');

    // 权限检查，如果没有 `rights` 执行登录请求
    if (localStorage.getItem('rights') == null) {
      axios.defaults.withCredentials = true; // Cookie 跨域
      console.log('Index useEffect start');

      axios
        .post(
          `http://localhost:8800/users/login`,
          {username:"adminChinese",
          password:"123456"
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true, // 跨域请求
          },
        )
        .then((res) => {
          console.log('res', res);
          if (res.data.length === 0) {
            message.error('用户名或密码不匹配');
          } else {
            console.log('res.data', res.data);
            // 将数据存储到 localStorage
            localStorage.setItem('token', JSON.stringify(res.data.data));
          }
        })
        .catch((err) => {
          console.error('登录请求失败', err);
        });
    }
  }, []);

  // 有token默认跳转home
  return <Redirect to='/home' />;
};

// 导出函数组件
export default Index;
