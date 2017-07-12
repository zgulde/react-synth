import Wad from 'web-audio-daw';

const synth = {
  sawtooth: new Wad({source : 'sawtooth'}),
  sine: new Wad({source : 'sine'}),
  square: new Wad({source : 'square'}),
  triangle: new Wad({source : 'triangle'}),
};

export default synth;
