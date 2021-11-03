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
      //option A:
      //switch, case
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
      //option B:
      //iterate through list, delete, then random from remaining 
      //return mutated dna
      return this.dna;
    }
  }
  specimenCounter++;
  return specimen
}






