// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

let specimenCounter = 0;

const pAequorFactory = () => {
  let specimen = {
    specimenNum: specimenCounter,
    dna: mockUpStrand(),

    mutate: function () {
      //select random base
      let randomIndex = Math.floor(Math.random() * 15);
      //change to random different base
      switch (this.dna[randomIndex]) {
        case 'A':
          this.dna[randomIndex] = ['T', 'C', 'G'][Math.floor(Math.random() * 3)];
          break
        case 'T':
          this.dna[randomIndex] = ['A', 'C', 'G'][Math.floor(Math.random() * 3)];
          break
        case 'C':
          this.dna[randomIndex] = ['A', 'T', 'G'][Math.floor(Math.random() * 3)];
          break
        case 'G':
          this.dna[randomIndex] = ['A', 'T', 'C'][Math.floor(Math.random() * 3)];
          break
      }

      //return mutated dna
      return this.dna;
    },

    compareDNA: function (otherPAequor) {
      let inCommon = 0;
      //iterate through 15 bases
      for (i = 0; i < 15; i++) {
        //compare bases
        if (otherPAequor.dna[i] === this.dna[i]) {
          inCommon++;
        }
      }
      console.log(`Specimen #${otherPAequor.specimenNum} and specimen #${this.specimenNum} have ${Math.round((inCommon / 15) * 100)}% DNA in common`)
    },

    willLikelySurvive: function () {
      let cAndGCount = 0;
      for (i = 0; i < 15; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          cAndGCount++;
        }
      }
      return (cAndGCount > 8)
    },

    complementStrand() {
      //initialize complementary DNA strand
      complementaryDna = [];

      //iterate through dna
      for (i = 0; i < this.dna.length; i++) {
        switch (this.dna[i]) {
          case 'A':
            complementaryDna.push('T');
            break
          case 'T':
            complementaryDna.push('A');
            break
          case 'C':
            complementaryDna.push('G');
            break
          case 'G':
            complementaryDna.push('C');
            break
        }
      }
      return complementaryDna;
    }
  }
  specimenCounter++;
  return specimen
};

let storage = [];

while (storage.length < 30) {
  let temp = pAequorFactory();
  if (temp.willLikelySurvive() === true) {
    storage.push(temp);
  }
}

console.log(storage);

//test first five orgs
for (i = 0; i < 5; i++) {
  console.log(storage[i])
}

//test mutate()
console.log(storage[0].dna);
storage[0].mutate();
console.log(storage[0].dna);

//test compareDNA()
storage[1].compareDNA(storage[2]);

//test complementStrand()
console.log(storage[0].complementStrand())