import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchText } from '../../redux/slice/user';


// to display the navigation bar
export default function Navbar() {

  // to store the search text
  const searchTextRef = useRef('');
  const dispatch = useDispatch();

  // to fetch the search text from the input field and store it in search text state
  const getSearchText = () => {
    dispatch(setSearchText(searchTextRef.current.value));
  };


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <Link className="navbar-brand" to="/">User Profiles</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link ml-3" to="/create-user">Create User <span className="sr-only">(current)</span></Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input onChange={getSearchText} ref={searchTextRef} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </>
  )
}
