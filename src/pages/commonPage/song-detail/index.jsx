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
    render: (al) => { return <img src={al.picUrl + "?param=500y500"} alt='404' /> }
  },
  {
    title: '歌曲名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '简介',
    dataIndex: 'alia',
    key: 'alia',
    render: (alia) => { alia[0] },
  },
  {
    title: '热评',
    /*    dataIndex: 'rcmdtext',
       key: 'rcmdtext',
       render: (text) => <a>{text}</a>, */
  },


];

export default function index() {
  const [SongDetail, setSongDetail] = useState([])
  const [SongUrl, setSongUrl] = useState()
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  let songId = store.getState()
  console.log(songId)

  useEffect(() => {

    // 歌曲详情
    axios.get('http://localhost:3000/song/detail', {
      params: {
        ids: songId
      }
    }).then(
      res => {
        // console.log(res);
        // console.log(res.data.songs[0]);
        setSongDetail(res.data.songs);
      }
    ).catch(((e) => { console.log(e); }))

    // ### 获取歌曲url
    axios.get('http://localhost:3000/song/url', {
      params: {
        id: songId
      }
    } ).then(
      res => {
        console.log(res);
        setSongUrl(res.data.data[0].url);
      //  setSongUrl(res.data.data);
       console.log(SongUrl);

      }
    ).catch(((e) => { console.log(e); }))

  }, [])

/*   const playSong=() => { 
    console.log(document.getElementById('audio'));
    document.getElementById('audio').autoplay = true
   }

   const pauseSong=() => { 
    console.log(document.getElementById('audio'));
    document.getElementById('audio').autoplay = false
   } */

/*    const togglePlay = () => {
    console.log(document.getElementById('audio'));
    setIsPlaying(!isPlaying);
    if (!isPlaying==true) {
      document.getElementById('audio').autoplay = true
    }else{
      document.getElementById('audio').autoplay = false
    }
  }; */

  const togglePlay = () => {
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


        <Table rowKey={record => record.id} 
        columns={columns} 
        dataSource={SongDetail} 
        onRow={(record, index) => {
          return {
            onClick: () => {
              /* console.log(record); */
             /*  playSong()  */
             togglePlay()
            }
          };
        }}
        />
            <span>
                <audio  id='audio'  src={SongUrl} ref={audioRef}  /* autoPlay='false' */  controls={false} /> 
                
            </span>
      </div>
      <div style={{ width: '100%' ,textAlign:'center' }}>

        <Button > 上一首（不可用） </Button>

        <Button onClick={togglePlay} >{isPlaying ? 'Pause' : 'Play'} </Button>
        
        <Button > 下一首（不可用） </Button>
        <div  style={{ width: '20%'  }}></div>
        <Button>添加进歌单</Button>
        <Button>收藏</Button>
        <Button>下载</Button>
      </div>
    </div>
  )
}
