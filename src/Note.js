import React from 'react';
import './Note.css';
import {pitchesArray as pitches} from 'web-audio-daw';

const Note = (props) => {

  const humanReadableDurations = [
    [1, '1'],
    [0.5, '1/2'],
    [0.25, '1/4'],
    [0.125, '1/8'],
    [0.0625, '1/16'],
  ];

  return (
    <div className='Note'>
      <label className='pitch-select'>
        Note
        <select name='pitch' onChange={props.updatePitch} value={props.pitch}>
          {pitches.map(pitch => <option key={pitch}>{pitch}</option>)}
        </select>
      </label>
      <div className='duration-buttons'>
        Duration <br />
        {humanReadableDurations.map(([duration, pretty]) => {
          return (
            <label key={duration} className='duration-radio'>{pretty}
              <input
                checked={props.duration == duration}
                name={`duration_${props.index}`}
                onChange={props.updateDuration}
                value={duration}
                type='radio' />
            </label>
          );
        })}
      </div>
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
