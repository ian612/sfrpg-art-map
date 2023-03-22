// Functions
async function openFile(fileName, data) {
  try {
    const file = await fs(fileName, 'w');
    await file.write(data);
    console.log(`Opened file ${fileName}`);
  } catch (error) {
    console.error(`Got an error trying to open the file: ${error.message}`);
  }
}

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
  let csvFinal = ''


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
        csvFinal = csvFinal.concat(line, '\n')
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
  console.log(csvFinal)
  console.log('Finished reading actor image data.')
  return(csvFinal)
}

export function createJSON(csvData) {
  console.log("I'm a json. jk.")
}