import {List} from "antd"
import Link from "next/link"

const PostList = ({posts, handleDelete, handleEdit}) => {
    (posts, "from postlist");
    return(
        <List
        itemLayout='horizontal'
                 dataSource={posts}
                 renderItem={(item)=> (
                    <List.Item
                    actions={[
                        <a onClick={() => handleEdit(item)}>edit</a>,
                        <a onClick={() => handleDelete(item)}>delete</a>,
                    ]}
                    >
                    <List.Item.Meta title={item.title} />
                    </List.Item>
                 )}>

        </List>
    )
}
export default PostList