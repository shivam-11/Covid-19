import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../App.css';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, HistoryOutlined, LogoutOutlined, ContactsOutlined,  } from '@ant-design/icons';
import logo from "../assets/logo5.jpg"
import { Form, Input, InputNumber, Button,Select, Upload } from 'antd';
import { useHistory } from 'react-router';
import { useState } from "react";
import SkeletonImage from 'antd/lib/skeleton/Image';

const { Option } = Select;


const { Header, Content, Footer, Sider } = Layout;
export const Dash = (props) => {

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };

    const [gender, setGender] = useState("")  
    const [report,setReport] = useState()
    const [bool,setBool] = useState(false)

    const data = new FormData();


      const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };

      const onFinish = (event) => {
        event.preventDefault();
        data.append('user_name', props.user)
        data.append('name',state.name)
        data.append('email',state.email)
        data.append('age',state.age)
        data.append('gender',gender)
        data.append('phone_no',state.phoneno)
        data.append('address',state.address)
        console.log(data)
        for(var pair of data.entries()) {
          console.log(pair[0]+ ',,, '+ pair[1]);
        }
        let token = localStorage.getItem("auth")
        token = token.slice(1,-1)
        console.log('Token {$token}')

      fetch("http://127.0.0.1:8000/covid/dash/",{
            method: "POST",
            mode: "cors",
            headers:{
                "Accept" : "application/json",
                "Authorization" : `Token ${token}`,
                
            },
            body:data,
        }).then(res => res.json())
        .then(data =>{setBool(true);setReport(data.message)}) 
       

      
      //console.log(localStorage.getItem("auth"))
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

    const [state, setState] = useState({ name: "", email: "", age: "", gender:"", phoneno:"", address: "", image: "" });

    const handleChange = (event) => {
         
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const Logout = () =>{

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
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<UserOutlined />}>
          <b>{props.user}</b>
          
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />} onClick = {() => routeChange("/aboutus")}>
          AboutUs
        </Menu.Item>
        <Menu.Item key="3" icon={<ContactsOutlined />} onClick = {() => routeChange("/contactus")}>
          ContactUs
        </Menu.Item>
        <Menu.Item key="4" icon={<HistoryOutlined />} onClick = {() => routeChange("/history")}>
          History
        </Menu.Item>
        <Menu.Item key="5" icon={<LogoutOutlined />} onClick={() => Logout()}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header className="site-layout-sub-header-background bg-gray-500" style={{ padding: 0,minHeight:50, backgroundColor: ""}} value = "hello"/>
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 20,  height: 530, display:'flex',backgroundColor: '' }}> 
         
        <div className="site-layout-background" style={{ padding: 20, width:750, height: 450, backgroundColor: '' }}>
        
        <Form {...layout} name="nest-messages"   validateMessages={validateMessages}>
      <Form.Item label="Name" onChange = {handleChange} rules={[{ required: true }]}>
        <Input name = 'name' />
      </Form.Item>
      <Form.Item label="Email" onChange = {handleChange} rules={[{ required: true, type: 'email' }]}>
        <Input name = 'email'/>
      </Form.Item>
      <Form.Item label="Age" onChange = {handleChange} rules={[{ required: true, type: 'number', min: 0, max: 99 }]}>
        <InputNumber name = 'age' />
      </Form.Item>
      <Form.Item label="Gender"  rules={[{ required: true }]}>
      <Select placeholder="select your gender" name = 'gender' onChange={value => {setGender(value);}}>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Phone no" onChange = {handleChange}>
      <Input addonBefore={prefixSelector} name = 'phoneno' style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Address" onChange = {handleChange}>
        <Input.TextArea name = 'address'/>
      </Form.Item>

      <Form.Item
        label="Upload"
        rules={[{  }]}
        icon={<UploadOutlined />}
      >
          <Input type = 'file' onChange = {(value) => {data.append("image", value.target.files[0]); data.append("x_ray_image", value.target.files[0])}} />
          
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" style={{ marginTop:20,marginLeft: 60}} onClick={(e) => onFinish(e)}>
          Submit
        </Button>
      </Form.Item>
    </Form>
        </div> 
        <div  style={{ padding: 20, marginLeft: 60, marginTop: 15 , width:400, height: 400, backgroundColor: '#F5F5DC' }}>
          <h1 style = {{textAlign:'center',fontSize:30}}><u>Covid-19 Report</u></h1>
          {bool && <div style={{ padding: 20,marginTop:10 }}>
          <h3>Status : {report}</h3>
          <h3>Name : {state.name}</h3>
          <h3>Age : {state.age}</h3>
          <h3>Gender : {gender}</h3>
          <h3>Phone : {state.phoneno}</h3>
          </div>}
          {bool && <div  style={{ padding: 20, marginTop:10 }}>
          <h3>Note* : If you have any symptom related to covid then contact your closest covid center. Because this is only for learning and research purpose.</h3>
          </div>}
        
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