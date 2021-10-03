import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../App.css';
import { Layout, Menu } from 'antd';
import { DesktopOutlined , UserOutlined, HistoryOutlined, LogoutOutlined, ContactsOutlined,  } from '@ant-design/icons';
import logo from "../assets/logo5.jpg"
import covid from "../assets/covid2.jpg"
import { Form, Input, InputNumber, Button,Select, Upload } from 'antd';
import { useHistory } from 'react-router';

const { Option } = Select;

const { Header, Content, Footer, Sider } = Layout;
export const AboutUs = () => {

    const history = useHistory();
    const routeChange = (url) =>{
        history.push(url)
    }


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
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
        <Menu.Item key="1" icon={<DesktopOutlined />} onClick = {() => routeChange("/dash")}>
          DashBoard
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
        <Menu.Item key="5" icon={<LogoutOutlined />} onClick ={()=> Logout()} >
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header className="site-layout-sub-header-background bg-gray-500" style={{ padding: 0,minHeight:50, backgroundColor: ""}} value = "hello"/>
      <Content style={{ margin: '24px 16px 0' }}>
      <div className="site-layout-background" style={{ padding: 20,  height: 530, display:'flex' }}>
        
			<div class="bg-gray-lighter md:h-full w-full md:flex-1 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${covid})`}}></div>

			<div class="bg-orange-100 text-orange-900 md:h-full w-full md:flex-1 flex justify-center items-center">
				<div class="px-8 md:px-16">
					<h1 class="text-lg md:text-3xl mb-6">COVID-19</h1>
					<p class="mb-6 leading-normal text-sm md:text-base">WHO does not advise using masks or respirators with exhalation valves. These masks are intended for industrial workers to prevent dust and particles from being breathed in as the valve closes on inhale. However, the valve opens on exhale, making it easier to breathe but also allowing any virus to pass through the valve opening. This makes the mask ineffective at preventing the spread of COVID-19 or any other respiratory virus. <a href="#more" class="text-black text-sm">Read More</a></p>
				</div>
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