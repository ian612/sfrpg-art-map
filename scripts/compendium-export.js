export async function createJSON() {

  console.log('Beginning to read actor data from compendiums.');

  // Definition of Variables
  const gamePacks = game.packs;
  const actorPacks = [];
  const data = {};

  // Create directory if it doesn't exist
  try{
    await FilePicker.createDirectory('data', 'sfrpgArtMap');
  } catch (err) {
    if (!err.startsWith("EEXIST")){
      console.log('Directory already exists, skipping that step.');
    }
  }

  // Get a backup of the old art map
  let oldData = {};
  let oldDataLoaded = false;
  try {
    oldData = await fetch('../../../sfrpgArtMap/art-mapping.json').then((res) => res.json());
    oldDataLoaded = true
  } catch (err) {
    console.error(err);
  }

  // If an old file exists, make a backup
  if (oldDataLoaded) {
    ui.notifications.info(game.i18n.localize("artMap.backupNotify"));
    const oldFile = new File([JSON.stringify(oldData, null, 4)], 'art-mapping-old.json');
    await FilePicker.upload('data', 'sfrpgArtMap/', oldFile, {}, {notify:false});
  }

  // Get the compendiums with actors
  for (let pack of gamePacks) {
    if (pack.metadata.packageType == 'system' && pack.metadata.type == 'Actor') {
      actorPacks.push(pack);
    }
    // Add non-system packs. For testing only
    /*if (pack.metadata.packageType != 'system' && pack.metadata.type == 'Actor') {
      actorPacks.push(pack)
    }*/
  }


  // Generate required data for each actor
  for (let pack of actorPacks) {
    const compendium = pack.metadata.name;
    const idCompendium = pack.metadata.id;
    data[compendium] = {};

    // Loop through each actor in the pack, collect the data
    for (let actor of pack.index) {
      const doc = await pack.getDocument(actor._id);

      const id = actor._id;
      data[compendium][id] = {};

      const name = actor.name;
      data[compendium][id].name = name;

      const img = actor.img;
      data[compendium][id].actor = img;

      const imgToken = doc.prototypeToken.texture.src;
      const imgTokenScale = doc.prototypeToken.texture.scaleX;
      data[compendium][id].token = {};
      data[compendium][id].token.img = imgToken;
      data[compendium][id].token.scale = imgTokenScale;

      const source = doc.system.details.source;
      data[compendium][id].source = source;
    }
  }

  console.log('All actor data found is listed here.');
  console.log(data);

  // Write the data out to a file
  const newFile = new File([JSON.stringify(data, null, 4)], 'art-mapping.json');
  await FilePicker.upload('data', 'sfrpgArtMap/', newFile, {}, {notify:false});

  // Inform the user that we're done
  ui.notifications.info(game.i18n.localize("artMap.done"));
  console.log('Finished reading actor image data.');
  return data;
}