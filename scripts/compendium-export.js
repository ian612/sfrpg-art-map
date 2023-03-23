import { parse } from './csv-parse.js'

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
  line = ''.concat('num - compendium - source - name, idCompendium, id, img, imgToken')
  csvData = csvData.concat(line, '\n')
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
        line = ''.concat(ct.toString(), ' - ', compendium, ' - ', source, ' - ', name, ', ', idCompendium, ', ', id, ', ', img, ', ', imgToken)
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
  //console.log(csvData)
  console.log('Finished reading actor image data.')
  return(csvData)
}

//var csv is the CSV file with headers
export function csvJSON(csv){
  
  var lines=csv.split("\n");

  var result = [];

  // NOTE: If your columns contain commas in their values, you'll need
  // to deal with those before doing the next step 
  // (you might convert them to &&& or something, then covert them back later)
  // jsfiddle showing the issue https://jsfiddle.net/
  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }

  //return result; //JavaScript object
  console.log(result)
  return JSON.stringify(result); //JSON
}

export function createJSON(csvData) {
  // Part of this script was written by stwlam for processing csv to json token images for the Pathfinder 2e system
  // Available at https://github.com/stwlam/module-art-tools
  
  console.log("I'm a json. jk.")
  
  

  // Might need to be removed
  const parse1 = parse()
  //console.log(parse1)

  /*let utf8Encode = new TextEncoder();
  utf8Encode.encode(csvData);
  const jsonD = parse({
    parser: utf8Encode,
    slice: 1
  })
  console.log(jsonD)*/

  const jsonData = parse1
    .parser(csvData)
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
