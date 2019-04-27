import React from 'react';


const Navbar = ({ username }) => {

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="">
                            <span className="icon">
                                <i className="fas fa-home" aria-hidden="true"></i>
                            </span>
                            <span>{username}</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;

