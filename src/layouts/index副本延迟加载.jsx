import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from '.';
import axios from 'axios';
import { useHistory } from 'umi'



function LoadingSpinner() {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}


export default function AppWrapper(props) {
  const [loading, setLoading] = useState(true);
  const history = useHistory()

  // 把cookie的token发到后端鉴权
  // 假如响应慢的话，其他组件获取不到必要数据，需要优化
  // if (localStorage.getItem('token') == null) {
  useEffect(() => {   
      axios.defaults.withCredentials = true; //Cookie跨域

      axios
        .post(
          `http://localhost:8800/users/login`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true, // 添加这个选项跨域
          },
        )
        .then((res) => {
          console.log('res', res);
          if (res.data.length === 0) {
            message.error('用户名或密码不匹配');
          } else {
            console.log('res.data', res.data);
            console.log('res.data[0]', res.data[0]);
            // 下面两行是jsonserver模拟数据
            // console.log('JSON.stringify(res.data[0])',JSON.stringify(res.data[0]));
            // localStorage.setItem('token',JSON.stringify(res.data[0]))
            // 下面是替换为自己数据库的数据
            console.log(
              'JSON.stringify(res.data.data)',
              JSON.stringify(res.data.data),
            );
            localStorage.setItem('token', JSON.stringify(res.data.data));
            // history.push('/home')
          }
          setLoading(false);
        });
       
  },[]);
// }

  return loading ? <LoadingSpinner/> : <App/>;
}
ReactDOM.render(<AppWrapper/>, document.getElementById('root'));