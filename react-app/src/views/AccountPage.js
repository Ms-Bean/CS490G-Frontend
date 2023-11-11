import React, { useState } from "react";
import EditAccountForm from "../components/EditAccountForm";
import '../css/AccountPage.css'

const AccountPage = () => {
    const tabs = ["Account Details", "Billing", "Password"];
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    }

    return (
        <div className="main_container mt-4 container">
            <div className="main_row row">
                <div className="side_bar col-lg-3 d-flex flex-column">
                    <h3 className="mt-2">Manage Account</h3>
                    <ul className="mt-3 nav nav-pills flex-column">
                        {tabs.map((tab, id) => (
                            <li className="nav-item my-2">
                            <span 
                                className={`nav-link lead ${activeTab === id ? "active" : ""}`}
                                onClick={() => handleTabClick(id)}
                                >{tab}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="main_bar col-lg-9">
                    {activeTab === 0 && 
                    <>
                        <div className="d-flex justify-content-center">
                            <h1 className="m-2">Account Details</h1>
                        </div>
                        <EditAccountForm/>

                    </>
                    }
                    {activeTab === 1 && 
                    <>
                        <div className="d-flex justify-content-center">
                            <h1 className="m-2">Billing</h1>
                        </div>
                    </>
                    }
                    {activeTab === 2 && 
                    <>
                        <div className="d-flex justify-content-center">
                            <h1 className="m-2">Password</h1>
                        </div>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}

export default AccountPage;