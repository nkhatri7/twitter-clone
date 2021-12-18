import React from 'react';
import SettingsHeader from '../../components/SettingsHeader/SettingsHeader';
import './AccountInformation.scss';

const AccountInformation = ({ activeUser }) => {
    return (
        <div className='account-information'>
            <SettingsHeader activeUser={activeUser} pageTitle={'Account Information'} />
        </div>
    );
}

export default AccountInformation;
