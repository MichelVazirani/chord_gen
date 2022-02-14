
/*

TODO:
- generate diatonic triads
- generate permutations of triads that follow functional harmony

*/


diatonicTriads = {
    1 : [60,64,67],
    2 : [62,65,69],
    3 : [64,67,71],
    4 : [65,69,72],
    5 : [67,71,74],
    6 : [69,72,76],
    7 : [71,74,77]
}

tonicChords = [1,3,6]
dominantChords = [5,7]
subdominantChords = [2,4]

chordToFunction = {
    1 : "tonic",
    2 : "subdomninant",
    3 : "tonic",
    4 : "subdomninant",
    5 : "dominant",
    6 : "tonic",
    7 : "dominant"
}


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function getRandomChordFromType(chordType) {
    let chordIdx = randomIntFromInterval(0, chordType.length - 1)
    return chordType[chordIdx]
}





function generateFourChords() {

    var chords = []
    var prevChord = -1

    for (_ = 0; _ < 4; _++) {

        let newChord;
        if (prevChord == -1) { // Start on tonic
            newChord = getRandomChordFromType(tonicChords)

        } else if (tonicChords.includes(prevChord)) {
            let newChordTypeSelect = randomIntFromInterval(1, 10);

            if (newChordTypeSelect <= 2) {
                newChord = getRandomChordFromType(tonicChords)
            } else if (newChordTypeSelect > 2 && newChordTypeSelect <= 6) {
                newChord = getRandomChordFromType(dominantChords)
            } else {
                newChord = getRandomChordFromType(subdominantChords)
            }
            
        } else if (dominantChords.includes(prevChord)) {
            let newChordTypeSelect = randomIntFromInterval(1, 10);
            
            if (newChordTypeSelect <= 2) {
                newChord = getRandomChordFromType(dominantChords)
            } else {
                newChord = getRandomChordFromType(tonicChords)
            }

        } else if (subdominantChords.includes(prevChord)) {
            let newChordTypeSelect = randomIntFromInterval(1, 10);
            
            if (newChordTypeSelect <= 2) {
                newChord = getRandomChordFromType(subdominantChords)
            } else if (newChordTypeSelect > 2 && newChordTypeSelect <= 5) {
                newChord = getRandomChordFromType(tonicChords)
            } else {
                newChord = getRandomChordFromType(dominantChords)
            }
        }

        chords.push(newChord)
        prevChord = newChord
    }

    return chords.map(chordNumber => diatonicTriads[chordNumber])
}



function generateChords() {
    var chords = generateFourChords()
    return chords;
}

