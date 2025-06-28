import React,{ useState } from 'react'
import { Button, message, Modal, Table  } from 'antd';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info('Hello, Ant Design!');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState([])


 const fetchData = () => {    
  const requestOptions = {
    method: "GET", 
    headers: { "Content-Type": "application/json" },
  };    

  fetch("http://localhost:8080/api/todos", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      setData(data);        
      console.log(data);
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
    });
};


  return (
    <>
    <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
      </Modal>

   {contextHolder}
      <Button type="primary" onClick={info}>
        Display normal message
      </Button>


      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>
      <Button onClick={() =>  {fetchData()}}>asd</Button>
      <Table
        size="small"
        dataSource={data}
        columns={[
          {
            title: "id",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "title",
            dataIndex: "title",
            key: "title",
          },
          {
            title: "completed",
            dataIndex: "completed",
            key: "completed",
          },
        ]}
      />
    </>
  )
}

export default App
