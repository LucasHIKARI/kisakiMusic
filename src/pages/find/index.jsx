
import React, { useRef,useState, useEffect, obj } from 'react';
import { Space, Table, Input, Tag } from 'antd';
import axios from 'axios';
import store from '../../redux/store';
import { Redirect,useHistory } from 'umi'

const { Search } = Input;

const columns = [
  {
    title: '歌曲ID',
    dataIndex: 'id',
    key: 'id',

  },
  {
    title: '歌曲名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },

  {
    title: '作者',
    dataIndex: 'artists',
    key: 'artists',
    render: (artists) => <a>{artists[0].name}</a>,
  },


  {
    title: '专辑名',
    dataIndex: 'album',
    key: 'album',
    render: (album) => <a>{album.name}</a>,
  },
  {
    title: '版权编号',
    dataIndex: 'copyrightId',
    key: 'copyrightId',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>收藏 </a>
        <a>下一首播放 </a>
        <a>添加进歌单 </a>
        <a>download </a>
      </Space>
    ),
  },

];


export default function index() {

  const [musiclist, setmusiclist] = useState([])
  const [songCount, setsongCount] = useState([])
  const [searchInfo, setsearchInfo] = useState([])
  const history = useHistory()
 /*  const  searchRef =useRef()
  const [searchSong, setSearchSong] = useState()  */

  //  搜索歌曲名字，用的redux最简洁的写法
  var querySong= store.getState()

  
 // 把cookie的token发到后端鉴权
  // 假如响应慢的话，其他组件获取不到必要数据，需要优化
 
  //   useEffect(() => {   
  //     if (localStorage.getItem('token') == null) {
  //     axios.defaults.withCredentials = true; //Cookie跨域

  //     axios
  //       .post(
  //         `http://localhost:8800/users/login`,
  //         {},
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           withCredentials: true, // 添加这个选项跨域
  //         },
  //       )
  //       .then((res) => {
  //         console.log('res', res);
  //         if (res.data.length === 0) {
  //           message.error('用户名或密码不匹配');
  //         } else {
  //           console.log('res.data', res.data);
  //           console.log('res.data[0]', res.data[0]);
  //           // 下面两行是jsonserver模拟数据
  //           // console.log('JSON.stringify(res.data[0])',JSON.stringify(res.data[0]));
  //           // localStorage.setItem('token',JSON.stringify(res.data[0]))
  //           // 下面是替换为自己数据库的数据
  //           console.log(
  //             'JSON.stringify(res.data.data)',
  //             JSON.stringify(res.data.data),
  //           );
  //           localStorage.setItem('token', JSON.stringify(res.data.data));
  //           history.push('/home')
  //         }
          
  //       });
  //     }
  // },[]);
  

  useEffect((searchSong) => 
  {
   console.log(querySong);
      axios.get('http://localhost:3000/search?_embed=children&', {
        params: {
          /* keywords: (searchSong==null&&querySong!==null)?querySong:searchSong */       
          keywords: querySong       
        }
      }).then(
        res => {
  
           console.log(res);
  
          /* 
          (res.data.result.songs).map((item) => { 
                   
            console.log(item.artists[0].name);
            console.log(item.album.name);
           
             return {
              album.picId:item.album.picId
              artists.name:item.artists[0].name
              artists.picId:item.artists[0].picId
              album.name:item.album.name
          
            } 
          }) */
  


          setmusiclist(res.data.result.songs);
          setsongCount(res.data.result.songCount);
  
  
        }
      ).catch(((e) => { console.log(e); }))
    

  }, [ querySong ])

  const onSearch = (value) => {
    console.log(value)
    store.dispatch({type:"query_song",data:value})

  axios.get('http://localhost:3000/search?_embed=children&', {
    params: {
      keywords:value
    }
  }).then(
    res => {
       console.log("res",res); 
      setmusiclist(res.data.result.songs);
      setsongCount(res.data.result.songCount);
      /*   console.log(res.data.result.songs); */
    }
  ).catch(((e) => { console.log(e); }))

  
  }

  return (
    <>
      <div>关键字：<b>{store.getState()}</b>  的搜索结果总数为： {songCount} 个</div>
      <div>
        <Search
          placeholder="音乐/视频/电台/用户 "
          onSearch={onSearch}
          allowClear

        />
      </div>
      <Table rowKey={record => record.id} columns={columns} dataSource={musiclist} />
    </>

  )
}

