import { useState, useEffect, useContext, useRef } from 'react'
import { Table, Button, Modal, Input, Form } from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import React from 'react';


import axios from 'axios'

const { confirm } = Modal;
const EditableContext = React.createContext(null);
const category = () => {
    const [table, settable] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/categories').then(
            res => {
                settable(res.data)
            }
        )
    }, [])
    const handleSave = (record) => {
        settable(table.map(item => {
            if (item.id === record.id) {
                return {
                    id: item.id,
                    title: record.title,
                    value: record.title
                }
            }
            return item
        }))
        axios.patch(`http://localhost:5000/categories/${record.id}`, {
            title: record.title,
            value: record.title
        })
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '栏目名称',
            dataIndex: 'title',
            onCell: (record) => ({
                record,
                editable: true,
                dataIndex: 'title',
                title: '栏目名称',
                handleSave,
            })

        },
        {
            title: 'スイッチ',
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => { deleteitem(item) }} />
                </div>
            }

        }
    ]


    const EditableRow = ({ index, ...props }) => {
      const [form] = Form.useForm();
      return (
          <Form form={form} component={false}>
              <EditableContext.Provider value={form}>
                  <tr {...props} />
              </EditableContext.Provider>
          </Form>
      );
  };
    const deleteitem = (item) => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            title: '确认删除吗',
            onOk() {
                deletea(item)
            },
            onCancel() {

            }
        })
    }
    const deletea = (item) => {
        settable(table.filter(data => data.id !== item.id))
        axios.delete(`http://localhost:3000/categories/${item.id}`)
    }



    const EditableCell = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
    }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef(null);
        const form = useContext(EditableContext);
        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({
                [dataIndex]: record[dataIndex],
            });
        };

        const save = async () => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({ ...record, ...values });
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };
    return (
        <>
            <Table dataSource={table} columns={columns} pagination={{ pageSize: 5 }} rowKey={item => item.id}
                components={{
                    body: {
                        row: EditableRow,
                        cell: EditableCell,
                    },
                }}
            />
        </>
    )
}

export default category