




import NewsPublish from '../../components/NewsPublish'
import usePublish from '../../components/usePublish'
import {Button} from 'antd'


const sunset = () => {
    const {table,handleSunset} = usePublish(2)
    
    return (
        <div>
            <NewsPublish table={table} button={(id)=><Button danger onClick={()=>handleSunset(id)}>下线</Button>}/>
        </div>
    )
}
export default sunset