import React from 'react';
import './Note.css';
import {pitchesArray as pitches} from 'web-audio-daw';

const Note = (props) => {

  const noteDurations = [ '1', '1/2', '1/4', '1/8', '1/16' ];

  return (
    <div className='Note'>
      <label>
        Note
        <select name='pitch' onChange={props.updatePitch} value={props.pitch}>
          {pitches.map(pitch => <option key={pitch}>{pitch}</option>)}
        </select>
      </label>
      <p>
        Duration
      </p>
      {noteDurations.map((noteDuration) => {
        return (
          <label key={noteDuration} className='duration-radio'>{noteDuration}
            <input name={`duration_${props.index}`} onChange={props.updateDuration} value={eval(noteDuration)} type='radio' />
          </label>
        );
      })}
      <div className="controls">
        <button className="play" onClick={() => props.play(props)}>Play</button>
        <button className="delete" onClick={props.deleteNote}>Delete</button>
        </div>
    </div>
  );
};

Note.defaultProps = {
  pitch: 'A4',
  duration: 300,
};

export default Note;
