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
  const [rights, setRights] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);

    if (token) {
      try {
        const { rights } = JSON.parse(token);
        // console.log('Parsed rights:', rights);
        setRights(rights);
      } catch (error) {
        console.error('Token解析错误', error);
      }
    }
  }, []);

  // todo:
  // ログインしたユーザーの権限に応じて、
  // 左側の管理メニューおよびウェブページのオプションを表示するかを判断する必要があります
  useEffect(() => {
    axios.get('http://localhost:8800/right-manage/right/list').then(
      res => {
        console.log("menulist", res);
        setmenulist(res.data.data[1].children)
      }
    )
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {  
      try {
        const parsedToken = JSON.parse(token);
        if (parsedToken.roleId && parsedToken.roleId >= 4) {
          toggleCollapsed();
        }
      } catch (error) {
        console.error('Token 解析错误', error);
      }
    }
  }, []);

  const checkpermisson = (per) => {
    return per.status == 1 && rights.includes(per.path)
  }



  const check = (list) => {
    return list.map((item) => {
      // ユーザー管理はリスト表示のみ
      if (item.path === '/user-manage') {
        const listItem = item.children.find(child => child.path === '/user-manage/list');
        if (listItem && checkpermisson(listItem)) {
          return {
            key: listItem.path,
            icon: iconList[listItem.path],
            label: listItem.name
          };
        }
        return null;
      }
      // 権限/ロール管理はリスト表示のみ
      if (item.path === '/right-manage') {
        const listItem = item.children.find(child => child.path === '/right-manage/role/list');
        if (listItem && checkpermisson(listItem)) {
          return {
            key: listItem.path,
            icon: iconList[listItem.path],
            label: listItem.name
          };
        }
        return null;
      }


      if (item.children && checkpermisson(item) && item.children.length > 0) {

        return {
          key: item.path,
          label: item.name,
          icon: iconList[item.path],
          children: check(item.children)
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





  return (
    <Sider theme="light" trigger={null} collapsedWidth={1} collapsible collapsed={collapsed} >
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>

        <div style={{ flex: 1, overflow: 'auto' }}>

          <Menu
            theme="light"
            mode="inline"
            // defaultSelectedKeys={['/home']}
            selectedKeys={[location.pathname]}
            defaultOpenKeys={['/' + location.pathname.split('/')[1]]}
            items={check(menulist)}
            onClick={({ key }) => {
              console.log(key);
              history.push(key)
              console.log(location.pathname);

            }}
          >

          </Menu>
        </div>
      </div>
    </Sider>
  )





}
