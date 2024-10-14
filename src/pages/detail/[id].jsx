
// import { PageHeader, Descriptions } from 'antd'
// import axios from 'axios'
// import { HeartTwoTone } from '@ant-design/icons';
// import moment from 'moment'
// import { useEffect, useState } from 'react'
// import { useParams } from 'umi'

// const detail = () => {
//     const [newsinfo, setnewsinfo] = useState()
//     const params = useParams()
//     useEffect(() => {
//         axios.get(`http://localhost:5000/news/${params.id}?_expand=category&_expand=role`).then(
//             res => {
//                 setnewsinfo({
//                     ...res.data,
//                     view: res.data.view + 1
//                 })
//                 return res.data
//             }
//         ).then(res => {
//             axios.patch(`http://localhost:5000/news/${params.id}`, {
//                 view: res.view + 1
//             })
//         })
//     }, [params.id])
//     return (
//         <div>
//             {
//                 newsinfo && <div>
//                     <PageHeader
//                         onBack={() => window.history.back()}
//                         title={newsinfo.title}
//                         subTitle={<div>
//                             {newsinfo.category.title}
//                             <HeartTwoTone twoToneColor="#eb2f96" style={{ paddingLeft: '10px' }} onClick={() => {
//                                 setnewsinfo({
//                                     ...newsinfo,
//                                     star: newsinfo.star + 1
//                                 })
//                                 axios.patch(`http://localhost:5000/news/${params.id}`, {
//                                     star: newsinfo.star + 1
//                                 })
//                             }} />
//                         </div>}
//                     >
//                         <Descriptions size="small" column={3}>
//                             <Descriptions.Item label="创建者">{newsinfo.author}</Descriptions.Item>
//                             <Descriptions.Item label="发布时间">{newsinfo.publishTime ? moment(newsinfo.createTime).format('YYYY/MM/DD HH:mm:ss') : '-'}</Descriptions.Item>
//                             <Descriptions.Item label="区域">{newsinfo.region}</Descriptions.Item>
//                             <Descriptions.Item label="访问数量"><span style={{ color: 'green' }}>{newsinfo.view}</span></Descriptions.Item>
//                             <Descriptions.Item label="点赞数量"><span style={{ color: 'green' }}>{newsinfo.star}</span></Descriptions.Item>
//                             <Descriptions.Item label="评论数量"><span style={{ color: 'green' }}>0</span></Descriptions.Item>

//                         </Descriptions>
//                     </PageHeader>
//                     <div dangerouslySetInnerHTML={{
//                         __html: newsinfo.content
//                     }} style={{ margin: '0 24px', border: '0.6px solid green' }} />
//                 </div>
//             }

//         </div>
//     )
// }
// export default detail