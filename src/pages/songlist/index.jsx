
import React, { useRef, useState, useEffect, obj } from 'react';
import { Space, Table,Divider, Input, Tag } from 'antd';
import history, { useHistory } from 'umi'
import axios from 'axios';
import Tags from './tags'
import store from '../../redux/store';
import {DISPATH_SONG_ID,DISPATH_SONGLIST_ID} from '../../redux/constant'




const { Search } = Input;

const columns = [

  {
    title: '歌单名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
   {
    title: 'pic',
    width: '20%',
    dataIndex: 'coverImgUrl',
    key: 'coverImgUrl',
    render: (v) => { return <img src={v + "?param=140y140"} alt='404'  /> }
  }, 

/*   {
    title: 'pic',
    width: '20%',
    dataIndex: 'coverImgUrl',
    key: 'coverImgUrl',
    render: (v) => {
     return <>
      <div style={{ width: '100%', float: 'left' }}>
        <img src={v+ "?param=140y140"} alt='404' />
      </div>
      <div style={{ width: '100%' }}>
        <a >{name}</a>
      </div>
    </>
      
    }
  }, */

  {
    title: '简介',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '类别tag',
    dataIndex: 'tags',
    key: 'tags',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '作者',
    dataIndex: 'creator',
    key: 'creator',
    render: (v) =>
      <>
        <div style={{ width: '100%', float: 'left' }}>
          <img src={v.avatarUrl + "?param=140y140"} alt='404' />

        </div>
        <div style={{ width: '100%' }}>
          <a >{v.nickname}</a>

        </div>
      </>


  },
  /* {
    title: '歌单创建者',
    key: 'subscribers[]',
    render: (v) => (


      <>
       <div style={{ width: '100%', float: 'left' }}>
          <img src={subscribers[0].backgroundUrl + "?param=140y140"} alt='404' />

        </div>
        <div style={{ width: '100%' }}>
          <a >{subscribers[0].nickname}</a>

        </div> 
        {v}
        {subscribers[0]}
      </>


    ),
  }, */
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>收藏 </a>

        <a>添加进播放列表 </a>
      </Space>
    ),
  },

];


export default function index() {

  const [highQualitySongList, sethighQualitySongList] = useState([])

  const history = useHistory()


  useEffect((searchSong) => {
    axios.get('http://localhost:3000/top/playlist/highquality').then(
      res => {

        console.log(res);
        sethighQualitySongList(res.data.playlists);

      }
    ).catch(((e) => { console.log(e); }))


  }, [])

  /*   const onSearch = (value) => {
      console.log(value)
      store.dispatch({type:"querySong",data:value})
  
    axios.get('http://localhost:3000/search?_embed=children&', {
      params: {
        keywords:querySong
      }
    }).then(
      res => {
         console.log("res",res); 
        setmusiclist(res.data.result.songs);
        setsongCount(res.data.result.songCount);
      }
    ).catch(((e) => { console.log(e); }))
  
    List
    } */
const toSongListDetail=(record) => { 
  
  console.log(record)
        
  store.dispatch({type:DISPATH_SONGLIST_ID,data:record.id})
  history.push('/commonPage/songlist-detail')
  
 }


  return (
    <>
    <Tags></Tags>

      <Table rowKey={record => record.id} 
      columns={columns} 
      dataSource={highQualitySongList}
      
      onRow={(record, index) => {
        return {
          onClick: () => {
            console.log(record); // 获取每一行数据
            toSongListDetail(record)
          }
        };
      }}
      />
    </>

  )
}

