// Imports

// Functions
export async function createCSV() {
  
  console.log('Beginning to read actor data from compendiums.')

  // Definition of Variables
  const gamePacks = game.packs
  let actorPacks = []
  let compendium = ''
  let idCompendium = ''
  let name = ''
  let id = ''
  let img = ''
  let imgToken = ''
  let doc = ''
  let source = ''

  // Outputs
  let line = ''
  let ct = 0
  let csv = []
  let csvData = ''


  // Get the compendiums with actors
  for (let pack of gamePacks) {
    if (pack.metadata.packageType == 'system' && pack.metadata.type == 'Actor') {
      actorPacks.push(pack)
    }
  }


  // Generate .csv lines for each actor
  for (let pack of actorPacks) {
    ct = 0
    compendium = pack.metadata.name
    idCompendium = pack.metadata.id
    // Loop through each actor in the pack, collect the data
    for (let actor of pack.index) {
      try {
        name = actor.name
        id = actor._id
        img = actor.img
        doc = await pack.getDocument(actor._id)
        imgToken = doc.prototypeToken.texture.src
        source = doc.system.details.source
        // Create the csv line
        line = ''.concat(ct.toString(), ' - ', compendium, ' - ', source, ' - ', name, ', ', idCompendium, ', ', id, ', ', img, ', ', imgToken, ', , ')
        // Append the line to the csv output
        csvData = csvData.concat(line, '\n')
      } catch (error) {
        console.log('Oh No! An error occured with a naughty entry. Details to follow, captain.')
        console.log(pack)
        console.log(name)
        console.log(ct)
      }
      ct = ct+1
    }
  }


  // Write the data out to a file
  console.log(csvData)
  console.log('Finished reading actor image data.')
  return(csvData)
}

export function createJSON(csvData) {
  // Part of this script was written by stwlam for processing csv to json token images for the Pathfinder 2e system
  // Available at https://github.com/stwlam/module-art-tools
  
  console.log("I'm a json. jk.")

  // Might need to be removed
  const parser = parse;
  
  const jsonData = parser
    .parse(csvData)
    .slice(1)
    .map((row) => ({
        pack: row[1],
        id: row[2],
        actor: row[3],
        token:
            row[5].trim() || row[6]
                ? { img: row[4], scale: Number(row[5]) || undefined, randomImg: !!row[6] || undefined }
                : row[4],
        randomImg: !!row[6],
    }))
    .reduce((accum, row) => {
        accum[row.pack] ??= {};
        accum[row.pack][row.id] = { actor: row.actor, token: row.token };
        return accum;
    }, {});
  
    console.log(jsonData)
    return(jsonData);
}
