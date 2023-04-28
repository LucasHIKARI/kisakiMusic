import React from 'react'
import { useState, useEffect } from 'react'
import { Table, Button, Modal, notification } from 'antd'
import { useHistory } from 'umi'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, CloudUploadOutlined } from '@ant-design/icons'
import axios from 'axios'

const { confirm } = Modal;

const draft = () => {
    const [table, settable] = useState([])
    const history = useHistory()
    const {username} = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios.get(`http://localhost:3000/news?author=${username}&auditState=0&_expand=category`).then(
            res => {
                settable(res.data)
            }
        )
    }, [])



    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '新聞標題',
            dataIndex: 'title',
            render: (title, item) => {
                return <a href={`/news-manage/preview/${item.id}`}>{title}</a>
            }

        },
        {
            title: '作者',
            dataIndex: 'author',

        },
        {
            title: '新聞分类',
            dataIndex: 'category',
            render: (catagory) => {
                return catagory.title
            }

        },
        {
            title: 'スイッチ',
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => { deleteitem(item) }} />
                    <Button shape="circle" icon={<EditOutlined />} onClick={() => {
                        history.push(`/news-manage/update/${item.id}`)
                    }} />
                    <Button type='primary' shape="circle" icon={<CloudUploadOutlined onClick={() => handleup(item.id)} />} />

                </div>
            }

        },
    ];
    const handleup = (id) => {
        axios.patch(`http://localhost:3000/news/${id}`, {
            "auditState": 1
        }).then(res => {
            history.push('/audit-manage/list')
            notification.info({
                message: `通知`,
                description:
                    `査定リストへ検査して下さい`,
                placement: 'bottomRight',
            })
        })

    }
    const deleteitem = (item) => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            title: 'デリートしますか',
            onOk() {
                deletea(item)
            },
            onCancel() {

            },
        });
    }
    const deletea = (item) => {



        settable(table.filter(data => data.id !== item.id))
        axios.delete(`http://localhost:3000/news/${item.id}`)
    }

    return (
        <>
            <Table dataSource={table} columns={columns} pagination={{ pageSize: 10 }} rowKey={item => item.id} />
        </>
    )
}

export default draft