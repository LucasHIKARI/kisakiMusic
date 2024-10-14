import React, { useEffect, useState } from 'react';
import { Carousel, Card, Table, Col, Row, Space, Slider, Button, Divider , Tag} from 'antd';
import axios from 'axios';
import history, { useHistory } from 'umi'

export default function index() {
  // 下面的是jsonserver的数据
  // const { role: { roleName }, username } = JSON.parse(localStorage.getItem('token'))
  const { roleName , username } = JSON.parse(localStorage.getItem('token'))
  const [HotSongList, setHotSongList] = useState([])
  const [GuessSongList2, setGuessSongList2] = useState([])

  useEffect(() => {

    axios.get('http://localhost:3000/top/playlist?cat=ACG').then(
        res => {
          setGuessSongList2(res.data.playlists);
        }
    ).catch(((e) => { console.log(e); }))

    axios.get('http://localhost:3000/top/playlist?cat=日语').then(
      res => {

        setHotSongList(res.data.playlists);
      }
  ).catch(((e) => { console.log(e); }))

}, [])

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Times',
    dataIndex: 'times',
    key: 'times',
  },
  
 
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    times: 32,

  },
  {
    key: '2',
    name: 'Jim Green',
    times: 42,

  },
  {
    key: '3',
    name: 'Joe Black',
    times: 32,

  },
];

  return (


    <div style={{ width: "100%", padding: "20px" }}>
      <div  /* style={{ float: "left", display: "inline-block" }} */>

        <div style={{ width: "50%", height: "100%", float: "left", display: "inline-block", textAlign: "center" }}>
          <img src="http://p1.music.126.net/jNqRncgA_CsGWba4-0M72Q==/109951163082393914.jpg?param=185y185" alt="404" /* style={{ width: "90px", height: "90px" }} */ />
        </div>

        <div style={{ width: "50%", height: "100%", textAlign: "left", float: "left", display: "inline-block" }}>
          <h4>用户名：&nbsp; {username}</h4> 等级：&nbsp;{roleName} <Button float="right">编辑个人资料</Button>
          <Divider></Divider>

          <span>动态: 12</span>
          <Divider type="vertical" />
          <span>关注: 55</span>
          <Divider type="vertical" />
          <span>粉丝:111 </span>

          <p>个人介绍：</p>
          <p> 所在地区：</p>
          <p>社交网络：</p>



        </div>

      </div>

      <div>
        <div><h3 style={{ display: "inline" }}>听歌排行</h3>&nbsp;&nbsp;&nbsp;&nbsp;<a>查看全部 ></a></div>
        <Divider></Divider>
        {/* <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
          <li style={liStyle}><div> <img src="http://p2.music.126.net/FIQXtGyweLetV-6VredoMg==/109951163336004162.jpg?param=200y200" alt="" style={{ height: "60px", width: "60px" }} />&nbsp;&nbsp;Caligula卡里古拉 黑化曲专辑</div></li>
          <li style={liStyle}><div> <img src="http://p2.music.126.net/fuA3-6r7ZmuVIAvnz0o-lg==/109951163257609905.jpg?param=200y200" alt="" style={{ height: "60px", width: "60px" }} />&nbsp;&nbsp;MEGALO BOX OST</div></li>
          <li style={liStyle}><div> <img src="http://p2.music.126.net/xG9AiHIfj_7XQFjsFaR5Rw==/18647717209318066.jpg?param=60y60" alt="" />&nbsp;&nbsp;【催眠】佛系粗暴的哄睡放松~</div></li>
          <li style={liStyle}><div> <img src="http://p2.music.126.net/Adi6IB5yOK8dgL16c8Zi6g==/109951165361799233.jpg?param=60y60" alt="" />&nbsp;&nbsp;一千零一夜</div></li>
        </ul> */}
      <Table columns={columns} dataSource={data} />
      </div>


      <div>
        <div><h3 style={{ display: "inline" }}>我创建的歌单</h3>&nbsp;&nbsp;&nbsp;&nbsp;<a>查看全部 ></a></div>
        <Divider></Divider>
        <ul className="main-list">
                    {
                        HotSongList.slice(0, 12).map((item, index) => {
                            return <li style={{display:'inline-block',width:'190px',
                            height: '200px',paddingLeft:'40px'}}> <div>
                            <div
                                key={item.id}
                                style={{width: '140px',
                                    height:'140px'}}
                                /*  currentRanking={index+1}  */
                                className="song_item"
                                /* coverPic={index < 3?item.al.picUrl:''}
                                duration={formatMinuteSecond(item.dt)} */
                                songName={item.name}
                                songId={item.id}
                            >
                            <img src={item.coverImgUrl + "?param=140y140"} alt='404' /* onError={this.setImgurl} */ />
                            
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

      <div>
        <div><h3 style={{ display: "inline" }}>我收藏的歌单</h3>&nbsp;&nbsp;&nbsp;&nbsp;<a>查看全部 ></a></div>
        <Divider></Divider>
        <ul className="main-list">
                    {
                        GuessSongList2.slice(0, 12).map((item, index) => {
                            return <li style={{display:'inline-block',width:'190px',
                            height: '200px',paddingLeft:'40px'}}> <div>
                            <div
                                key={item.id}
                                style={{width: '140px',
                                    height:'140px'}}
                                /*  currentRanking={index+1}  */
                                className="song_item"
                                /* coverPic={index < 3?item.al.picUrl:''}
                                duration={formatMinuteSecond(item.dt)} */
                                songName={item.name}
                                songId={item.id}
                            >
                            <img src={item.coverImgUrl + "?param=140y140"} alt='404' /* onError={this.setImgurl} */ />
                            
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
      <div>

      </div>





    </div>




  )
}
const liStyle = {

  paddingTop: "20px",
  bordered: "true",
  split: "true"
}

const liStyle2 = {

  paddingTop: "10px",
  bordered: "true",
  split: "true"
}