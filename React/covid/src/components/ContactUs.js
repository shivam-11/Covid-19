import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../App.css';
import { Layout, Menu } from 'antd';
import {  DesktopOutlined,UserOutlined, HistoryOutlined, LogoutOutlined, ContactsOutlined  } from '@ant-design/icons';
import logo from "../assets/logo5.jpg";
import covid from "../assets/covid2.jpg";
import { Form, Input, InputNumber, Button,Select, Upload } from 'antd';
import { useHistory } from 'react-router';
import { useState } from "react";

const { Option } = Select;

const { Header, Content, Footer, Sider } = Layout;
export const ContactUs = () => {

    const [state, setState] = useState({ name: "", email: "", phone_no:"",message:""});

    const handleChange = (event) => {
      const { name, value } = event.target;
      setState(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };

      const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 70 }}>
            <Option value="91">+91</Option>
          </Select>
        </Form.Item>
      );

      const history = useHistory();
    const routeChange = (url) =>{
        history.push(url)
    }

    const onFinish = (event) => {
        
      event.preventDefault();
      console.log(state)
      let token = localStorage.getItem("auth")
      token = token.slice(1,-1)
      console.log(`Token ${token}`)

    fetch("http://127.0.0.1:8000/covid/contactus/",{
          method: "POST",
          mode: "cors",
          headers:{
              "Accept" : "application/json",
              "Content-Type" : "application/json",
              "Authorization" : `Token ${token}`,
              
          },
          body:JSON.stringify(state),
      })
     

    
    //console.log(localStorage.getItem("auth"))
    };


    const Logout = () =>{

      console.log("cgcsg")

      let token = localStorage.getItem("auth")
      token = token.slice(1,-1)

      fetch("http://127.0.0.1:8000/covid/logout/",{
            method: "POST",
            mode: "cors",
            headers:{
                "Authorization" : `Token ${token}`,
            },
  
        }).then(resp =>{
          
          if (resp.status>=200 && resp.status<300){
          localStorage.removeItem("auth")  
          history.push('/login') 
          }
          else{
            alert("something wrong, sorry for inconvenience")
          }
        }); 
      
        

    }

  
    

return(
  <>
  <Layout>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="bg-gray-lighter md:h-full w-full md:flex-1 bg-cover bg-center bg-no-repeat" style={{width:150, height:40,marginTop:20, marginLeft:20,backgroundImage: `url(${logo})`}} />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
      <Menu.Item key="1" icon={<DesktopOutlined />} onClick = {() => routeChange("/dash")}>
          DashBoard
        </Menu.Item>

        <Menu.Item key="2" icon={<UserOutlined />} onClick = {() => routeChange("/aboutus")} >
          AboutUs
        </Menu.Item>
        <Menu.Item key="3" icon={<ContactsOutlined />} onClick = {() => routeChange("/contactus")}>
          ContactUs
        </Menu.Item>
        <Menu.Item key="4" icon={<HistoryOutlined />} onClick = {() => routeChange("/history")}>
          History
        </Menu.Item>
        <Menu.Item key="5" icon={<LogoutOutlined />} onClick = {() => Logout()}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header className="site-layout-sub-header-background bg-gray-500" style={{ padding: 0,minHeight:50, backgroundColor: ""}} value = "hello"/>
      
      <Content style={{ margin: '24px 16px 0' }}>
      <div className="site-layout-background" style={{ padding: 20,  height: 530, display:'flex' }}> 
      <div className="bg-gray-lighter md:h-full w-full md:flex-1 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${covid})`,padding:20, marginTop:20, width:660,height:450}}></div>
      <div className="site-layout-background"  style={{ padding: 20, marginTop:20, width:600, height: 450, backgroundColor: '' }}>
      <Form {...layout} name="nest-messages" >   
      <Form.Item  label="Name" rules={[{ required: true }]} onChange = {handleChange}>
        <Input name= "name" />
      </Form.Item>

      <Form.Item  label="Email" rules={[{ required: true, type: 'email' }]} onChange = {handleChange}>
        <Input name = "email"/>
      </Form.Item>

      <Form.Item label="Phone no" onChange = {handleChange}>
      <Input addonBefore={prefixSelector} style={{ width: '100%' }} name="phone_no" />
      </Form.Item>

      <Form.Item  label="Message" rules={[{ required: true, }]} onChange = {handleChange}>
        <Input.TextArea name = "message" />
      </Form.Item>

      
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" style={{ marginLeft: 100}} onClick={(e) => onFinish(e)}>
          Submit
        </Button>
      </Form.Item>

      </Form> 
      </div>
           
      
      </div> 
      </Content>
      <Footer style={{ textAlign: 'center' }}>SHI Design ©2018 Created by SHI UED</Footer>
    </Layout>
  </Layout>
  <div style = {{height:33,width:200, backgroundColor:"#111d2c"}}></div>
  </>
)
};