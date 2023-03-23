export async function createJSON() {
  
  console.log('Beginning to read actor data from compendiums.')

  // Definition of Variables
  const gamePacks = game.packs
  let actorPacks = []
  let data = {}
  let compendium = ''
  let idCompendium = ''
  let name = ''
  let id = ''
  let img = ''
  let imgToken = ''
  let imgTokenScale = 0
  let doc = ''
  let source = ''
  let ct = 0


  // Get the compendiums with actors
  for (let pack of gamePacks) {
    if (pack.metadata.packageType == 'system' && pack.metadata.type == 'Actor') {
      actorPacks.push(pack)
    }
    // Add non-system packs. For testing only
    /*if (pack.metadata.packageType != 'system' && pack.metadata.type == 'Actor') {
      actorPacks.push(pack)
    }*/
  }


  // Generate .csv lines for each actor
  for (let pack of actorPacks) {
    ct = 0
    compendium = pack.metadata.name
    idCompendium = pack.metadata.id
    data[compendium] = {}

    // Loop through each actor in the pack, collect the data
    for (let actor of pack.index) {
      doc = await pack.getDocument(actor._id)

      id = actor._id
      data[compendium][id] = {}
      
      name = actor.name
      data[compendium][id].entryNum = ct.toString()
      data[compendium][id].name = name

      img = actor.img
      data[compendium][id].actor = img

      imgToken = doc.prototypeToken.texture.src
      data[compendium][id].token = {}
      data[compendium][id].token.img = imgToken
      data[compendium][id].token.scale = 1

      source = doc.system.details.source
      data[compendium][id].source = source
      
      ct = ct+1
    }
  }

  console.log(data)
  
  // Create directory if it doesn't exist
  try{
    await FilePicker.createDirectory('data', 'sfrpgArtMap')
  } catch (err) {
    if (!err.startsWith("EEXIST")){
      console.log('Directory already exists, skipping that step.')
    }
  }

  // Write the data out to a file
  const newFile = new File([JSON.stringify(data, null, 4)], 'art-mapping.json');
  await FilePicker.upload('data', 'sfrpgArtMap/', newFile, {}, {notify:false});
  console.log('Finished reading actor image data.')
  return(data)
}