import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Input, Button } from 'antd';
import { datas } from '../../data/export';
import './maintable.css';

const getPercentage = (data, key) => {
  const sum = (arr) => arr.reduce((a, b) => a + b, 0);
  let vals = [];
  let totals = [];
  let info = datas[data];
  if (key === 'jailbreak') {
    const val = 10; // Replace this with your calculation
    return parseFloat(val.toFixed(2));
  }
  if (key === 'bias') {
    info = info.bias.summary[key][0];
  } else {
    info = datas[data][key].summary[key];
  }
  for (let val of info) {
    vals.push(val.failed);
    totals.push(val.total);
  }
  const percentage = (sum(vals) / sum(totals)) * 100;
  return parseFloat(percentage.toFixed(2));
};

const models = [
  'Claude-3H',
  'DBRX-Instruct',
  'Gemma-7B',
  'Mixtral8x-7B',
  'NexusRavenV2-13B'
];

const FixedTable = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const loadData = () => {
      const newData = models.map((model, index) => ({
        key: index,
        name: model,
        bias: getPercentage(model, 'bias'),
        jailbreaks: getPercentage(model, 'jailbreak'),
        toxicity: getPercentage(model, 'toxicity'),
        malware: getPercentage(model, 'malware'),
        avg: Math.round(
          (getPercentage(model, 'bias') +
            getPercentage(model, 'jailbreak') +
            getPercentage(model, 'toxicity') +
            getPercentage(model, 'malware')) /
            4
        ),
        selected: false // Add a selected property to track checkbox state
      }));
      setData(newData);
    };

    loadData();
  }, []);

  const handleCheckboxChange = (index) => {
    const newData = [...data];
    newData[index].selected = !newData[index].selected;
    setData(newData);
  };

  const handleSearch = () => {
    // Filter data based on the search text
    const filteredData = models.filter(model =>
      model.toLowerCase().includes(searchText.toLowerCase())
    );

    // Update the table data with the filtered results
    const newData = filteredData.map((model, index) => ({
      key: index,
      name: model,
      bias: getPercentage(model, 'bias'),
      jailbreaks: getPercentage(model, 'jailbreak'),
      toxicity: getPercentage(model, 'toxicity'),
      malware: getPercentage(model, 'malware'),
      avg: Math.round(
        (getPercentage(model, 'bias') +
          getPercentage(model, 'jailbreak') +
          getPercentage(model, 'toxicity') +
          getPercentage(model, 'malware')) /
          4
      ),
      selected: false // Add a selected property to track checkbox state
    }));
    setData(newData);
  };

  const columns = [
    {
      title: 'Model Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Enkrypt AI Risk Score',
      dataIndex: 'avg',
      key: 'avg',
      sorter: (a, b) => a.avg - b.avg
    },
    {
      title: 'Jailbreaks',
      dataIndex: 'jailbreaks',
      key: 'jailbreaks',
      sorter: (a, b) => a.jailbreaks - b.jailbreaks
    },
    {
      title: 'Toxicity',
      dataIndex: 'toxicity',
      key: 'toxicity',
      sorter: (a, b) => a.toxicity - b.toxicity
    },
    {
      title: 'Malware',
      dataIndex: 'malware',
      key: 'malware',
      sorter: (a, b) => a.malware - b.malware
    },
    {
      title: 'Bias',
      dataIndex: 'bias',
      key: 'bias',
      sorter: (a, b) => a.bias - b.bias
    },
    {
      title: 'Select',
      key: 'select',
      render: (text, record, index) => (
        <Checkbox checked={record.selected} onChange={() => handleCheckboxChange(index)} />
      )
    }
  ];

  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: '700px',
        Height: '500px',
        overflowY: 'auto'
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <Input
          placeholder="Search Model Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginRight: '8px', width: '200px' }}
        />
        <Button type="primary" onClick={handleSearch}>Search</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 400 }}
        rowClassName={(record, index) => 'bgColor'}
      />
    </div>
  );
};

export default FixedTable;
