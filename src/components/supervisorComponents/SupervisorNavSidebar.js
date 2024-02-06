// CollapsibleNavbar.js
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Supervisor.css';

const SupervisorNavSidebar = () => {
  const [showAdditionalItems, setShowAdditionalItems] = useState({
    Announcement: false,
    FYP_Suggestions_All_FYPS: false,
    MyGroups: false,
  });

  const toggleAdditionalItems = (itemName) => {
    setShowAdditionalItems((prevItems) => ({
      ...prevItems,
      [itemName]: !prevItems[itemName]
    }));
  };
  
  return (
    <div id='navsidebar'>
    <nav>
      <ul style={{ marginTop: '80px' }}>
        <li>
          <Link to="/supervisor">Home</Link>
        </li>

        <li>
          <button onClick={() => toggleAdditionalItems('Announcement')}>
          Announcements
          </button>
          {showAdditionalItems.Announcement && (
            <ul className="additional-items">
              <Link to="/supervisor/viewannouncements">- View Announcements</Link>
              {/* <Link to="/student">- All Annuncement</Link> */}
            </ul>
          )}
        </li>
        <li>
          <button onClick={() => toggleAdditionalItems('FYP_Suggestions_All_FYPS')}>
          FYP Suggestions, All FYPs
          </button>
          {showAdditionalItems.FYP_Suggestions_All_FYPS && (
            <ul className="additional-items">
              <Link to="/supervisor/scores">- Scores</Link>
              <Link to="/supervisor/addFYPideas">- New FYP Ideas</Link>
              <Link to="/supervisor/viewFYPideas">- View FYP Suggestions</Link>
              <Link to="/supervisor/viewallFYP">- View all FYPs</Link>
              <Link to="/supervisor/rejectedFYP">- Rejected FYP</Link>
              {/* <li>- Item B</li>
              <li>- Item C</li> */}
            </ul>
          )}
        </li> 
        <li>
          <button onClick={() => toggleAdditionalItems('MyGroups')}>
          FYP Groups and Submissions
          </button>
          {showAdditionalItems.MyGroups && (
            <ul className="additional-items">
              <Link to="/supervisor/viewFYPsubmissions">- View FYP Submission </Link>
              <Link to="/supervisor/mygroups">- My Groups </Link>
              <Link to="/supervisor/createmeetings">- Create Meetings </Link>
              <Link to="/supervisor/meetingsdetails">- Meetings Details </Link>
              
              <Link to="/supervisor/addvideos">- Add Videos </Link>
              <Link to="/supervisor/viewvideos">- View Videos </Link>
              <Link to="/supervisor/viewwork">- View Work </Link>
              {/* <li>- Item B</li>
              <li>- Item C</li> */}
            </ul>
          )}
        </li> 
        {/* <li>
          <button onClick={() => toggleAdditionalItems('ThirdItem')}>
          Third Item
          </button>
          {showAdditionalItems.ThirdItem && (
            <ul className="additional-items">
              <li>- Item X</li>
              <li>- Item Y</li>
              <li>- Item Z</li>
            </ul>
          )}
        </li> */}

      </ul>
    </nav>
    </div>
  );
};

export default SupervisorNavSidebar;
