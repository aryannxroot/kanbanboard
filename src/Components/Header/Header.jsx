import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './Header.css';


const Header = ({ grouping, setGrouping, sorting, setSorting }) => {
  return (
    <header className="header">
      <Dropdown
        grouping={grouping}
        setGrouping={setGrouping}
        sorting={sorting}
        setSorting={setSorting}
      />
    </header>
  );
};

export default Header;

