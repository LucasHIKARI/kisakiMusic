import React, { useEffect, useState, useRef, createContext } from 'react';
import { Carousel, Card, Table, Col, Row, Space, Slider, Button, Divider } from 'antd';
import axios from 'axios';
import history, { useHistory } from 'umi'
import SongList from './commonPage/song-detail';
import store from '../redux/store';
import {DISPATH_SONG_ID,DISPATH_SONGLIST_ID} from '../redux/constant'
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';


const columns = [
    {
        title: '歌曲ID',
        dataIndex: 'id',
        width: '10%',
        key: 'id',

    },
    {
        title: '歌曲名',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        ellipsis: true,
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'pic',
        width: '20%',
        dataIndex: 'coverImgUrl',
        key: 'coverImgUrl',
        render: (v) => { return <img src={v + "?param=140y140"} alt='404' /* onError={this.setImgurl} */ /> }
    },
    {
        title: '简介',
        dataIndex: 'description',
        width: '50%',
        key: 'description',
        ellipsis: true,
    },



];
const columnList = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        render: (id,text,record) => {
            // console.log(id);
       /*      axios.get('http://localhost:3000/song/url?id='+id).then(
                res => {
            
                    setsongUrl(res.data.data[0].url);
                    console.log(songUrl);
                }
            ).catch(((e) => { console.log(e); })) */

            return <span>
                <audio  /* src={songUrl}  */ /* autoPlay:false */ autoPlay='false'> </audio>
            </span>
        }

    },
    {
        title: '',
        dataIndex: 'album',
        key: 'album',
        render: (v) => { return <img src={v.picUrl + "?param=80y80"} alt='404' /> }
    },
    {
        title: '歌曲名',
        dataIndex: 'name',
        key: 'name',
       render: (name,text) => { 
          
           return <a >{name}</a>} 
    },
    {
        title: '简介',
        dataIndex: 'alias',
        key: 'alias',
        render: alias => alias[0]

    },
];



