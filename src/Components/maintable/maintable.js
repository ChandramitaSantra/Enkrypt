import React, { useEffect } from 'react';
import { Table, Form } from 'antd';


const getPercentage = (data, key) => {
  let vals = [];
  let totals = [];
  let info = `../public/${data}/${key}.json`
  if (key === "jailbreak") {
    const val = (info.summary.jailbreak / info.summary.total) * 100;
    return parseFloat(val.toFixed(2));
  }
  if (key === "bias") {
    info = info.summary[key][0]; // Adjust based on your data structure
  } else {
    info = info.summary[key]; // Adjust based on your info structure
  }
  for (let val of info) {
    vals.push(val.failed);
    totals.push(val.total);
  }
  const percentage = (sum(vals) / sum(totals)) * 100;
  return parseFloat(percentage.toFixed(2));
};

// Helper function to calculate sum
const sum = (arr) => arr.reduce((a, b) => a + b, 0);

const models=['Claude-3H','DBRX-Instruct', 'Gemma-7B', 'Mixtral8x-7B','NexusRavenV2-13B']

const data = []


// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//   },
//   {
//     key: '4',
//     name: 'Jim Red',
//     age: 32,
//     address: 'London No. 2 Lake Park',
//   },
//   {
//     key: '5',
//     name: 'John Doe',
//     age: 28,
//     address: 'Paris No. 3 Lake Park',
//   },{
//     key: '5',
//     name: 'John Doe',
//     age: 28,
//     address: 'Paris No. 3 Lake Park',
//   },{
//     key: '5',
//     name: 'John Doe',
//     age: 28,
//     address: 'Paris No. 3 Lake Park',
//   },{
//     key: '5',
//     name: 'John Doe',
//     age: 28,
//     address: 'Paris No. 3 Lake Park',
//   },
//   {
//     key: '5',
//     name: 'John Doe',
//     age: 28,
//     address: 'Paris No. 3 Lake Park',
//   },{
//     key: '5',
//     name: 'John Doe',
//     age: 28,
//     address: 'Paris No. 3 Lake Park',
//   },{
//     key: '5',
//     name: 'John Doe',
//     age: 28,
//     address: 'Paris No. 3 Lake Park',
//   },{
//     key: '5',
//     name: 'John Doe',
//     age: 28,
//     address: 'Paris No. 3 Lake Park',
  // },{
  //   key: '5',
  //   model: 'John Doe', 
  //   Risk Score : 28,
  //   Bias : 
  //   Jailbreak :
  //   Malware : 
  //   Toxicity : 
    
  // },
// ];

const FixedTable = () => {

 
  useEffect(() => {
    

models.forEach((model, index) => {
 let modelData={}
    modelData.key=12 
   modelData.model= model
   modelData.bias= getPercentage(model, bias)
   modelData.jailbreak= getPercentage(model, jailbreak)
    modelData.toxicity= getPercentage(model, toxicity)
    modelData.malware= getPercentage(model, malware)
    
    modelData.avg = (modelData.bias+modelData.jailbreak+modelData.toxicity+modelData.malware)/4
  data.push(modelData);
});
    return () => {
      
    };
  }, []);



  const columns = [
    {
      title: 'Model Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Enkrypt AI Risk Score',
      dataIndex: 'avg',
      key: 'avg',
      sorter: (a, b) => a.avg - b.avg,
    },{
        title: 'Jailbreaks',
        dataIndex: 'jailbreaks',
        key: 'jailbreaks',
        sorter: (a, b) => a.jailbreaks - b.jailbreaks,
      },{
        title: 'Toxicity',
        dataIndex: 'toxicity',
        key: 'toxicity',
        sorter: (a, b) => a.toxicity - b.toxicity,
      },{
        title: 'Malware',
        dataIndex: 'malware',
        key: 'malware',
        sorter: (a, b) => a.malware - b.malware,
      },{
        title: 'Bias',
        dataIndex: 'bias',
        key: 'bias',
        sorter: (a, b) => a.bias - b.bias,
      },
   
  ];

  return (
    <div style={{ margin: '0 auto', maxWidth: '700px', Height: '500px', overflowY: 'auto', backgroundColor:'black' }}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 400 }}
      />
    </div>
  );
};

export default FixedTable;
