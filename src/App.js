import React from 'react';
import { Layout } from 'antd';
import Sidebar from './Components/Sidebar/Sidebar'; // Make sure the path matches your directory structure
import './App.css';
import FixedTable from './Components/maintable/maintable';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#0E1117' }}> {/* Ensure the background is black */}
      <Sidebar />
      <Layout className="site-layout" style={{ marginLeft: '250px' }}> {/* Adjust based on actual sidebar width */}
        <Header className="site-layout-header" style={{ backgroundColor: '#0E1117', color: 'white', padding: '0 24px', fontSize: '54px', marginTop:'40px', fontWeight: 'bold' }}>
          Enkrypt AI Red Teaming Suite
        </Header>
        <Content className="site-layout-content" style={{ padding: '24px', marginTop: '60px' , fontSize: '45px'}}>
          <div style={{ textAlign: 'left', color: 'white', fontSize: '24px' }}>
            This interactive demo illustrates Enkrypt AI's red teaming suite. Red teaming forms a small piece of our overall goal of accessing and improving the security of AI models, hence increase trust and accelerate enterprise adoption of generative AI models. Our Sentry Guardrails that protect LLMs during inference, and our Generative AI Gateway and Governance Platform that provides a comprehensive view of the security posture of AI models, are other components of our security suite. Do reach out to us at <a href="mailto:hello@enkryptai.com" style={{ color: 'blue' }}>hello@enkryptai.com</a> for more information.
          </div>
          <div style={{ marginTop: '40px' }}>
            <FixedTable />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
