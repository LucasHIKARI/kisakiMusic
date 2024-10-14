import { Table } from 'antd'

const list = (props) => {
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
            title: 'スイッチ',
            render: (item) => {
                return <div>
                    {props.button(item.id)}
                </div>
            }

        },
    ];
    return (
        <>
            <Table dataSource={props.table} columns={columns} pagination={{ pageSize: 5 }} rowKey={item => item.id} />
        </>
    )
}

export default list