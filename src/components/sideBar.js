import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentLesson } from '../features/dataSlice.js';
import './Sidebar.css';

function Sidebar() {
  const dispatch = useDispatch();
  const previousLessons = useSelector((state) => state.data.previousLessons);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>

      <div className="drawer-toggle" onClick={toggleDrawer} style={{ fontSize: "20px" }}>
        &#9776; {/*Drawer Toggle button*/}
      </div>

      {/*Open Drawer for small screen*/}
      <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
        <span className="closebtn" onClick={toggleDrawer}>&times;</span>
        <h2>Lessons</h2>
        <ul>
          {previousLessons.length === 0 ? (
            <p>No previous lessons available.</p>
          ) : (
            previousLessons.map((lesson, index) => (
              <li
                key={index}
                onClick={() => dispatch(setCurrentLesson(lesson))}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    dispatch(setCurrentLesson(lesson));
                  }
                }}
                className="lesson-item"
              >
                {lesson.title.length > 25 ? lesson.title.substring(0, 25) + '...' : lesson.title} 
              </li>
            ))
          )}
        </ul>
      </div>

      {/*Regular screen sidebar*/}
      <div className="sidebar">
        <h2>Lessons</h2>
        <ul>
          {previousLessons.length === 0 ? (
            <p>No previous lessons available.</p>
          ) : (
            previousLessons.map((lesson, index) => ( // Stored previous data when input change
              <li
                key={index}
                onClick={() => dispatch(setCurrentLesson(lesson))}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    dispatch(setCurrentLesson(lesson));
                  }
                }}
                className="lesson-item"
              >
                {lesson.title.length > 25 ? lesson.title.substring(0, 25) + '...' : lesson.title}
              </li>
            ))
          )}
        </ul>
      </div>

    </>
  );
}

export default Sidebar;

