import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'umi'
import {
  KeyOutlined,
  AuditOutlined,
  BarsOutlined,
  HomeOutlined,
  NodeExpandOutlined,
  ReadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MonitorOutlined

} from '@ant-design/icons'
import { Layout, Menu, theme, Button } from 'antd';
const { Header, Sider, Content } = Layout;
import './Sider.less'
import axios from 'axios';



export default function sider() {
  const [collapsed, setCollapsed] = useState(false)
  const history = useHistory()
  const [menulist, setmenulist] = useState([])
  const iconList = {
    '/home': <HomeOutlined />,
    '/user-manage': <AuditOutlined />,
    '/user-manage/list': <BarsOutlined />,
    '/right-manage/role/list': <BarsOutlined />,
    '/right-manage/right/list': <BarsOutlined />,
    '/right-manage': <KeyOutlined />,
    '/news-manage': <ReadOutlined />,
    '/audit-manage': <MonitorOutlined />,
    '/publish-manage': <NodeExpandOutlined />,
  }
  // const { role: { rights } } = JSON.parse(localStorage.getItem('token'))
  const { rights } = JSON.parse(localStorage.getItem('token'))


  useEffect(() => {
    console.log("rights",rights);
    /* axios.get('http://localhost:3004/rights?_embed=children').then( */
    axios.get('http://localhost:8800/right-manage/right/list').then(
      res => {
        // console.log(res);
        // console.log(res.data.data[1].children);
        setmenulist(res.data.data[1].children)
      }
    )
  }, [])



  // const checkpermisson = (per) => {
  //   // 替换为自己数据库数据，暂时这个写死
  //   // return per.pagepermission === 1
  //   return per.pagepermission && rights.includes(per.path)
  // }

  const checkpermisson = (per) => {
    // 替换为自己数据库数据，暂时这个写死
    // return per.pagepermission === 1
    return per.status && rights.includes(per.path)
  }

  const check = (list) => {
    return list.map((item) => {
     /*  console.log(item); */
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
  }

  const check2 = (list) => {
    return list.map((item) => {
  //  console.log(item); 
      if (item.children && checkpermisson(item) && item.children.length > 0) {

        return {
          key: item.path,
          label: item.name,
          icon: iconList[item.path],
          children: check2(item.children)
        }
      }

      return checkpermisson(item) && {
        key: item.path,
        icon: iconList[item.path],
        label: item.name
      }
    })
  }


  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };


  useEffect(() => { 
    // 在此可以执行任何带副作用操作
    /* console.log(localStorage.getItem('token'));
    console.log(JSON.parse(localStorage.getItem('token')));
    console.log(JSON.parse(localStorage.getItem('token')).roleId); */
    if((JSON.parse(localStorage.getItem('token'))).roleId >=4){
      toggleCollapsed();
    }
   /*  return () => { // 在组件卸载前执行
     // 在此做一些收尾工作, 比如清除定时器/取消订阅等
    } */
  }, [])


  return (
    <Sider theme="light"  trigger={null} collapsedWidth={1} collapsible collapsed={collapsed} >
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>

        <div style={{ flex: 1, overflow: 'auto' }}>

          <Menu
            theme="light"
            mode="inline"
            // defaultSelectedKeys={['/home']}
            selectedKeys={[location.pathname]}
            defaultOpenKeys={['/' + location.pathname.split('/')[1]]}
            items={check2(menulist)}
            // items={menulist}
            onClick={({ key }) => {
              console.log(key);
              history.push(key)
              console.log(location.pathname);

            }}
          >

            {/* {renderMenu(menuList)} */}
          </Menu>
        </div>
      </div>
    </Sider>
  )





}
