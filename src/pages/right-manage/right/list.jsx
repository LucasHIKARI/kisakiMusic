import { Table, Tag, Button, Modal, Popover, Switch } from 'antd'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { addSyntheticLeadingComment } from 'typescript';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'




export default function list() {
  const [table, settable] = useState([])
  const [isdisable, setIsdisable] = useState(false)
  const { confirm } = Modal;

  const columns = [
    {
      title: '権限ID',
      dataIndex: 'id',
      render: (id) => {
        return <b> {id} </b>
      }
    },
    {
      title: '権限名称',
      dataIndex: 'name',
      render: (title) => {
        return <b> {title} </b>
      }
    },
    {
      title: '権限経路',
      dataIndex: 'path',
      render: (key) => { return <Tag color="blue">{key}</Tag> }

    },
    {
      title: '権限スイッチ',
      dataIndex: 'status',
      render: (item) => {
        console.log(item);
        return <div>
          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => { deleteItem(item) }} />
          &nbsp;&nbsp;
          <Switch   /* defaultChecked   */ disabled={isdisable}  checked={item==1?true:false}  onChange={() => { switchmethod(item) }}></Switch>

       {/*    <Popover 
          content={<div style={{ textAlign: 'center' }}>
          </div>} 

          title="页面配置项" trigger={item.select === undefined ? '' : 'hover'} >
          </Popover> */}
         {/*  <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.select === undefined} /> */}

        </div>

      }
    }
  ];

  const switchSetDisable =() => {setIsdisable(true) } 

  const deleteItem = (item) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: "このデータを削除しますか？",
      onOk() {
        // console.log(item)
        deleteOk(item)
      },
      onCancel() {
        console.log('Cancel')
      },
    });
  }
  const deleteOk = (item) => {
    // console.log(item.id)
    // console.log(table)
    /*  if(item.grade === 1){
       settable(table.filter(data => data.id !== item.id ))
       axios.delete(`http://localhost:8800/rights/${item.id}`)
     }else{
       let list =table.filter(data =>  data.id === item.rightId )
       console.log(list)
       console.log(list[0])
 
       console.log(list[0].children)
       list[0].children =list[0].children.filter((data) => { data.id !== item.id })
       settable([...table])
       axios.delete(`http://localhost:8800/children/${item.id}`)
     } */


  }

  useEffect(() => {
    let roleId = JSON.parse(localStorage.getItem("token")).roleId
    // console.log( JSON.parse(localStorage.getItem("token")).roleId );
    if(roleId>=4){switchSetDisable()}
    axios.get('http://localhost:8800/right-manage/right/list/{roleId}').then(
      res => {
        const list = res.data.data
        list.forEach(item => {
          if (item.children.length === 0) {
            item.children = ''
          }
        });
        settable(list)
      }
    )
  }, [])

  /* true */

  const switchmethod = (item) => {
    item.select = item.select === true ? false : true
    settable([...table])
    // 对后端进行修改
    /*   if (item.grade === 1) {
        // path（）第二个参数是修改的信息
        axios.patch(`http://localhost:8800/rights/${item.id}`, {
          pagepermission: item.pagepermission
        })
    
      } else {
        axios.patch(`http://localhost:8800/children/${item.id}`, {
          pagepermission: item.pagepermission
        })
    
      } */
  }

  return (
    <Table dataSource={table} columns={columns} pagination={{ pageSize: 100 }} />
  )
}

