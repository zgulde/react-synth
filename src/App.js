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
    this.updateDuration = this.updateDuration.bind(this);
    this.updatePitch = this.updatePitch.bind(this);
    this.playAll = this.playAll.bind(this);
    this.state = {
      notes: [
        {pitch: 'A4', duration: 300},
        {pitch: 'C5', duration: 300},
        {pitch: 'E5', duration: 300},
      ],
      playing: false,
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

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.dropIf((_, i) => id === i),
    });
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
        <button disabled={this.state.playing} onClick={this.playAll}>Play</button>
        {this.state.notes.map((note, i) => {
          return <Note key={i}
            {...note}
            deleteNote={() => this.deleteNote(i)}
            updatePitch={this.updatePitch(i)}
            updateDuration={this.updateDuration(i)} />;
        })}
        <button onClick={this.addNote}>Add Note</button>
      </div>
    );
  }
}

export default App;
