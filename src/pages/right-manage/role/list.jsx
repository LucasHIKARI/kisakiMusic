import { Table, Tag, Button, Modal,  Switch,Tree  } from 'antd'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { addSyntheticLeadingComment } from 'typescript';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'




export default function list() {
  const { confirm } = Modal;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [treeData, settreeData] = useState([])
  const [table, settable] = useState([])
  const [rights, setrights] = useState([])
  const [rightsid, setrightsid] = useState(0)


  const columns = [
    {
      title: 'ロールID',
      dataIndex: 'id',
      render: (id)=>{
        return <b> {id} </b>
      }  
    },
    {
      title: 'ロール名称',
      dataIndex: 'roleName',
      render: (label)=>{
        return <b> {label} </b>
      }    
    },
    {
      title: '権限名称',
      dataIndex: 'rightName',
      render: (label)=>{
        return <b> {label} </b>
      }    
    },
    {
      title: '権限path',
      dataIndex: 'path',
    /*   render: (label)=>{
        return <b> {label} </b>
      }   */  
    },
    
    {
      title: '権限スイッチ',
      render: (item) => { 
         return <div>

          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => {deleteItem(item)}}/>
          &nbsp;&nbsp;

          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => {
                        setIsModalOpen(true)
                        setrights(item.rights)
                        // setcheckedKeys(item.rights)
                        setrightsid(item.id)
                    }} />
         </div>
      
        }
    }
  ];

 const deleteItem=(item) => {
  confirm({
        icon: <ExclamationCircleOutlined />,
        content: "このデータを削除しますか？",
        onOk() {
          console.log(item)
          deleteOk(item)
        },
        onCancel() {
          console.log('Cancel') 
        },
      });
 }
 const deleteOk=(item) => { 
  // console.log(item)
  // console.log(table)
      settable(table.filter(data => data.id !== item.id ))
      axios.delete(`http://localhost:3000/roles/${item.id}`)

  }
useEffect(() => { 
axios.get('http://localhost:8800/right-manage/role/list').then(
    res => {
      // console.log(res.data.data);
      settable(res.data.data)
  }
  
)
 },[])

// 返回的数据集没有嵌套数组，之后再说
 /*    useEffect(() => {
        axios.get('http://localhost:3000/rights?_embed=children').then(
            res => {
                
                settreeData(res.data)
            }
        )
    }, []) */

  const handleOk = () => {
      setIsModalOpen(false);
      settable(table.map(item => {
        if (item.id === rightsid) {
            return {
                ...item,
                rights: rights
            }
        }
        return item
    }))
    axios.patch(`http://localhost:3000/roles/${rightsid}`, {
        rights
    })
    };

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const onCheck = (check) => {
      setrights(check)
  }


  return (
    <>
      <Table dataSource={table} columns={columns} /* scroll={{y:2000,scrollToFirstRowOnChange:false}} */  pagination={{pageSize:100}} rowKey={(record, index) => index}/>
      <Modal title="権限管理" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Tree
      checkable
      checkStrictly
        onCheck={onCheck}
      checkedKeys={rights}
      treeData={treeData}
    />
      </Modal>
    </>
  )
}

