class Character {
  constructor({ name, coord, url }) {
    this.name = name;
    this.coord = coord;
    this.url = url;
    this.found = false; 
  }
}

const pinkMummy = new Character({
  name: 'Pink Mummy',
  coord: {
    x: 38,
    y: 877
  },
  url: '/images/pinkmummy.png'
});

const rocker = new Character({
  name: 'Rocker',
  coord: {
    x: 532,
    y: 1464
  },
  url: '/images/rocker.png'
});

const reindeer = new Character({
  name: 'Reindeer Man',
  coord: {
    x: 780,
    y: 965
  },
  url: '/images/reindeer.png'
});

const initialCharacters = [pinkMummy, rocker, reindeer];

export { initialCharacters };