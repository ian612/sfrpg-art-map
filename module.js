import{ createCSV } from './scripts/compendium-export.js'

Hooks.once('init', async function() {
    console.log('SF Art Map | Initializing Starfinder Compendium Art Mapper')
})

Hooks.once('ready', async function() {

})

Hooks.on('changeSidebarTab', async (app, html) => {
    if (app.options.id == 'compendium') {
        SfrpgArtMapConfig.loadButton()
    }
})

class SfrpgArtMap {
    static ID = 'sfrpg-art-map'
    static TEMPLATE = `modules/${this.ID}/templates/browz.hbs`
    static log(force, ...args) {  
        const shouldLog = force || game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.ID)

        if (shouldLog) {
            console.log(this.ID, '|', ...args)
        }
    }
}

class SfrpgArtMapConfig {
    static loadButton() {
        // Do nothing if the game user isn't a GM
        if (!game.user.isGM) {
            return
        }

        // Do nothing if the button already exists
        let artButton = document.getElementById('art-button')
        if (artButton != null) {
            return
        }
        
        // Instantiate the button
        artButton = this.createButton()

        // Do something when the button is clicked
        $(artButton).click((event) => { 
            //new SfrpgArtMapForm().render(true) // Not implemented yet
            csvFinal = createCSV()
        })

        // Define the position of the button
        const compendiumPanel = document.getElementById('compendium')
        const compendiumHeader = compendiumPanel.getElementsByClassName('directory-header')[0]
        const createEntityButton = compendiumHeader.getElementsByClassName('create-entity')[0]
        compendiumHeader.insertBefore(artButton, createEntityButton)
        }

        // Function to create the button
        static createButton() {
            let button = document.createElement('button')
            button.innerHTML = `<i id='art-button' class='fas fa-palette'></i>Map Compendium Artwork`
            button.classList.add('control-icon')

            return button
        }
}