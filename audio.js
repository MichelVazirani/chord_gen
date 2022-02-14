const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var globalGain = audioCtx.createGain();
globalGain.connect(audioCtx.destination);

var midiNoteToFreq = {
        72 : 523.25,
        71 : 493.88,
        70 : 466.16,
        69 : 440.00,
        68 : 415.30,
        67 : 392.00,
        66 : 369.99,
        65 : 349.23,
        64 : 329.63,
        63 : 311.13,
        62 : 293.66,
        61 : 277.18,
        60 : 261.63,
        59 : 246.94,
        58 : 233.08,
        57 : 220.00,
        56 : 207.65,
        55 : 196.00,
        54 : 185.00,
        53 : 174.61,
        52 : 164.81,
        51 : 155.56,
        50 : 146.83,
        49 : 138.59,
        48 : 130.81
}

var rootKey = 60
var maxAmp = 0.95
var maxNoteAmp = 0.95

var attackTime = 0.05
var sustainTime = 1
var decayTime = 0.05



function playNote(freq, startTime) {
    
  let osc = audioCtx.createOscillator();
  let gain = audioCtx.createGain();

  osc.frequency.setValueAtTime(freq, startTime);

  osc.connect(gain);
  gain.connect(globalGain);

  gain.gain.value = 0

  gain.gain.setTargetAtTime(maxNoteAmp, startTime, attackTime);
  osc.start();
  gain.gain.setTargetAtTime(0, startTime + sustainTime, decayTime);

}


function playChord(midiNotes, startTime) {

  globalGain.gain.setTargetAtTime(maxAmp/midiNotes.length, startTime, 0);

  for (midiNote of midiNotes) {
    if (!(midiNote in midiNoteToFreq)) {
        while (midiNote < 48) {
            midiNote = midiNote + 12
        }
        while (midiNote > 72) {
            midiNote = midiNote - 12
        }
    }

    playNote(midiNoteToFreq[midiNote], startTime);
  }

}

function playChordSequence(chords) {
  for (let i = 0; i < chords.length; i++) {
    playChord(chords[i], audioCtx.currentTime + i)
  }

}

function play() {
  var chords = generateChords()
  playChordSequence(chords)
}
