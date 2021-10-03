import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../App.css';
import { Layout, Menu } from 'antd';
import { DesktopOutlined,UserOutlined, HistoryOutlined, LogoutOutlined, ContactsOutlined,  } from '@ant-design/icons';
import logo from "../assets/logo5.jpg"
import { Select} from 'antd';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import TableScrollbar from 'react-table-scrollbar';

const { Option } = Select;

const { Header, Content, Footer, Sider } = Layout;
export const History = (props) => {

    const history = useHistory();
    const routeChange = (url) =>{
        history.push(url)
    }

    const [state, setState] = useState({ username: props.user});
    const [detail, setDetail] = useState([])
    let token = localStorage.getItem("auth")
    token = token.slice(1,-1)

    const Logout = () =>{
    
      console.log(detail[0]['name'])
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

      useEffect(() => {
        fetch("http://127.0.0.1:8000/covid/history/", {
          method: "POST",
          mode: "cors",
          headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json",
            "Authorization" : `Token ${token}`
          },
          body:JSON.stringify(state)
        })
          .then(res => res.json())
          .then(data => {
          setDetail(detail => [...data])

            console.log(detail,data)
          });
      }, []);

    

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
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
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
        <Menu.Item key="5" icon={<LogoutOutlined />} onClick = {() => Logout()}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header className="site-layout-sub-header-background bg-gray-500" style={{ padding: 0,minHeight:50, backgroundColor: ""}} value = "hello"/>
      <Content style={{ margin: '24px 16px 0' }}>
      <div className="site-layout-background"  style={{ padding: 20, height: 530, backgroundColor: '' }}>
      <div class="flex flex-col">
      <h2 class="uppercase font-bold text-gray-600 text-3xl text-center pb-8"><b><u>History Of Patients</u></b></h2>
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" >
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"  style={{ padding: 20, height:400, width:1250 }}>
        <TableScrollbar height = "400px">
        <table class="min-w-full divide-y divide-gray-200" >
          <thead class="bg-gray-50" >
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient_Id
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone No
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Covid Status
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200" >
          {detail.map((dict,index) => { 
            return <>
              <tr key={index}>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dict.id}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dict.name}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dict.age}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dict.gender}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dict.phone_no}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dict.email}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span style = {{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>
                  {dict.address}
                </span>  
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dict.date}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dict.time}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dict.covid_status}</td>
              </tr>
            </>
          })}
          </tbody>
          
        </table>
        </TableScrollbar>
      </div>
    </div>
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