import React, { useState } from 'react';
import './SwitchToggle.css';

const SwitchExample = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          style={{ display: 'none' }} // Hide the checkbox
          role="switch"
          id="collapseSwitch"
          checked={isCollapsed}
          onChange={toggleCollapse}
        />
        <label className="form-check-label" htmlFor="collapseSwitch"></label>
      </div>

      {isCollapsed && (
        <div className="collapse show" id="collapseExample">
          <div className="card card-body">
          Enkrypt AI's Sentry suite is a comprehensive and cutting-edge solution designed to enable secure, responsible, and compliant generative AI adoption within enterprises. As organizations increasingly leverage the transformative power of large language models (LLMs), the Sentry suite provides a robust control layer, ensuring seamless alignment with enterprise standards for privacy, security, and compliance.

The Sentry suite comprises four key components: Gateway/Governance, Red Teaming, Guardrails, and Compliance.
          </div>
        </div>
      )}
    </>
  );
};

export default SwitchExample;
