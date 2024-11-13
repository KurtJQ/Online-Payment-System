import React, { useState, useRef } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [showDropdown, setShowDropdown] = useState(false);
  const userContainerRef = useRef(null);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <div className="top-box box">
        <h1 className="college-name">St. Clare College
        of Caloocan Inc.</h1> 
        <div className="user-info-container" ref={userContainerRef} style={{ display: 'flex', alignItems: 'center' }}>
          {/* Apply flexbox to the user-info-container */}
          <button className="icon-button"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"/>
            </svg>
          </button>
          <button onClick={handleDropdownToggle} style={{ marginLeft: '10px' }}> 
            {/* Add some margin-left for spacing */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
            </svg>
            <span className="user-name">John Doe</span>
          </button>
          {showDropdown && (
            <div className="dropdown-container">
              <div className="dropdown-menu">
                <div className="dropdown-item">User Info</div>
                <div className="dropdown-item">Settings</div>
                <div className="dropdown-item">Logout</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="left-box box">
        <div className="left-box-buttons"> 
          <button className="left-box-button">Overview</button>
          <button className="left-box-button">Transaction</button>
          <button className="left-box-button">Payment</button>
        </div>
      </div>
      <main>
        <div className="balance-container"> 
          <p>Balance Container</p>
        </div>
        <div className="middle-container"> 
          <p>This is the main content area.</p>
        </div>
        <div className="recent-container">
          <div className="recent-container-box">
            <div className="recent-container-1">
              <p>Recent Container 1</p>
            </div>
          </div>
          <div className="recent-container-box">
            <div className="recent-container-2">
              <p>Recent Container 2</p>
            </div>
          </div>
          <div className="recent-container-box">
            <div className="recent-container-3">
              <p>Recent Container 3</p>
            </div>
          </div>
          <div className="see-more-container">
            <button className="see-more-button">See More</button>
          </div>
        </div>
      </main>
      <div className="bottom-box box">
      </div>
    </div>
  );
}

export default App;