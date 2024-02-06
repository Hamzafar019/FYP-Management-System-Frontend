import React from 'react';

const AdminHome = () => {
  return (
    <div className="home-container" >
      <h1>Guidelines for Admin</h1>
      <p>Manage User Registration:</p>
      <ul>
        <li>Register new users into the system, ensuring accurate and up-to-date information is collected during the registration process.</li>
        <li>Verify the identity of new users and authenticate their eligibility for system access based on established criteria.</li>
        <li>Assign appropriate user roles and permissions based on the responsibilities and access requirements of each user.</li>
      </ul>

      <p>Handle Password Change Requests:</p>
      <ul>
        <li>Verify the identity of users requesting password changes through a secure authentication process.</li>
        <li>Authenticate the identity of users through additional verification steps, such as security questions or email confirmation.</li>
        <li>Change passwords for users upon successful validation of their identity, ensuring compliance with password security policies.</li>
      </ul>

      <p>Maintain User Accounts:</p>
      <ul>
        <li>Regularly review user accounts to ensure they remain active and up-to-date.</li>
        <li>Deactivate or suspend user accounts as necessary, following established procedures and guidelines.</li>
        <li>Update user information, roles, and permissions as needed based on changes in user status or responsibilities.</li>
      </ul>

      <p>Provide Technical Support:</p>
      <ul>
        <li>Offer technical assistance and troubleshooting support to users experiencing issues with system access or functionality.</li>
        <li>Respond promptly to user inquiries and requests for assistance, providing solutions or escalating issues as necessary.</li>
        <li>Document user support interactions and resolutions for reference and tracking purposes.</li>
      </ul>

      <p>Ensure Data Security and Confidentiality:</p>
      <ul>
        <li>Maintain strict confidentiality of user information and system data in accordance with privacy regulations and policies.</li>
        <li>Implement robust security measures to protect user accounts, passwords, and sensitive data from unauthorized access or disclosure.</li>
        <li>Regularly review and update security protocols and procedures to mitigate potential risks and vulnerabilities.</li>
      </ul>
    </div>
  );
};

export default AdminHome;
