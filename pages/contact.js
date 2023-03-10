import { useContext, useState, useEffect } from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router'


function ContactForm() {


    // state
    const [loading, setLoading] = useState(false)
    // hooks
    const router = useRouter()
      const [form] = Form.useForm();


    const onFinish = async (values) => {
        // ('values =>', values);
        setLoading(true)
        try {
           const { data } = await axios.post("/contact", values)
           if(data?.error) {
            toast.error(data?.error)
            setLoading(false)
           } else {
            toast.success("Your message has been sent")
            form.resetFields()
            setLoading(false)
           }

        } catch (error) {
            (error);
            setLoading(false)
            toast.error('Email in  failed. Try again')
        }
    }

    return (
        <Row>
            <Col span={8} offset={8}>
                <h1 style={{ paddingTop: '100px' }}>Contact</h1>


                <Form
                    form={form}
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >

                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: "true", message: "Please enter your name"
                            },
                        ]}
                        hasFeedback
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Your name" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter your Email!',
                            },
                            //   hasFeedback
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Your Email"
                        />
                    </Form.Item>

                    <Form.Item
                        name="message"
                        rules={[
                            {
                                required: "true", message: "Please enter your message"
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.TextArea prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Write your message here" />
                    </Form.Item>



                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </Col>


        </Row>
    );
}
export default ContactForm;