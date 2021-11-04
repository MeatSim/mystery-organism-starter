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
      for (let i = 0; i < 15; i++) {
        //compare bases
        if (otherPAequor.dna[i] === this.dna[i]) {
          inCommon++;
        }
      }
      const percentageInCommon = Math.round((inCommon / 15) * 100);

      console.log(`Specimen #${otherPAequor.specimenNum} and specimen #${this.specimenNum} have ${percentageInCommon}% DNA in common`);

      return percentageInCommon;
    },

    willLikelySurvive: function () {
      let cAndGCount = 0;
      for (let i = 0; i < 15; i++) {
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
      for (let i = 0; i < this.dna.length; i++) {
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
for (let i = 0; i < 5; i++) {
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

//find most related instances of pAequor
let highestPercentage = 0;
let mostRelated = [];

for (let i = 0; i < storage.length; i++) {
  for (let j = i + 1; j < storage.length; j++) {
    let comparedPercentage = storage[i].compareDNA(storage[j]);
    if (comparedPercentage > highestPercentage) {
      highestPercentage = comparedPercentage;
      mostRelated = [storage[i].specimenNum, storage[j].specimenNum];
    }
  }
}

console.log(`The most related instances of pAequor are ${mostRelated[0]} and ${mostRelated[1]} with ${highestPercentage}% DNA in common.`)