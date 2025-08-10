// import React,{ useState } from 'react'
// import { Button, message, Modal, Table  } from 'antd';
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)
  
//   const [messageApi, contextHolder] = message.useMessage();
//   const info = () => {
//     messageApi.info('Hello, Ant Design!');
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [data, setData] = useState([])


//  const fetchData = () => {    
//   const requestOptions = {
//     method: "GET", 
//     headers: { "Content-Type": "application/json" },
//   };    

//   fetch("http://localhost:3000/api/todos", requestOptions)
//     .then((response) => response.json())
//     .then((data) => {
//       setData(data);        
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error("Ошибка при получении данных:", error);
//     });
// };


//   return (
//     <>
//     <Modal
//         title="Basic Modal"
//         closable={{ 'aria-label': 'Custom Close Button' }}
//         open={isModalOpen}
//         onOk={() => setIsModalOpen(false)}
//         onCancel={() => setIsModalOpen(false)}
//       >
//       </Modal>

//    {contextHolder}
//       <Button type="primary" onClick={info}>
//         Display normal message
//       </Button>


//       <Button type="primary" onClick={() => setIsModalOpen(true)}>
//         Open Modal
//       </Button>
//       <Button onClick={() =>  {fetchData()}}>asd</Button>
//       <Table
//         size="small"
//         dataSource={data}
//         columns={[
//           {
//             title: "id",
//             dataIndex: "id",
//             key: "id",
//           },
//           {
//             title: "title",
//             dataIndex: "title",
//             key: "title",
//           },
//           {
//             title: "completed",
//             dataIndex: "completed",
//             key: "completed",
//           },
//         ]}
//       />
//     </>
//   )
// }

// export default App



// import React, { useState } from 'react';
// import { Button, message, Table } from 'antd';
// import './App.css';
// import LoginForm from './LoginForm';
// import RegisterForm from './RegisterForm';
// import { isLoggedIn, logout } from './auth';
// import Products from './Products';
// function App() {
//   const [user, setUser] = useState(null);
//   const [data, setData] = useState([]);

//   const fetchData = () => {
//     fetch('http://localhost:3000/api/todos') // или /api/products, если поменяешь
//       .then(res => res.json())
//       .then(setData)
//       .catch(() => message.error('Ошибка загрузки данных'));
//   };

//   if (!isLoggedIn() && !user) {
//     return (
//       <div style={{ maxWidth: 400, margin: '2rem auto' }}>
//         <h2>Вход</h2>
//         <LoginForm onLogin={(username) => setUser(username)} />
//         <h3 style={{ marginTop: '2rem' }}>или регистрация:</h3>
//         <RegisterForm />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div style={{ padding: 20 }}>
//         <h2>Привет, {user || 'пользователь'}!</h2>
//         <Button type="primary" onClick={() => fetchData()}>
//           Загрузить данные
//         </Button>
//         <Button danger style={{ marginLeft: 10 }} onClick={() => { logout(); setUser(null); }}>
//           Выйти
//         </Button>
//         <Table
//           rowKey="id"
//           style={{ marginTop: 20 }}
//           size="small"
//           dataSource={data}
//           columns={[
//             { title: "id", dataIndex: "id" },
//             { title: "title", dataIndex: "title" },
//             { title: "completed", dataIndex: "completed" },
//           ]}
//         />
//       </div>

//        <Products />;
//     </>
//   );
// }

// export default App;


import React from 'react';

import { useAuth } from './hooks/useAuth';
import Auth from './pages/Auth';
import Home from './pages/Home';
import './App.css';

function App() {
  const { user, login, logout } = useAuth();

  return (
    <div className="App">
      {user ? <Home user={user} onLogout={logout} /> : <Auth onLogin={login} />}
    </div>
  );
}

export default App;
