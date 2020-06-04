const db = {
  cats: [
    { name: 'Miimi', age: 14, id: 101, servants: [102] },
    { name: 'Dodo', age: 8, id: 103, servants: [] },
  ],
  humans: [{ name: 'Chris', id: 102, cats: [] }],
  createHuman,
  createCat,
  connectServantToCat,
}

function createHuman(name) {
  const newHuman = {
    name,
    cats: [],
    id: db.humans[db.humans.length - 1].id + 1,
  }
  db.humans = [...db.humans, newHuman]
  return newHuman
}

function createCat(name, age) {
  const newCat = {
    name,
    age,
    servants: [],
    id: db.cats[db.cats.length - 1].id + 1,
  }
  db.cats = [...db.cats, newCat]
  return newCat
}

function connectServantToCat(humanId, catId) {
  const catIndex = db.cats.findIndex(({ id }) => id === Number(catId))
  const humanIndex = db.humans.findIndex(({ id }) => id === Number(humanId))
  if (catIndex < 0 || humanIndex < 0) {
    return `Cat (id: ${catId}) or Human (id: ${humanId}) not found.`
  }
  db.cats = db.cats.map((cat, index) =>
    index === catIndex
      ? { ...cat, servants: [...cat.servants, db.humans[humanIndex].id] }
      : cat
  )
  db.humans = db.humans.map((human, index) =>
    index === humanIndex
      ? { ...human, cats: [...human.cats, db.cats[catIndex].id] }
      : human
  )
  return `Human (id: ${humanId}) is now a servant for Cat (id: ${catId}).`
}

module.exports = db
