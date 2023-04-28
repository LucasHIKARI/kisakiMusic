import React, { useEffect, useState, useRef, useReducer } from 'react';
import { Carousel, Card, Table, Col, Row, Space, Slider, Button, Divider } from 'antd';
import axios from 'axios';
import history, { useHistory } from 'umi'
import store from '../../../redux/store';




const columns = [
  {
    title: '',
    dataIndex: 'al',
    key: 'al',
    render: (al) => { return <img src={al.picUrl + "?param=100y100"} style={{ textAlign: 'center' }} alt='404' /> }
  },
  {
    title: '歌曲名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '',
    dataIndex: 'id',
    key: 'id',

    render: (text) => <>
      <Button>添加进歌单</Button>
      <Button>收藏</Button>
      <Button>下载</Button> </>,
  },


];

export default function index() {
  const [SongListDetail, setSongListDetail] = useState({})
  const [SongList, setSongList] = useState([])
  const [SongUrl, setSongUrl] = useState()
  const [SongId, setSongId] = useState()

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  let songListId = store.getState()
  // console.log(songId)

  useEffect(() => {

    // 歌单详情
    axios.get('http://localhost:3000/playlist/detail', {
      params: {
        id: songListId
      }
    }).then(
      res => {
        console.log(res.data.playlist);
        console.log(res.data);
        setSongListDetail(res.data.playlist);
        setSongList(res.data.playlist.tracks)
      }
    ).catch(((e) => { console.log(e); }))



  }, [])

  // 改变播放状态的同时，假如点击新歌会替换url
  const togglePlay = (record) => {
    console.log(record);
    setSongId(record.id);
    axios
      .get('http://localhost:3000/song/url', {
        params: {
          id: record.id
        }
      })
      .then(res => {
        console.log(res);
        if (SongUrl !== res.data.data[0].url) {
          setSongUrl(res.data.data[0].url);
        }
        audioRef.current.play();
      })
      .catch(e => {
        console.log(e);
      });  
    setIsPlaying(true);
  };

  // 只改变播放状态
  const togglePlayState = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };



  return (
    <div>

      <div style={{ width: '100%' }}>


        <div  >
          <div style={{ width: '30%', float: 'left', display: 'inline-block', textAlign: 'center' }}>
            <img src={SongListDetail.coverImgUrl} style={{ width: '300px', height: '300px' }} ></img>
          </div>

          <div style={{ width: '30%', float: 'left', display: 'inline-idblock' }}>
            <p><span>歌单名：{SongListDetail.name}</span></p>
            <p><span>歌单编号：{SongListDetail.id}</span></p>
            <p>歌单简介：{SongListDetail.description}</p>
            {/*  {SongListDetail.tags.map((item, index) =>{ return <span>{item}</span>})} */}
          </div>
        </div>

        <Table rowKey={record => record.id}
          columns={columns}
          dataSource={SongList}
          onRow={(record, index) => {
            return {
              onClick: () => {
                togglePlay(record);
              }
            };
          }}
        />
    
      </div>

      <span>
        <audio id='audio' src={SongUrl} ref={audioRef} controls={false} />

      </span>

      <div style={{ width: '100%', textAlign: 'center' }}>

        <Button > 上一首（不可用） </Button>

        <Button onClick={togglePlayState} >{isPlaying ? 'Pause' : 'Play'} </Button>

        <Button > 下一首（不可用） </Button>
        <div style={{ width: '20%' }}></div>
        <Button>添加进歌单</Button>
        <Button>收藏</Button>
        <Button>下载</Button>
        {/* <span>{SongListDetail}</span> */}
      </div>
    </div>
  )
}
