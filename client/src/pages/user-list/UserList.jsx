import React, { useState, useContext, useRef, useEffect } from "react";
import UserCard from "../../components/user-card/UserCard";
import "./UserList.css";
import { UsersContext } from "../../context/usersContext";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa";

function UserList() {
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEndOfList, setIsEndOfList] = useState(false);
  const [isStartOfList, setIsStartOfList] = useState(true);
  const [loadedAllUsers, setLoadedAllUsers] = useState(false);
  const { isLoading, getUsersError, users } = useContext(UsersContext);
  const containerRef = useRef(null);

  const usersPerPage = 7;

  useEffect(() => {
    loadMoreUsers();
  }, [users]);

  const loadMoreUsers = () => {
    if (users && users.length > 0) {
      const newVisibleUsers = users.slice(
        0,
        visibleUsers.length + usersPerPage,
      );
      setVisibleUsers(newVisibleUsers);

      if (newVisibleUsers.length === users.length) {
        setLoadedAllUsers(true);
      } else {
        setLoadedAllUsers(false);
      }
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = containerRef.current;

      setIsStartOfList(scrollLeft <= 0);

      setIsEndOfList(scrollLeft + clientWidth >= scrollWidth - 50);

      if (scrollLeft + clientWidth >= scrollWidth - 50 && !loadedAllUsers) {
        loadMoreUsers();
      }
    }
  };

  const handlePrevPage = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="user-l-wrapper">
      <button
        className={`user-l-comp-holder ${isCollapsed ? "fixed-bottom" : ""}`}
        onClick={toggleCollapse}
      >
        {isCollapsed ? <FaArrowUp /> : <FaArrowDown />}
      </button>
      <div className={`user-list-container ${isCollapsed ? "collapsed" : ""}`}>
        <div
          className="user-slideshow"
          ref={containerRef}
          onScroll={handleScroll}
        >
          {isLoading && <p>Loading...</p>}
          {getUsersError && <p>{getUsersError.toString()}</p>}
          {users &&
            visibleUsers.map((user) => <UserCard key={user._id} user={user} />)}
        </div>

        {!isStartOfList && (
          <button className="arrow left-arrow" onClick={handlePrevPage}>
            &#x3c;
          </button>
        )}

        {!isEndOfList && (
          <button className="arrow right-arrow" onClick={handleNextPage}>
            &#x3e;
          </button>
        )}
      </div>
    </div>
  );
}

export default UserList;
