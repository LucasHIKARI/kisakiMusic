import React, { useState, useEffect, forwardRef } from 'react'
import { Input, Select, Form, Radio, message, Popconfirm } from 'antd'


const UpdateForm = forwardRef(({ region, role, isupAtive, isupdate }, ref) => {

    const [isAtive, setisAtive] = useState(false)

    useEffect(() => {
        setisAtive(isupAtive)
    }, [isupAtive])



    return (


        <Form
            // form={form}
            ref={ref}
            layout="vertical"
            name="form_in_modal"


        >
            <Form.Item
                name="username"
                label="用戶名"
                rules={[{ required: true, message: 'Please input required userName' }]}

            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="passWord"
                rules={[{ required: true, message: 'Please input required passWord' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="region"
                label="region"
                rules={isAtive ? [] : [{ required: false, message: 'Please input required region' }]}

            >
                <Select
                    disabled={isAtive}
                >
                    {
                        region.map(item => {
                            return <Option value={item.value} key={item.id} /* disabled={checkregion(item)} */ >{item.title}</Option>
                        })
                    }

                </Select>
            </Form.Item>

            <Form.Item
                name="role"
                label="role"
                rules={[{ required: true, message: 'Please input required role' }]}


            >
                <Select
                    // value就是roleId
                    onChange={(value) => {
                        if ((value < 4 && value > 0) || value === 8) {
                            setisAtive(true)
                            ref.current.setFieldsValue({
                                region: ''
                            })
                        } else {
                            setisAtive(false)
                        }
                    }}
                >
                    {
                        role.map(item => {
                            /*     console.log(item); */
                            return <Option value={item.id} key={item.roleCode}  /* disabled={checkregion(item)} */ >{item.roleName}</Option>
                        })
                    }

                </Select>
            </Form.Item>

        </Form>
    )
})
export default UpdateForm