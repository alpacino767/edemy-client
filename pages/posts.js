import React from 'react'
import axios from 'axios'
import { Row, Col, Card, Avatar,Button } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import { useState,useEffect } from 'react'

const { Meta } = Card

export const Posts = ({ posts }) => {
//   state
const [allPosts, setAllPosts] = useState(posts)
const [total, setTotal] = useState(0)
const [page, setPage] = useState(1)
const [loading, setLoading] = useState(false)

useEffect(() => {
getTotal()
}, [])
useEffect(() => {
    if(page === 1) return
    loadMore()
    }, [page])

const getTotal = async () => {
    try {
      const {data} = await axios.get("/post-count")
      setTotal(data.total)
    } catch (error) {
         (error);
    }
}

const loadMore = async () => {
    try {
        setLoading(true)
        const {data} = await axios.get(`/posts/${page}`)
        setAllPosts([...allPosts, ...data])
        setLoading(false)
    } catch (error) {
        (error);
        setLoading(false)
    }
}
   
    return (
    <>
        <Head>
            <title>Recent Blog Post</title>
            <meta description="Blog posts about web development,programming etc" />
        </Head>
        <Row gutter={12}>
            
            {allPosts.map((post) => (
                <Col xs={24} xl={8} style={{ marginTop: 5, marginBottom: 5 }}>
                <Link href={`/post/${post.slug}`}>
                <Card hoverable
                        cover={<Avatar shape='square' style={{ height: "200px" }}
                            src={post.featuredImage?.url || "images/default.png"}
                            alt={post.title} />}
                    >
                        <Meta title={post.title} />
                    </Card>
                </Link>
                </Col>
            ))}

        </Row> 

       {/* {allPosts?.length < total && (
           <Row>
           <Col span={24} style={{textAlign: "center" , padding: 20}}>
               <Button size='large' type='primary' loading={loading} onClick={() => setPage(page + 1)}>
                   Load More
               </Button>
           </Col>

       </Row>
       )} */}

        <Row>
            <Col span={24} style={{textAlign: "center" , padding: 20}}>
                <Button size='large' type='primary' loading={loading} onClick={() => setPage(page + 1)}>
                    Load More
                </Button>
            </Col>

        </Row>
    </>
    )
}
export async function getServerSideProps() {
    const { data } = await axios.get(`${process.env.API}/posts/1`)
   
    return {
        props: {
            posts: data,
        }
    }
}

export default Posts