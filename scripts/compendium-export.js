export async function createJSON() {

  console.log('Beginning to read actor data from compendiums.');

  // Definition of Variables
  const folderName = 'modules-data/SFRPGArtMap';
  const artMapFileName = 'sfrpg-art-map-file';
  const gamePacks = game.packs;
  const actorPacks = [];
  const data = {};

  // Rename complex locations
  const filePicker = foundry.applications.apps.FilePicker.implementation;

  // Create directory if it doesn't exist
  try{
    await filePicker.createDirectory('data', folderName);
  } catch (err) {
    if (err){
      console.error(err);
      console.log('Directory already exists, skipping that step.');
    }
  }

  // Get a backup of the old art map
  let oldData = {};
  let oldDataLoaded = false;
  try {
    oldData = await fetch(`../../../${folderName}/${artMapFileName}.json`).then((res) => res.json());
    oldDataLoaded = true;
  } catch (err) {
    console.error(err);
  }

  // If file already exists, make a backup
  if (oldDataLoaded) {
    ui.notifications.info(game.i18n.localize("artMap.backupNotify"));
    const oldFile = new File([JSON.stringify(oldData, null, 4)], `${artMapFileName}-old.json`);
    await filePicker.upload('data', `${folderName}/`, oldFile, {}, {notify:false});
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
  for (const pack of actorPacks) {
    const compendium = `sfrpg.${pack.metadata.name}`;
    data[compendium] = {};
    console.log(`Reading pack ${compendium}`);

    // Loop through each actor in the pack, collect the data
    for (const actor of pack.index) {
      const id = actor._id;
      const doc = await pack.getDocument(id);

      data[compendium][id] = {
        actor: actor.img,
        name: actor.name,
        source: doc.system.details.source,
        token: {
          texture: {
            src: doc.prototypeToken.texture.src
          }
        }
      };

    }
  }

  console.log('All actor data found is listed here.');
  console.log(data);

  // Write the data out to a file
  const newFile = new File([JSON.stringify(data, null, 4)], `${artMapFileName}.json`);
  await filePicker.upload('data', `${folderName}/`, newFile, {}, {notify:false});

  // Inform the user that we're done
  ui.notifications.info(game.i18n.localize("SFRPGArtMap.done"));
  console.log('Finished reading actor image data.');
  return data;
}