const home = () => {
    const [musiclist, setmusiclist] = useState([])
    const [SongListId, setSongListId] = useState([])
    const [GuessSongList, setGuessSongList] = useState([])
    const [NewSongList, setNewSongList] = useState([])
    const [JapenSongList, setJapenSongList] = useState([])
    const [SongList, setSongList] = useState([])
    const [songId1, setsongId1] = useState([])
    const [songId2, setsongId2] = useState([])


    const history = useHistory()
    const songIdContainer = useRef()

    // // 把cookie的token发到后端鉴权
    // // 假如响应慢的话，其他组件获取不到必要数据，需要优化
    // useEffect(() => {
    //     if(localStorage.getItem("token") === null){
    //       axios.defaults.withCredentials = true;//Cookie跨域
        
    //         axios.post(`http://localhost:8800/users/login`, {
           
    //         }, {
    //           headers: {
    //             'Content-Type': 'application/json'
                
    //           },
    //           withCredentials: true // 添加这个选项跨域
    //         }).then(res=>{
    //           console.log('res',res);
    //            if(res.data.length === 0){
    //               message.error('用户名或密码不匹配')
    //           }else{
    //             console.log('res.data',res.data);
    //             console.log('res.data[0]',res.data[0]);
    //             // 下面两行是jsonserver模拟数据
    //             // console.log('JSON.stringify(res.data[0])',JSON.stringify(res.data[0]));
    //               // localStorage.setItem('token',JSON.stringify(res.data[0]))
    //               // 下面是替换为自己数据库的数据
    //               console.log('JSON.stringify(res.data.data)',JSON.stringify(res.data.data));
    //               localStorage.setItem('token',JSON.stringify(res.data.data))
                  
    //           } 
    //       }
    //     )
    //     }
        
          
    //       })
    
  
    useEffect(() => {


        axios.defaults.withCredentials = true;//Cookie跨域

        axios.post(`http://localhost:8800/users/login`, {
       
        }, {
          headers: {
            'Content-Type': 'application/json'
            
          },
          withCredentials: true // 添加这个选项跨域
        })



        axios.get('http://localhost:3000/top/playlist?order=hot').then(
            res => {
                /*   console.log(res);
                  console.log(res.data.playlists);
                  console.log(res.data.playlists[0].name); */

                setmusiclist(res.data.playlists);
                /* setsongCount(res.data.playlists.name); */
            }
        ).catch(((e) => { console.log(e); }))

        axios.get('http://localhost:3000/top/playlist?cat=ACG').then(
            res => {

                setGuessSongList(res.data.playlists);
            }
        ).catch(((e) => { console.log(e); }))

        // 新歌上架的接口关了，先用一般的接口
        axios.get('http://localhost:3000/top/playlist?order=日语').then(
            res => {

                setNewSongList(res.data.playlists);
            }
        ).catch(((e) => { console.log(e); }))


        // ### 日语新歌榜
        axios.get('http://localhost:3000/top/song?type=8').then(
            res => {
                /* console.log(res); */
                setJapenSongList(res.data.data);
            }
        ).catch(((e) => { console.log(e); }))

        // ### 新歌榜
        axios.get('http://localhost:3000/top/song?type=0').then(
            res => {

                setSongList(res.data.data);

            }
        ).catch(((e) => { console.log(e); }))

    }, [])

    const toSongList = () => {
        console.log("location.pathname", location.pathname);
        history.push("/songlist")
    }
    const toRadioList = () => {
        console.log("location.pathname", location.pathname);
        history.push("/commonPage/radio")
    }
    const toSongDetail = (record) => {
        // console.log(text);
        // console.log(value);
        console.log(record);
        
        store.dispatch({type:DISPATH_SONG_ID,data:record.id})
        history.push('/commonPage/song-detail')

    }

    const toSongListDetail2 = (e) => {

        console.log(songIdContainer);
        console.log(songIdContainer.current); 
        
        const songIdContainer2 = e.target.parentNode.getAttribute('songid');
        console.log("songIdContainer2",songIdContainer2); 
        
        console.log(songIdContainer.current.getAttribute('songid'));
        // document.getElementById("xxx").attributes["customAttr"].value
        /* songIdContainer.current */
       /*  console.log(document.getElementsByClassName("song_item").songid);

        document.getElementsByClassName("song_item").songid */
        // store.dispatch({type:DISPATH_SONGLIST_ID,data:songIdContainer.current.getAttribute('songid')})
        // history.push('/commonPage/songlist-detail')

    }

 
    const toSongListDetail = (id, name) => {

        console.log(id);
        console.log(name);
    
        store.dispatch({type:DISPATH_SONGLIST_ID,data:id})
        history.push('/commonPage/songlist-detail')

    }

    return (
        <div style={{}}>
            <div style={{ width: "100%" }}>

                <Card /* title="图片轮播" */>
                    <Carousel autoplay effect="fade">
                        <div>
                            <img style={picStyle} src="http://p1.music.126.net/pB7_jQC6fjmUyTUzDDQWrg==/109951168216935716.jpg?imageView&quality=89" alt="" />
                        </div>
                        <div>
                            <img style={picStyle} src="http://p1.music.126.net/ikPM3lGUs0P4SWmCX7ZuFA==/109951168218285298.jpg?imageView&quality=89" alt="" />
                        </div>
                        <div>
                            <img style={picStyle} src="http://p1.music.126.net/DJyF8WNuKhuSILiufILLNQ==/109951168218286622.jpg?imageView&quality=89" alt="" />
                        </div>
                        <div>
                            <img style={picStyle} src="http://p1.music.126.net/TJ3OW9OWeupCPuDwdMgNdg==/109951168218283399.jpg?imageView&quality=89" alt="" />
                        </div>
                    </Carousel>
                </Card>
            </div>

            <div style={{ width: "70%", float: "left" }}>
                <Divider orientation="left" style={{ margin: '0px' }}>热门推荐</Divider>
                <div style={{ textAlign: 'right' }}><a onClick={toSongList} >更多精选歌单...</a></div>
                <ul className="main-list">
                    {
                        musiclist.slice(0, 10).map((item, index) => {
                            return <li style={{
                                display: 'inline-block', width: '190px',
                                height: '200px', paddingLeft: '40px'
                            }}>
                                <div>
                                    <div
                                        key={item.index}
                                        style={{
                                            width: '140px',
                                            height: '140px'
                                        }}
                                        
                                        className="song_item"
                                        songname={item.name}
                                        songid={item.id}
                                        
                                    >

                                        <a  onClick={(e) => { toSongListDetail(item.id, item.name) }}>
                                            <img src={item.coverImgUrl + "?param=140y140"} alt='404' /* onError={this.setImgurl} */ />

                                        </a>

                                    </div>

                                    <div>
                                        <p><a onClick={(e) => { toSongListDetail(item.id, item.name) }}>{item.name}</a></p>
                                    </div>

                                </div>
                            </li>
                        })
                    }
                </ul>
                <Divider orientation="left">个性化推荐</Divider>
                <ul className="main-list">
                    {
                        GuessSongList.slice(0, 10).map((item, index) => {
                           /*  console.log(item); */
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
                                       
                                        className="song_item"
                                        songname={item.name}
                                        songid={item.id}
                                        ref={songIdContainer}
                                    >
                                        <a onClick={(e) => { toSongListDetail(item.id, item.name) }} >
                                            <img src={item.coverImgUrl + "?param=140y140"} alt='404' /* onError={this.setImgurl} */ />

                                        </a>

                                    </div>

                                    <div>
                                        <p><a onClick={(e) => { toSongListDetail(item.id, item.name) }}>{item.name}</a></p>
                                    </div>

                                </div>
                            </li>
                        })
                    }
                </ul>
                <Divider orientation="left">新碟上架</Divider>
                <ul className="main-list" >
                    {
                        NewSongList.slice(0, 8).map((item, index) => {
                            return <li style={{
                                display: 'inline-block', width: '100px',
                                height: '160px', marginLeft: '20px'
                            }}> <div>
                                    <div
                                        key={item.id}
                                        style={{
                                            width: '100px',
                                            height: '100px'
                                        }}
                                        /*  currentRanking={index+1}  */
                                        className="song_item"n
                                        /* coverPic={index < 3?item.al.picUrl:''}
                                        duration={formatMinuteSecond(item.dt)} */
                                        songname={item.name}
                                        songid={item.id}
                                        ref={songIdContainer}
                                    >
                                        <a onClick={(e) => { toSongListDetail(item.id, item.name) }}>
                                            <img src={item.coverImgUrl + "?param=100y100"} alt='404' /* onError={this.setImgurl} */ />

                                        </a>

                                    </div>

                                    <div>
                                        <p style={{ height: '60px' }}><a onClick={(e) => { toSongListDetail(item.id, item.name) }}>{item.name}</a></p>
                                    </div>

                                </div>
                            </li>
                        })
                    }
                </ul>
                {/*  <Table rowKey={record => record.id} columns={columns} dataSource={musiclist} /> */}


                <Divider orientation="left">榜单</Divider>


                <div style={{ width: '45%', float: 'left' }}>
                    <p>日本歌曲榜  </p>
                    <Table /* rowKey={record => record.id} */
                     columns={columnList} 
                     dataSource={JapenSongList}
                     onRow={(record, index) => {
                        return {
                          onClick: () => {
                            console.log(record); // 获取每一行数据
                            toSongDetail(record)
                          }
                        };
                      }}
                     />

                </div>
                <div style={{ width: '45%', float: 'right' }}>

                    <p>新歌排行榜  </p>
                    <Table /* rowKey={record => record.id} */ 
                    columns={columnList} 
                    dataSource={SongList}
                    onRow={(record, index) => {
                        return {
                          onClick: () => {
                            console.log(record); // 获取每一行数据
                            toSongDetail(record)
                          }
                        };
                      }}
                    />

                </div>



            </div>


            <div style={{ width: "30%", float: "right", padding: "20px" }}>
                <div  /* style={{ float: "left", display: "inline-block" }} */>
                    <Divider orientation="left">个人状态</Divider>
                    <div style={{ width: "50%", float: "left", display: "inline-block", textAlign: "center" }}>
                        {/* <img src="../assets/img/home/user.jpg" alt="404" style={{width:"90px",height:"90px"}} /> */}
                        <img src="http://p1.music.126.net/jNqRncgA_CsGWba4-0M72Q==/109951163082393914.jpg?param=80y80" alt="404" style={{ width: "90px", height: "90px" }} />
                    </div>
                    <div style={{ width: "50%", textAlign: "left", float: "left", display: "inline-block" }}>
                        <h4>用户名</h4>
                        <p>等级</p>
                        <p><Button>签到</Button></p>

                    </div>

                </div>

                <div>
                    <div><h3 style={{ display: "inline" }}>热门电台</h3>&nbsp;&nbsp;&nbsp;&nbsp;<a onClick={toRadioList}>查看全部 &gt;</a></div>
                    <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                        <li style={liStyle}><div> <img src="http://p2.music.126.net/FIQXtGyweLetV-6VredoMg==/109951163336004162.jpg?param=200y200" alt="" style={{ height: "60px", width: "60px" }} />&nbsp;&nbsp;Caligula卡里古拉 黑化曲专辑</div></li>
                        <li style={liStyle}><div> <img src="http://p2.music.126.net/fuA3-6r7ZmuVIAvnz0o-lg==/109951163257609905.jpg?param=200y200" alt="" style={{ height: "60px", width: "60px" }} />&nbsp;&nbsp;MEGALO BOX OST</div></li>
                        <li style={liStyle}><div> <img src="http://p2.music.126.net/xG9AiHIfj_7XQFjsFaR5Rw==/18647717209318066.jpg?param=60y60" alt="" />&nbsp;&nbsp;【催眠】佛系粗暴的哄睡放松~</div></li>
                        <li style={liStyle}><div> <img src="http://p2.music.126.net/Adi6IB5yOK8dgL16c8Zi6g==/109951165361799233.jpg?param=60y60" alt="" />&nbsp;&nbsp;一千零一夜</div></li>
                    </ul>

                </div>

                <div>
                    <div><h3 style={{ display: "inline" }}>入驻歌手</h3>&nbsp;&nbsp;&nbsp;&nbsp;查看全部 &gt;</div>
                    <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                        <li style={liStyle2}><div> <img src="http://p1.music.126.net/3wbnR_0SgfYwE-HKRcKNug==/109951167338251913.jpg?param=40y40" alt="" />&nbsp;&nbsp;Aimerエメ</div></li>
                        <li style={liStyle2}><div> <img src="http://p1.music.126.net/3K51VWZVCpjI6B1P92gIlA==/109951166731394551.jpg?param=40y40" alt="" />&nbsp;&nbsp;宇多田ヒカル</div></li>
                        <li style={liStyle2}><div> <img src="http://p1.music.126.net/uRxuKxc_As2V7JtaCSyUlA==/109951163530015383.jpg?param=40y40" alt="" />&nbsp;&nbsp;GUMIMegpoid</div></li>
                        <li style={liStyle2}><div> <img src="http://p1.music.126.net/Knx1EwIBSK0jlmB2b6a6tQ==/109951167651357347.jpg?param=40y40" alt="" />&nbsp;&nbsp;早见沙织</div></li>
                        <li style={liStyle2}><div> <img src="http://p1.music.126.net/IkoxN6eVsIXMCehEr5gNPQ==/109951167493020663.jpg?param=40y40" alt="" />&nbsp;&nbsp;Lisa</div></li>

                    </ul>
                    <div style={{ textAlign: "center" }}>
                        <Button >申请成为网易音乐人</Button>
                    </div>
                </div>
                <div>

                </div>





            </div>

        </div >
    );
};

//  home.wrappers = ['@/wrappers/Auth'];

export default home;

const textStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const picStyle = {
    textAlign: 'center',
    height: '400px',
    width: '100%',
    background: '#364d79',
    overflow: 'hidden',

};

const itemStyle = {
    textAlign: 'center',
    height: '100%',
    width: '100%',
    // background: '#364d79',
    overflow: 'hidden',
    background: '../picture/Screenshot_2017-09-29-23-37-51-606_org.tvp.kirikiri2_free.png',
};


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

/* const textType={
    overflow:'hidden',

text-overflow:'ellipsis',

display:'-webkit-box', 
} */
