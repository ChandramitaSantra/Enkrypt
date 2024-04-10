import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './Components/Sidebar/Sidebar';
import './App.css';
import Select from 'react-select';
import FixedTable from './Components/maintable/maintable';
import BiasBarChart from './Components/Barcharts/biasbar';
import JailbreakBarChart from './Components/Barcharts/jailbreakbar';
import MalwareBarChart from './Components/Barcharts/malwarebar';
import ToxicityBarChart from './Components/Barcharts/toxicitybar';
import { Menu } from './Components/Menue/Menue'; // Ensure the path is correct

const { Header, Content } = Layout;

const options = [
  { value: 'Claude-3H', label: 'Claude-3H' },
  { value: 'Command-R+', label: 'Command-R+' },
  { value: 'DBRX-Instruct', label: 'DBRX-Instruct' },
  { value: 'GPT-3.5-turbo', label: 'GPT-3.5-turbo' },
  { value: 'GPT-4-turbo', label: 'GPT-4-turbo' },
  { value: 'Gemma-7B', label: 'Gemma-7B' },
  { value: 'InternLM2-Chat-20B', label: 'InternLM2-Chat-20B' },
  { value: 'JambaV0.1', label: 'JambaV0.1' },
  { value: 'Lla ma2-13B', label: 'Lla ma2-13B' },
  { value: 'NexusRavenV2-13B', label: 'NexusRavenV2-13B' },
  { value: 'Mixtral8x7B', label: 'Mixtral8x7B' },

  
];
const menuCfg = [
  { title: 'Bias', href: '/one'},
  { title: 'Jailbreaks', href: '/two'},
  { title: 'Toxicity', href: '/three'},
  { title: 'Malware', href: '/four'},
  
]


const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'black' : 'black',
    borderColor: state.isFocused ? '#4D9AFF' : '#303338',
    '&:hover': {
      borderColor: state.isFocused ? '#4D9AFF' : '#303338',
    },
    fontSize: '14px', // Reduced font size
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#4D9AFF' : null,
    '&:hover': {
      backgroundColor: '#4D9AFF',
    },
    fontSize: '14px', // Reduced font size
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'black',
    fontSize: '14px', // Reduced font size
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '200px',
    overflowY: 'auto',
    marginTop: 0,
    padding: '4px 0', // Reduced padding
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#FFFFFF',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: '#303338',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#ffffff',
  }),
};

function App() {
  const [selectedModel, setSelectedModel] = useState(null);

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#0E1117' }}>
      <Sidebar />
      <Layout className="site-layout" style={{ marginLeft: '250px' }}>
        <Header className="site-layout-header" style={{ backgroundColor: '#0E1117', color: 'white', padding: '0 24px', fontSize: '54px', marginTop: '40px', fontWeight: 'bold' }}>
          Enkrypt AI Red Teaming Suite
        </Header>
        <Content className="site-layout-content" style={{ padding: '24px', marginTop: '60px', fontSize: '45px' }}>
          <div style={{ textAlign: 'left', color: 'white', fontSize: '24px' }}>
            This interactive demo illustrates Enkrypt AI's red teaming suite. Red teaming forms a small piece of our overall goal of accessing and improving the security of AI models, hence increase trust and accelerate enterprise adoption of generative AI models. Our Sentry Guardrails that protect LLMs during inference, and our Generative AI Gateway and Governance Platform that provides a comprehensive view of the security posture of AI models, are other components of our security suite. Do reach out to us at <a href="mailto:hello@enkryptai.com" style={{ color: 'blue' }}>hello@enkryptai.com</a> for more information.
          </div>
          <div style={{ marginTop: '40px' }}>
            <FixedTable />
          </div>
        </Content>
        <div style={{ textAlign: 'left', color: 'white', fontSize: '24px', padding: '24px' }}>
          
          <div className="multi-select-dropdown">
            <Select
              options={options}
              onChange={(selectedOption) => setSelectedModel(selectedOption.value)}
              placeholder="Choose an option"
              styles={customStyles}
            />
          </div >
          <div style={{  color: 'white' }}>
          <Menu config={menuCfg} />
          </div>
          
        </div>

        {selectedModel && (
          <>
            <div style={{ marginTop: '20px', color: 'white' }}>
              <h2>Bias</h2>
              <BiasBarChart selectedModel={selectedModel} />
            </div>
            <div style={{ marginTop: '20px', color: 'white' }}>
              <h2>Jailbreak</h2>
              <JailbreakBarChart selectedModel={selectedModel} />
            </div>
            <div style={{ marginTop: '20px', color: 'white' }}>
              <h2>Toxicity</h2>
              <ToxicityBarChart selectedModel={selectedModel} />
            </div>
            <div style={{ marginTop: '20px', color: 'white' }}>
              <h2>Malware</h2>
              <MalwareBarChart selectedModel={selectedModel} />
            </div>
          </>
        )}
      </Layout>
    </Layout>
  );
}

export default App;
