import NewsPublish from '../../components/NewsPublish'
import usePublish from '../../components/usePublish'
import {Button} from 'antd'


const unpublished = () => {
    const {table,handlePublish} = usePublish(1)
    
    return (
        <div>
            <NewsPublish table={table} button={(id)=><Button type='primary' onClick={()=>handlePublish(id)}>发布</Button>}/>
        </div>
    )
}
export default unpublished