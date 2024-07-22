
// Function working with update 

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typewriter from 'typewriter-effect';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import './Content.css';
import { setLoading } from '../features/dataSlice';

function Content() {
  const dispatch = useDispatch();
  const currentLesson = useSelector((state) => state.data.currentLesson);
  const [showEquation, setShowEquation] = useState(false);
  const [typewriterKey, setTypewriterKey] = useState(0);

  useEffect(() => {
    if (showEquation && currentLesson && currentLesson.equation) {
      const equationElement = document.getElementById('equation');
      if (equationElement) {
        katex.render(currentLesson.equation, equationElement, {
          throwOnError: false,
        });
      }
    }
  }, [showEquation, currentLesson]);

  useEffect(() => {
    setTypewriterKey((prevKey) => prevKey + 1);
    setShowEquation(false);
  }, [currentLesson]);

  useEffect(() => {
    if (!currentLesson) {
      dispatch(setLoading(false));
    }
  }, [currentLesson, dispatch]);

  if (!currentLesson) {
    return (
      <div className="content">
        <p className="no-lesson-message">No lesson generated yet.</p>
      </div>
    );
  }

  const descriptionText = typeof currentLesson.description === 'string' ? currentLesson.description : '';
  const equationText = typeof currentLesson.equation === 'string' ? currentLesson.equation : '';

  return (
    <div className="content">
      <h2>Lesson Name: {currentLesson.title}</h2>
      <div className="description">
        <Typewriter
          key={typewriterKey}
          options={{
            autoStart: true,
            delay: 50,
            cursor: '',
            wrapperClassName: 'typewriter-text',
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString(descriptionText)
              .callFunction(() => {
                setShowEquation(true);
              })
              .pauseFor(500)
              .callFunction(() => {
                const equationElement = document.getElementById('equation');
                if (equationElement) {
                  katex.render(equationText, equationElement, {
                    throwOnError: false,
                  });
                }
                dispatch(setLoading(false));
              })
              .start();
          }}
        />
      </div>
      <div className="equation-large">
        {showEquation && <span id="equation"></span>}
      </div>
    </div>
  );
}

export default Content;













