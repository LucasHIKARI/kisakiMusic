const index = (props) => {

    return (
        <div>
            {props.children}
        </div>
    )

}
// 防止直接url访问绕过登陆
index.wrappers = ['@/wrappers/Auth'];
export default index