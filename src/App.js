import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Note from './Note';
import synth from './synth';

class App extends Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
    this.addNote = this.addNote.bind(this);
    this.updateDuration = this.updateDuration.bind(this);
    this.updatePitch = this.updatePitch.bind(this);
    this.playAll = this.playAll.bind(this);
    this.state = {
      notes: [
        {pitch: 'A4', duration: 300},
        {pitch: 'C5', duration: 300},
        {pitch: 'E5', duration: 300},
      ],
    };
  }

  updatePitch(idx) {
    return (e) => {
      const {notes} = this.state;
      this.setState({
        notes: notes.map((note, i) => {
          if (idx === i) {
            return Object.assign(note, {pitch: e.target.value});
          }
          return note;
        }),
      });
    };
  }

  updateDuration(idx) {
    return (e) => {
      const {notes} = this.state;
      this.setState({
        notes: notes.map((note, i) => {
          if (idx === i) {
            return Object.assign(note, {duration: e.target.value});
          }
          return note;
        }),
      });
    };
  }

  addNote() {
    this.setState({notes: this.state.notes.concat([{duration: 300, pitch: 'A4'}])});
  }

  playSound({pitch, duration, delay = 0}) {
    return new Promise((resolve, reject) => {
      console.log('playSound promise!');
      synth.sine.play({pitch, wait: delay});
      setTimeout(() => {
        synth.sine.stop();
        resolve();
      }, duration);
    });
  }

  playAll() {
    let p = Promise.resolve();
    const {notes} = this.state;
    for(let i = 0; i < notes.length; i += 1) {
      const {pitch, duration} = notes[i];
      // const delay = i === 0 ? 0 : notes[i - 1].duration;
      p = p.then(() => this.playSound({pitch, duration}));
    }
  }

  render() {
    console.log(this.state.notes);
    return (
      <div className="App">
        <button onClick={this.playAll}>Play</button>
        {this.state.notes.map((note, i) => {
          return <Note key={i}
            {...note}
            updatePitch={this.updatePitch(i)}
            updateDuration={this.updateDuration(i)} />;
        })}
        <button onClick={this.addNote}>Add Note</button>
      </div>
    );
  }
}

export default App;