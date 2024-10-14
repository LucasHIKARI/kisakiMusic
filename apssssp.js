import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message, Spin } from 'antd';

const App = ({ children }) => {
  const [loading, setLoading] = useState(true); // 控制全局加载状态

//   useEffect(() => {
//     // 如果 localStorage 中没有 "rights"，则发送登录请求
//     if (localStorage.getItem('rights') == null) {
//       axios.defaults.withCredentials = true; // 允许跨域携带 Cookie

//       axios
//         .post(
//           `http://localhost:8800/users/login`,
//           {},
//           {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             withCredentials: true, // 跨域请求
//           },
//         )
//         .then((res) => {
//           if (res.data.length === 0) {
//             message.error('用户名或密码不匹配');
//           } else {
//             // 成功登录，将 token 保存到 localStorage
//             localStorage.setItem('token', JSON.stringify(res.data.data));
//           }
//         })
//         .catch((err) => {
//           console.error('登录请求失败', err);
//         })
//         .finally(() => {
//           setLoading(false); // 登录请求完成，结束加载状态
//         });
//     } else {
//       // 如果已登录，直接结束加载状态
//       setLoading(false);
//     }
//   }, []);

  // 显示全局加载状态，等待登录请求完成
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <Spin size="large" />
      </div>
    );
  }

  // 登录完成后渲染子组件
  return <>{children}</>;
};

export default App;
