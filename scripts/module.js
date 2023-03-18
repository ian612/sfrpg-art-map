Hooks.once('init', async function() {
    console.log('SF Art Map | Initializing Starfinder Compendium Art Mapper');
});

Hooks.once('ready', async function() {

});

Hooks.on("renderActorDirectory", async function() {
    console.log('SF Art Map | Actor directory was just rendered.')
    
});