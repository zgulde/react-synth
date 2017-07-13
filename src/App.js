import React, { Component } from 'react';
import './App.css';
import Note from './Note';
import synth from './synth';
import 'zgulde-lib';

class App extends Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
    this.addNote = this.addNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.playAll = this.playAll.bind(this);
    this.state = {
      notes: [
        {pitch: 'A4', duration: 300},
        {pitch: 'C5', duration: 300},
        {pitch: 'E5', duration: 300},
      ],
      playing: false,
      synth: 'triangle',
    };
  }

  updateNote(idx) {
    return (e) => {
      const {notes} = this.state;
      this.setState({
        notes: notes.map((note, i) => {
          return idx === i
            ? Object.assign(note, {[e.target.name]: e.target.value})
            : note;
        }),
      });
    };
  }

  deleteNote(id) {
    const notes = this.state.notes.dropIf((_, i) => id === i);
    this.setState({notes});
  }

  addNote() {
    this.setState({notes: this.state.notes.concat([{duration: 300, pitch: 'A4'}])});
  }

  playSound({pitch, duration, delay = 0}) {
    return new Promise((resolve, reject) => {
      const s = synth[this.state.synth];
      s.play({pitch, wait: delay});
      setTimeout(() => {
        s.stop();
        resolve();
      }, duration);
    });
  }

  playAll() {
    this.setState({playing: true});
    const {notes} = this.state;
    const p = notes.rest().reduce((p, note) => {
      return p.then(() => this.playSound(note));
    }, this.playSound(notes.first()));
    p.then(() => this.setState({playing: false}));
  }

  render() {
    return (
      <div className="App">
        <label>
          Synth:
          <select value={this.state.synth} onChange={e => this.setState({synth: e.target.value})}>
            {Object.keys(synth).map((synthName, i) => {
            return <option key={i}>{synthName}</option>;
            })}
          </select>
        </label>
        <button disabled={this.state.playing} onClick={this.playAll}>Play</button>
        {this.state.notes.map((note, i) => {
          return <Note key={i}
            {...note}
            deleteNote={() => this.deleteNote(i)}
            updatePitch={this.updateNote(i)}
            updateDuration={this.updateNote(i)} />;
        })}
        <button onClick={this.addNote}>Add Note</button>
      </div>
    );
  }
}

export default App;
