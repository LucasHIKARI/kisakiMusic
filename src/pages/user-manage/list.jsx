import { Table, Tag, Input, Button, Modal, Switch, Select, Form, Radio, message, Popconfirm } from 'antd'
import axios from 'axios'
import { useState, useEffect, Object, useRef } from 'react'
import { addSyntheticLeadingComment } from 'typescript';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import AddForm from './AddForm';
import UpdateForm from './UpdateForm';



export default function list() {
  const ref = useRef()
  const upref = useRef()
  const { confirm } = Modal;
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [treeData, settreeData] = useState([])
  const [table, settable] = useState([])
  const [rights, setrights] = useState([])
  const [rightsid, setrightsid] = useState(0)
  const [role, setrole] = useState()
  const [username, setusername] = useState()
  const [current, setcurrent] = useState()
  const [isAtive, setisAtive] = useState(false)
  const [region, setregion] = useState([])
  const [visible, setvisible] = useState(false)
  const [upvisible, setupvisible] = useState(false)


  useEffect(() => {

    axios.get('http://localhost:8800/user-manage/list').then(
      res => {
        
        // console.log("res.data.data",res.data.data)
        // settable(JSON.parse(res.data))
        settable(res.data.data)
      }
    )
  }, [])

/*   useEffect(() => {
    axios.get('http://localhost:3004/regions').then(
      res => {
        setregion(res.data)
        // console.log(res.data)
      }
    )
  }, [])
*/
  useEffect(() => {
    axios.get('http://localhost:8800/right-manage/role/listAll').then(
      res => {
        // console.log("setrole",res.data.data)
        setrole(res.data.data)
      }
    )
  }, [])  



  const columns = [
    {
      title: 'Region',
      dataIndex: 'region',
      filters: [
        ...region.map(item => ({
          text: item.title,
          value: item.value,
        })),
        {
          text: 'global',
          value: '',
        }
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      //   onFilter: (value, recode) => {
      //     // console.log("value",value)
      //     // console.log("recode",recode)
      //     // console.log("recode.region",recode.region)
      //     return recode.region === value
      // },
      onFilter: (value, record) => record.region === value,


      render: (region) => {
        return <b> {region === '' ? 'global' : region} </b>
      }
    },

    {
      title: 'ユーザー名称',
      dataIndex: 'username',
      render: (userName) => {
        return <b> {userName} </b>
      }
    },

    {
      title: 'ロール名称',
      dataIndex: 'role',
      render: (role) => {
        return <b> {role} </b>
      }
    },
    {
      title: 'ロールID',
      dataIndex: 'roleId',
   
    },


    {
      title: 'ユーザー状態',
      dataIndex: 'status',
      render: (status, item) => {
        /* let roleId=JSON.parse(localStorage.getItem("token")).roleId */
       /*  roleId>0&&roleId<4?false:true */
        return <Switch checked={item.status==1?true:false} disabled={false} onChange={() => handlechange(item)} />
      }
    },
    {
      title: '権限スイッチ',
      render: (item) => {

        return <div>

          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => { deleteItem(item) }} disabled={item.default} />
          &nbsp;&nbsp;
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => { handleupdate(item)}} disabled={item.default} />
        </div>

      }
    }
  ]


  const handlechange = (item) => {
    item.status = !item.status
    let status = item.status==true?1:0
    console.log(status);
    settable([...table])
    axios.get(`http://localhost:8800/user-manage/update/${item.id}/${status}`, {
      status: item.status
    })
  }

  // const handleupdate = (item) => {
  //   // react修改不是實時的要用異步函數防止報錯
  //   setTimeout(() => {
  //     setupvisible(true)
  //     if (item.roleId === 1) {
  //       setisAtive(true)
  //     } else {
  //       setisAtive(false)
  //     }
  //     upref.current.setFieldsValue(item)
  //   }, 0)
  //   setcurrent(item)

  // }

//   const handleupdate = (item) => {
//     let timer
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//         setupvisible(true)
//         if (item.roleId === 1) {
//             setisAtive(true)
//         } else {
//             setisAtive(false)
//         }
//         upref.current.setFieldsValue(item) 
//         // setTimeout(() => {  upref.current.setFieldsValue(item) },500)
//     }, 5000)
//     setcurrent(item)
   
//     // timer = setTimeout(() => {
//     //   this.$refs.edit.setValue(data.data);
//     // }, 500);
// }

const handleupdate = (item) => {
  // console.log(item);
  setTimeout(() => {
      setvisible(true)
      if (item.roleId === 1||item.roleId === 2||item.roleId === 3) {
          setisAtive(true)
      } else {
          setisAtive(false)
      }
      upref.current.setFieldsValue(item)
  }, 0)
  setcurrent(item)
  console.log("item",item);
}

 

  const deleteItem = (item) => {
    console.log(item)
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: 'このデータを削除しますか？',
      onOk() {
        console.log("userItem" + item);
        deleteOk(item)
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }

  const deleteOk = (item) => {
    console.log("item" + item);
    message.success('削除成功');
    settable(table.filter(data => data.id !== item.id))
    axios.get(`http://localhost:8800/user-manage/remove/${item.id}`)
    // setIsModalOpen(false)
  }
  // const onCancel=()=> {
  //         console.log('Cancel');
  //         setIsModalOpen(false)
  // }



  const onCheck = (check) => {
    setrights(check)
  }

  return (
    <>

      <Button type="primary" onClick={() => { setupvisible(true) }}>ユーザー増加</Button>
      <Table dataSource={table} columns={columns} pagination={{ pageSize: 50 }} rowKey={(item) => item.id} />



      <Modal
        visible={upvisible}
        title="ユーザー増加"
        okText="Create"
        cancelText="Cancel"
        onCancel={() => { setupvisible(false) }}
        onOk={() => {
     
          console.log(ref);
          ref.current.validateFields().then(res => {
            console.log(res);
            setupvisible(false)
            ref.current.resetFields()

            settable([...table, {
              ...res
            }])

      

             axios.post('http://localhost:8800/user-manage/save', {
              ...res,
              "status": 1,
              "if_right": false,
            }).then((re) => {
              alert("add user Successful")

            }) 
          }).catch(
            error => console.log(error)
          )
        }}
      >
        <AddForm  region={region}  role={role} ref={ref} upref={upref}></AddForm>

      </Modal>


      <Modal
        visible={visible}
        title="ユーザー改修"
        okText="确认"
        cancelText="Cancel"
        onCancel={() => {
          setvisible(false)
          setisAtive(!isAtive)
        }}
        
        onOk={() => {
     
        
           upref.current.validateFields().then(res => {
        
            setvisible(false)
          
            const newTable = table.map(item => {
              if (item.id === current.id) {
                return {
                  ...item,
                  ...res
                };
              }
              return item;
            });
      
            settable(newTable);

            setisAtive(!isAtive)
            axios.post('http://localhost:8800/user-manage/update', {
              ...res,
              "id":current.id,
            }).then((re) => {
              //  console.log("re", re); 
              alert("Update Successful")
              
            }) 
          .catch(
            error => console.log(error)
          )

          }
          ) 
        }
        
        }
      >
        <UpdateForm username={username} region={region} role={role} ref={upref} isupAtive={isAtive} isupdate={true} />
      </Modal>
    </>
  )


}
