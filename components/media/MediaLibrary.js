import React, { useContext, useEffect, useState } from 'react'
import { Upload, message, Image, Badge } from 'antd'
import { AuthContext } from '../../context/auth'
import { CloseCircleOutlined, InboxOutlined } from '@ant-design/icons'
import Dragger from 'antd/lib/upload/Dragger'
import { MediaContext } from '../../context/media'
import axios from 'axios'
import toast from 'react-hot-toast'


const MediaLibrary = ({ page = "admin" }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext)
  const [media, setMedia] = useContext(MediaContext)
  const [showPreview, setShowMedia] = useState(false)


  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data } = await axios.get('/media')
        setMedia((prev) => ({ ...prev, images: data }))
      } catch (error) {
        (error);
      }
    }
    fetchMedia()
  }, [])

  const props = {
    name: 'file',
    multiple: true,
    action: `${process.env.NEXT_PUBLIC_API}/upload-image-file`,
    headers: {
      Authorization: `Bearer ${auth.token}`
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        (info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);

        setMedia({
          images: [...media.images, info.file.response],
          selected: info.file.response,
          showMediaModal: false,
        })
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      ('Dropped files', e.dataTransfer.files);
    },

  }

  const handleImageDelete = async (imageId) => {
    try {
      const { data } = await axios.delete(`/media/${imageId}`)
      if (data.ok) {
        setMedia({
          ...media,
          images: media.images.filter((image) => image._id !== imageId),
          selected: null
        })
        toast.error("Image deleted Successfully")
      }
    } catch (error) {
      (error);
    }
  }

  return (
    <>
      <Dragger {...props} accept="image/*">
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'
        >Click or Drag file to this area to Upload</p>
      </Dragger>
      <div style={{ textAlign: "center" }}>
        {media?.images?.map((image) => (
          <Badge>
            <Image
              onClick={() => setMedia({ ...media, selected: image })}
              preview={showPreview}
              src={image.url}
              style={{
                paddingTop: 5,
                paddingRight: 10,
                height: "100px",
                width: "100px",
                objectFit: "cover",
                cursor: "pointer"
              }}
            />
 
            <br />
           {
           page =="author" &&
            image?.postedBy._id == auth?.user?._id? (   <CloseCircleOutlined
              onClick={() => handleImageDelete(image._id)}
              style={{ marginTop: "5px", color: "red" }} />) : page == "admin" ? (   <CloseCircleOutlined
                onClick={() => handleImageDelete(image._id)}
                style={{ marginTop: "5px", color: "red" }} />) : ""}
         
          </Badge>

        ))}

      </div>
    </>
  )
}

export default MediaLibrary