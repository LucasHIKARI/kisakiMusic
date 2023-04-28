import { useEffect, useState } from "react"
import axios from "axios"

const usePublish = (type) => {
    const [table, settable] = useState([])
    const { username } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios.get(`http://localhost:3004/news?author=${username}&publishState=${type}&_expand=category`).then(
            res => {
                settable(res.data)
            }
        )
    }, [username, type])
    const handleDelete = (id) => {
        settable(table.filter(data => data.id !== id))
        axios.delete(`http://localhost:5000/news/${id}`).then(res => {
            notification.info({
                message: `通知`,
                description:
                    `該当新聞すでにデリートされました`,
                placement: 'bottomRight',
            })
        })
    }
    const handleSunset = (id) => {
        settable(table.filter(data => data.id !== id))
        axios.patch(`http://localhost:3004/news/${id}`, {
            "publishState": 3
        }).then(res => {
            notification.info({
                message: `通知`,
                description:
                    `[発表管理/ラインオフ]へ検査して下さい`,
                placement: 'bottomRight',
            })
        })

    }
    const handlePublish = (id) => {
        settable(table.filter(data => data.id !== id))
        axios.patch(`http://localhost:3004/news/${id}`, {
            "publishState": 2,
            "publishTime": Date.now()
        }).then(res => {
            notification.info({
                message: `通知`,
                description:
                    `[発表管理/発表済み]へ検査して下さい`,
                placement: 'bottomRight',
            })
        })
    }
    return {
        table,
        handleDelete,
        handlePublish,
        handleSunset
    }
}
export default usePublish