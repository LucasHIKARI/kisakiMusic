import { useState,useRef,useEffect } from 'react';
import { Layout, Button, Dropdown, Space, Avatar, Input, Menu, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import React from 'react';
import history, { useHistory } from 'umi'
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
// import usecollapsed from '../models/usecollapsed';
import './Header.less'
import axios from 'axios';
 import store from '../redux/store'; 



const { Header } = Layout;
const { Search } = Input;

export default function header() {
  // const {collapsed,changecollapsed} = usecollapsed()
  const [collapsed, setCollapsed] = useState(false)
  const history = useHistory()
  // const { role: { roleName }, username } = JSON.parse(localStorage.getItem('token'))
  // const { roleName , username } = JSON.parse(localStorage.getItem('token'))
  const [menulist, setmenulist] = useState([])
  /* const [musiclist, setmusiclist] = useState([])
  const [songCount, setsongCount] = useState([]) */
  const [searchInfo, setsearchInfo] = useState("")
  const  searchRef =useRef()
  const [searchSong, setSearchSong] = useState(null)// 搜索歌曲名字
 const { roleName , username } = JSON.parse(localStorage.getItem('token'));



  const change = () => {
    setCollapsed(!collapsed)
  }
  

  const onSearch = (value) => {
    // console.log("location.pathname",location.pathname);
    history.push("/find")
    console.log(value);
    setsearchInfo(searchRef.current.value);
    // 直接手动写了个action对象
    store.dispatch({type:"query_song",data:value})
  }





  /*   const check = (list) => {
      return list.map((item) => {
        if (item.children && checkpermisson(item) && item.children.length > 0) {
  
          return {
            key: item.key,
            label: item.title,
            icon: iconList[item.key],
            children: check(item.children)
          }
        }
  
        return checkpermisson(item) && {
          key: item.key,
          icon: iconList[item.key],
          label: item.title
        }
      })
    } */
const menuList =[
  {
    key:'/home',
    label:'首页'
  },

  {
    key:'/find',
    label:'发现音乐'
  },
 
  {
    key:'/mypage',
    label:'我的音乐'
  },
  {
    key:'/commonPage/share-forum',
    label:'分享论坛(内测中)'
  },
  {
    key:'/commonPage/radio',
    label:'热门电台'
  }
]


  const onClick = (e) => {
    /* console.log('click ', e); */
    setmenulist(e.key);
/*     console.log(e.key);
    console.log("location.pathname",location.pathname); */
    history.push(e.key)
  };

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" /* href="https://www.antgroup.com "*/>
          角色：{roleName}&nbsp;用户名： {username} &nbsp;
        </a>
      ),
    },
    {
      key: '2',
      label: (
      /*   <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          マイページ
        </a>
 */
        <a onClick={() => {
           history.push('/mypage') 
        }}>
          マイページ
        </a>
      ),
     /*  icon: <SmileOutlined />, */
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
         我的消息
        </a>
      ),
      /* disabled: true, */
    },
    {
      key: '4',
     
      label: (
        <a onClick={() => {
          /* history.push('/login') */
        }}>
          VIP会员
        </a>
      ),
    },
    {
      key: '5',
      
      label: (
        <a onClick={() => {
   
          /* history.push('/login') */
        }}>
          个人设置
        </a>
      ),
    },
    {
      key: '6',
      
      label: (
        <a onClick={() => {
        
        /*   history.push('/login') */
        }}>
         实名认证
        </a>
      ),
    },
    {
      key: '7',
      danger: true,
      label: (
        <a onClick={() => {
          localStorage.setItem('token', '')
          history.push('/login')
        }}>
          サインアウト
        </a>
      ),
    },

  ];
  return (

    <Header className="site-layout-background" style={{ padding: '0 20px' }}>

      <div className='leftTab' style={{ float: 'left', display: 'inline-block' }}>
        <div className="logo"></div>
        <Menu theme="dark"
         mode="horizontal" 
         items={menuList}  
         onClick={onClick}
         /* selectedKeys={[menulist]}  */
         selectedKeys={[menulist]} 
         defaultOpenKeys={['/' + location.pathname.split('/')[1]]}
         />

      </div>
      {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
      onClick: () => setCollapsed(!collapsed),
    })} */}


      <div className='rightTab' style={{ float: 'right', display: 'inline-block' }}>
        {
          collapsed ? <MenuUnfoldOutlined onClick={change} /> : <MenuFoldOutlined onClick={change} />
        }

        <Space  className="site-button-ghost-wrapper" wrap>
          <Button ghost shape="round" > 会员中心（未开放）</Button>
        </Space>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Dropdown
          menu={{
            items,
          }}>
          <Space>
            <Avatar shape="circle" size={50} icon={<UserOutlined />} />
          </Space>
        </Dropdown>
      </div>

      
      <div className='search' style={{
      paddingTop:'20px',
      paddingInline:'10px'
      }} >
          <Search 
          placeholder="音乐/视频/电台/用户 "
          onSearch={onSearch} 
/*           onSearch={(searchSong) => {setSearchSong(searchSong);console.log(searchSong);history.push("/find")}} 
 */           /* value={searchSong} */
          allowClear
          ref={searchRef}
       
        />
       </div>

    </Header>

  )
}
