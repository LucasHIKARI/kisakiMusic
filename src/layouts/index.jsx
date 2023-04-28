
import React, { useState, useEffect } from 'react';
import { Layout, Button, Menu, Space, theme, Breadcrumb } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import Sider from '../components/Sider'
import Header from '../components/Header'
// import Footer from '../components/Footer'
import './index.less'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Provider } from 'react-redux'

const { Content, Footer } = Layout;




export default function App(props) {

 



  NProgress.start();
  useEffect(() => {
    NProgress.done();
  })

//   setTimeout(() => {
    if (
        props.location.pathname === '/login' ||
        props.location.pathname === '/login/*' ||
        props.location.pathname === '/find' ||
        props.location.pathname === '/news/' ||
        props.location.pathname.includes('/detail')
    
      ) {
        return <div>{props.children}</div>;
      }
// }, 5000); // 7秒后执行
 

  /*  const {
     token: { colorBgContainer },
   } = theme.useToken();
  */
  return (

      <Layout>


        <Header className="header"></Header>


        <Layout>
          <Sider></Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                overflow: 'auto'
              }}
            >
              {props.children}
            </Content>
          </Layout>
        </Layout>

        {/* <Footer
        style={{
          margin: '24px 16px',
          overflow: 'visible',
          textAlign: 'center',
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer> */}


      </Layout>


  )
}





