import React from 'react'
import { PageHeader, Steps, Button, Form, Input, Select, message, notification } from 'antd';
import axios from 'axios';
import { useHistory } from 'umi';
import { useState, useEffect, useRef } from 'react';
import style from './add.module.less'
import Edit from '../../components/edit';



const { Step } = Steps;
const { Option } = Select;

const Add = () => {
    const [current, setcurrent] = useState(0)
    const [cateoryList, setcate] = useState([])
    const [editorState, seteditorState] = useState('')
    const [content, setcontent] = useState()
    const formref = useRef()
    const User = JSON.parse(localStorage.getItem('token'))
    const history = useHistory()



    useEffect(() => {
        axios.get(`http://localhost:3000/categories`).then(
            res => setcate(res.data)
        )
    }, [])
    const handlenews = (aduitnum) => {
        axios.post('http://localhost:3000/news', {
            ...content,
            "content": editorState,
            "region": User.region ? User.region : 'global',
            "author": User.username,
            "roleId": User.roleId,
            "auditState": aduitnum,
            "publishState": 0,
            "createTime": Date.now(),
            "star": 0,
            "view": 0,
            // "publishTime": 22122771211028
        }).then(res => {
            history.push(aduitnum === 0 ? '/news-manage/draft' : '/audit-manage/list')
            notification.info({
                message: `通知`,
                description:
                    `${aduitnum === 0 ? '下書き箱' : '査定リスト'}へ検査して下さい`,
                placement: 'bottomRight',
            })
        })
    }
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="新聞編集"
            />
            <Steps current={current}>
                <Step title="基本情報" description="title，新聞分类" />
                <Step title="新聞内容" description="新聞主体内容" />
                <Step title="新聞提出" description="下書き保存、査定提出" />
            </Steps>
            <div style={{ marginTop: '40px' }}>
                <div className={current === 0 ? '' : style.hi}>
                    <Form
                        name="basic"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        ref={formref}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    // autoComplete="off"
                    >
                        <Form.Item
                            label="新聞標題"
                            name="title"
                            rules={[{ required: true, message: 'please input title!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="新聞分类"
                            name="categoryId"
                            rules={[{ required: true, message: 'please select category!' }]}
                        >
                            <Select >
                                {
                                    cateoryList.map(item => {
                                        return <Option value={item.id} key={item.id}>{item.title}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>

                    </Form>
                </div>
                <div className={current === 1 ? '' : style.hi}>
                    <Edit getcontent={(values) => {
                        seteditorState(values)
                    }} />
                </div>
                <div className={current === 2 ? '' : style.hi}>
                </div>
            </div>
            <div style={{ marginTop: '50px' }}>
                {
                    current === 2 && <span>
                        <Button type='primary' onClick={() => handlenews(0)}>下書き保存</Button >
                        <Button danger onClick={() => handlenews(1)}>査定提出</Button >
                    </span>
                }
                {
                    current < 2 && <Button type='primary' onClick={() => {
                        if (current === 0) {
                            formref.current.validateFields().then(
                                res => {
                                    setcontent(res)
                                    setcurrent(current + 1)
                                }
                            )
                        } else {
                            if (editorState === '' || editorState.trim() === '<p></p>') {
                                message.error('内容を入力して下さい')
                            } else {
                                setcurrent(current + 1)
                            }

                        }
                    }} >次</Button >
                }
                {
                    current > 0 && <Button onClick={() => {
                        setcurrent(current - 1)
                    }} >戻る</Button >
                }

            </div>
        </div>
    )
}
export default Add