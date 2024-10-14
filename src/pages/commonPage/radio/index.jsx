import React, { useEffect, useState } from 'react';
import {Radio, Carousel, Card, Table, Col, Row, Space, Slider, Button, Divider, Tag } from 'antd';
import axios from 'axios';
import history, { useHistory } from 'umi'
import img1 from '../../../assets/img/radio/类别.jpg'
import img2 from '../../../assets/img/radio/类别2.jpg'
import './index.less'


const picStyle = {
  textAlign: 'center',
  height: '300px',
  width: '98%',
  background: '#364d79',
  overflow: 'hidden',

};

const contentStyle = {
  height: '300px',
  color: '#130000',
  lineHeight: '300px',
  textAlign: 'center',
  background: '#cdf80c71',
};


export default function index() {

  const [RadioList, setRadioList] = useState([])
  const [ACGRadioList, setACGRadioList] = useState([])
  const [dramaList, setdramaList] = useState([])
  const [HistoryRadioList, setHistoryRadioList] = useState([])
  const [LiveRadioList, setLiveRadioList] = useState([])

  const [dotPosition, setDotPosition] = useState('right');
  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };

  const columns = [
    {
      title: '',
      dataIndex: 'picUrl',
      key: 'picUrl',
      render: (v) => { return <img src={v + "?param=80y80"} alt='404' /> }
    },
    {
      title: '歌曲名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '简介',
      dataIndex: 'copywriter',
      key: 'copywriter',

    },
    {
      title: '热评',
      dataIndex: 'rcmdtext',
      key: 'rcmdtext',
      render: (text) => <a>{text}</a>,
    },


  ];


  useEffect(() => {
    // ### 电台 - 推荐
    axios.get('http://localhost:3000/dj/recommend').then(
      res => {
        // console.log(res);
        setRadioList(res.data.djRadios);
      }
    ).catch(((e) => { console.log(e); }))

    // ### 电台 - 分类推荐 ACG
    axios.get('http://localhost:3000/dj/recommend/type?type=3001').then(
      res => {

        setACGRadioList(res.data.djRadios);

      }
    ).catch(((e) => { console.log(e); }))


    // ### 电台 - 分类推荐 生活
    axios.get('http://localhost:3000/dj/recommend/type?type=6').then(
      res => {

        setLiveRadioList(res.data.djRadios);

      }
    ).catch(((e) => { console.log(e); }))

    // ### 电台 - 分类推荐 人文历史
    axios.get('http://localhost:3000/dj/recommend/type?type=3080098').then(
      res => {

        setHistoryRadioList(res.data.djRadios);

      }
    ).catch(((e) => { console.log(e); }))

    // ### 电台 - 分类推荐 情感
    axios.get('http://localhost:3000/dj/recommend/type?type=3').then(
      res => {

        setdramaList(res.data.djRadios);

      }
    ).catch(((e) => { console.log(e); }))
 

  }, [])




  return (
    <>
      <div>
        <div style={{ width: "100%", float: 'left' }}>

          <Card /* title="图片轮播" */>
          <Carousel dotPosition={dotPosition}>
            <div>
              <h3 style={contentStyle}>       
               <img style={picStyle} src={img1} alt="" />
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>       
               <img style={picStyle} src={img2} alt="" />
              </h3>
            </div>
          </Carousel>
          </Card>


          
        </div>

        <div style={{ width: '45%', float: 'left' }}>
          <p>猜你喜欢  </p>
          <Table rowKey={record => record.id} columns={columns} dataSource={ACGRadioList} />

        </div>
        <div style={{ width: '45%', float: 'right' }}>

          <p>电台排行榜  </p>
          <Table rowKey={record => record.id} columns={columns} dataSource={RadioList} />

        </div>

        {/* 3088097 */}
        <Divider orientation="left">电台·情感</Divider>
        <ul className="main-list">
          {
            dramaList.slice(0, 6).map((item, index) => {
              return <li style={{
                display: 'inline-block', width: '190px',
                height: '200px', paddingLeft: '40px'
              }}> <div>
                  <div
                    key={item.id}
                    style={{
                      width: '140px',
                      height: '140px'
                    }}
                    /*  currentRanking={index+1}  */
                    className="radio_item"
                    /* coverPic={index < 3?item.al.picUrl:''}
                    duration={formatMinuteSecond(item.dt)} */
                    songName={item.name}
                    songId={item.id}
                  >
                    <img src={item.picUrl + "?param=140y140"} alt='404' /* onError={this.setImgurl} */ />

                  </div>

                  <div>
                    <p><a>{item.name}</a></p>
                  </div>

                </div>
              </li>
            })
          }
        </ul>

        {/* 6 */}
        <Divider orientation="left">电台·生活</Divider>
        <ul className="main-list">
          {
            LiveRadioList.slice(0, 6).map((item, index) => {
              return <li style={{
                display: 'inline-block', width: '190px',
                height: '200px', paddingLeft: '40px'
              }}> <div>
                  <div
                    key={item.id}
                    style={{
                      width: '140px',
                      height: '140px'
                    }}
                    /*  currentRanking={index+1}  */
                    className="radio_item"
                    /* coverPic={index < 3?item.al.picUrl:''}
                    duration={formatMinuteSecond(item.dt)} */
                    songName={item.name}
                    songId={item.id}
                  >
                    <img src={item.picUrl + "?param=140y140"} alt='404' /* onError={this.setImgurl} */ />

                  </div>

                  <div>
                    <p style={{width:'100%',height:'100%'}}><a>{item.name}</a></p>
                  </div>

                </div>
              </li>
            })
          }
        </ul>

        {/* 3080098 */}
        <Divider orientation="left">电台·人文历史</Divider>
        <ul className="main-list">
          {
            HistoryRadioList.slice(0, 6).map((item, index) => {
              return <li style={{
                display: 'inline-block', width: '190px',
                height: '200px', paddingLeft: '40px'
              }}> <div>
                  <div
                    key={item.id}
                    style={{
                      width: '140px',
                      height: '140px'
                    }}
                    /*  currentRanking={index+1}  */
                    className="radio_item"
                    /* coverPic={index < 3?item.al.picUrl:''}
                    duration={formatMinuteSecond(item.dt)} */
                    songName={item.name}
                    songId={item.id}
                  >
                    <img src={item.picUrl + "?param=140y140"} alt='404' /* onError={this.setImgurl} */ />

                  </div>

                  <div>
                    <p><a>{item.name}</a></p>
                  </div>

                </div>
              </li>
            })
          }
        </ul>


      </div>
    </>

  )
}
