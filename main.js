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

//Factory Function
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      const currentBase = this.dna[randomIndex];
      let newBase = returnRandBase();
      while (newBase === currentBase) {
        newBase = returnRandBase();
      };
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDNA(anotherOrganism) {
      let counter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === anotherOrganism.dna[i]) {
          counter++;
        }
      }
      const percent = ((counter / this.dna.length) * 100).toFixed(2);
      console.log(`Specimen ${this.specimenNum} and specimen ${anotherOrganism.specimenNum} have ${percent}% DNA in common.`);
    },
    willLikelySurvive() {
      const count = this.dna.filter(base => base === 'C' || base === 'G').length;
      return (count / this.dna.length) * 100 >= 60;
    }
  };
};

//Create 30 Specimens
const survivors = [];
let id = 1;
while (survivors.length < 30) {
  let newOrg = pAequorFactory(id, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivors.push(newOrg);
    id++
  }
}

/*Test the 30 specimens and makes sure they all survive and make sure they are all labeled with different numbers
survivors.forEach(org => {
  console.log(`Specimen ${org.specimenNum} - Survives: ${org.willLikelySurvive()} `);
});
*/

/*Test the mutate method
const testSubject = pAequorFactory(1, mockUpStrand());
console.log('Before mutation:', testSubject.dna);
testSubject.mutate();
console.log('After mutation:', testSubject.dna);
*/

/*Test the compare DNA method
const organism1 = pAequorFactory(1, mockUpStrand());
const organism2 = pAequorFactory(2, mockUpStrand());
console.log('Organism 1 DNA:', organism1.dna);
console.log('Organism 2 DNA:', organism2.dna);
organism1.compareDNA(organism2);
*/


