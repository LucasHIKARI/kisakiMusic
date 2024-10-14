import React from 'react'
import { useState, useEffect } from 'react'
import { Table, Button, notification } from 'antd'
import axios from 'axios'


const audit = () => {
    const [table, settable] = useState([])
    const { roleId, region, username } = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        const roleOBJ = {
            "1": 'superadmin',
            "2": 'admin',
            "3": 'editor'
        }
        axios.get('http://localhost:3004/news?auditState=1&_expand=category').then(
            res => {
                settable(roleOBJ[roleId] === 'superadmin' ? res.data : [
                    ...res.data.filter(item => item.author === username),
                    ...res.data.filter(item => item.region === region && roleOBJ[item.roleId] === 'editor')
                ])
            }
        )
    }, [roleId, region, username])
    const columns = [
        {
            title: '新聞标题',
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
            title: '操作',
            render: (item) => {
                return <div>
                    <Button onClick={() => handlenews(item, 2, 1)} type='primary'>通过</Button>
                    <Button onClick={() => handlenews(item, 3, 0)} danger>驳回</Button>
                </div>
            }

        }
    ]
    const handlenews = (item, auditState, publishState) => {
        settable(table.filter(data => data.id !== item.id))
        axios.patch(`http://localhost:3004/news/${item.id}`, {
            auditState,
            publishState
        }).then(res => {
            // history.push(aduitnum === 0 ? '/news-manage/draft' : '/audit-manage/list')
            notification.info({
                message: `通知`,
                description:
                    `査定リストへ検査して下さい`,
                placement: 'bottomRight',
            })
        })
    }
    return (
        <div>
            <Table dataSource={table} columns={columns} pagination={{ pageSize: 10 }} rowKey={item => item.id} />
        </div>
    )
}
export default audit