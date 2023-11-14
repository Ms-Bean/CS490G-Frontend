import React, { useState } from 'react';
import EditAccountForm from '../components/EditAccountForm';

const AccountPage = () => {
    const tabs = ['Account Details', 'Billing', 'Password'];
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <div className='container-fluid justify-content-center'>
                    <ul className='navbar-nav'>
                        {tabs.map((tab, id) => (
                            <li className='nav-item mx-2'>
                                <span 
                                    className={`nav-link ${activeTab === id ? 'active' : ''}`}
                                    onClick={() => handleTabClick(id)}
                                >
                                    {tab}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
            <div className='container col-md-5 mt-2'>
                <div className='row'>
                    <div className='col-12'>
                        {activeTab === 0 && (
                            <>
                                <h1 className='text-center'>Account Details</h1>
                                <EditAccountForm />
                            </>
                        )}
                        {activeTab === 1 && <h1 className='text-center'>Billing</h1>}
                        {activeTab === 2 && <h1 className='text-center'>Password</h1>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
