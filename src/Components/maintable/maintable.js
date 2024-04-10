import React, { useEffect } from 'react';
import { Table, Form } from 'antd';
import { datas } from '../../data/export';
import './maintable.css';

const getPercentage = (data, key) => {
	const sum = (arr) => arr.reduce((a, b) => a + b, 0);
	let vals = [];
	let totals = [];
	//let info = `../../../public/${data}/${key}.json`;
	let info = datas[data];
	if (key === 'jailbreak') {
		//const val = (info.summary.jailbreak / info.summary.total) * 100;
		const val = 10;
		return parseFloat(val.toFixed(2));
	}
	if (key === 'bias') {
		info = info.bias.summary[key][0];
		console.log(info);
		// Adjust based on your data structure
		// info = 10;
	} else {
		info = datas[data][key].summary[key]; // Adjust based on your info structure
		//info = 10;
	}
	for (let val of info) {
		vals.push(val.failed);
		totals.push(val.total);
	}
	const percentage = (sum(vals) / sum(totals)) * 100;
	return parseFloat(percentage.toFixed(2));
};

// Helper function to calculate sum

const models = [
	'Claude-3H',
	'DBRX-Instruct',
	'Gemma-7B',
	'Mixtral8x-7B',
	'NexusRavenV2-13B'
];

const data = [];

const FixedTable = () => {
	const loadData = () => {
		console.log('executed');
		models.forEach((model, index) => {
			if (models.some((obj) => obj.name === model) == false) {
				let modelData = {};
				modelData.key = index;
				modelData.name = model;
				modelData.bias = getPercentage(model, 'bias');
				modelData.jailbreaks = getPercentage(model, 'jailbreak');
				modelData.toxicity = getPercentage(model, 'toxicity');
				modelData.malware = getPercentage(model, 'malware');

				modelData.avg = Math.round(
					(modelData.bias +
						modelData.jailbreaks +
						modelData.toxicity +
						modelData.malware) /
						4
				);
				data.push(modelData);
			}
		});
	};

	loadData();

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
		}
	];

	return (
		<div
			style={{
				margin: '0 auto',
				maxWidth: '700px',
				Height: '500px',
				overflowY: 'auto',
				
			}}
		>
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
