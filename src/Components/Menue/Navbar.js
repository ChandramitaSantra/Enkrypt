import React, { useState } from 'react';
import './Navbar.css';
import BiasBarChart from '../Barcharts/biasbar';
import JailbreaksBarChart from '../Barcharts/jailbreakbar';
import MalwareBarChart from '../Barcharts/malwarebar';
import ToxicityBarChart from '../Barcharts/toxicitybar';
function Navbar(selectedModel) {
	const [activeLink, setActiveLink] = useState('Bias');

	const handleLinkClick = (link) => {
		setActiveLink(link);
	};

	return (
		<>
			<div className="navbar-container">
				<ul>
					<li
						className={
							activeLink === 'Bias' ? 'nav-link active-link' : 'nav-link'
						}
						onClick={(e) => {
							e.preventDefault();
							handleLinkClick('Bias');
						}}
					>
						<a href="#">Bias</a>
						<div className="underline"></div>
					</li>
					<li
						className={
							activeLink === 'Jailbreak' ? 'nav-link active-link' : 'nav-link'
						}
						onClick={(e) => {
							e.preventDefault();
							handleLinkClick('Jailbreak');
						}}
					>
						<a href="#">Jailbreak</a>
						<div className="underline"></div>
					</li>
					<li
						className={
							activeLink === 'Toxicity' ? 'nav-link active-link' : 'nav-link'
						}
						onClick={(e) => {
							e.preventDefault();
							handleLinkClick('Toxicity');
						}}
					>
						<a href="#">Toxicity</a>
						<div className="underline"></div>
					</li>
					<li
						className={
							activeLink === 'Malware' ? 'nav-link active-link' : 'nav-link'
						}
						onClick={(e) => {
							e.preventDefault();
							handleLinkClick('Malware');
						}}
					>
						<a href="#">Malware</a>
						<div className="underline"></div>
					</li>
				</ul>
			</div>
			<div className="barchart-container">
				{activeLink === 'Bias' && (
					<BiasBarChart selectedModel={selectedModel} />
				)}
				{activeLink === 'Jailbreak' && <JailbreaksBarChart />}
				{activeLink === 'Toxicity' && <ToxicityBarChart />}
				{activeLink === 'Malware' && <MalwareBarChart />}
			</div>
		</>
	);
}

export default Navbar;
