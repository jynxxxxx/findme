class Character {
  constructor({ name, coord, url, bwurl }) {
    this.name = name;
    this.coord = coord;
    this.url = url;
    this.bwurl = bwurl;
    this.found = false; 
  }
}

const pinkMummy = new Character({
  name: 'Pink Mummy',
  coord: {
    x: 12,
    y: 855
  },
  url: '/images/pinkmummy.png',
  bwurl:'/images/pinkmummybw.png',
});

const rocker = new Character({
  name: 'Rocker',
  coord: {
    x: 506,
    y: 1443
  },
  url: '/images/rocker.png',
  bwurl: '/images/rockerbw.png',
});

const reindeer = new Character({
  name: 'Reindeer Man',
  coord: {
    x: 754,
    y: 940
  },
  url: '/images/reindeer.png',
  bwurl: '/images/reindeerbw.png',
});

const initialCharacters = [pinkMummy, rocker, reindeer];

export { initialCharacters };