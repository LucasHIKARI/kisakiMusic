



import NewsPublish from '../../components/NewsPublish'
import usePublish from '../../components/usePublish'
import {Button} from 'antd'


const sunset = () => {
    const {table,handleDelete} = usePublish(3)
    
    return (
        <div>
            <NewsPublish table={table} button={(id)=><Button danger onClick={()=>handleDelete(id)}>删除</Button>}/>
        </div>
    )
}
export default sunset