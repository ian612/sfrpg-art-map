<!--- Downloads @ Latest Badge -->
<!--- ![Latest Release Download Count](https://img.shields.io/github/downloads/ian612/sfrpg-art-map/latest/module.zip) -->

<!--- Forge Bazaar Install % Badge -->
<!--- ![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fsfrpg-art-map&colorB=4aa94a) -->

# Starfinder Compendium Art Mapper ![](https://img.shields.io/badge/Foundry-v10-informational)

This module allows you to generate a compendium art map json file automatically from the compendiums of actors included in the Starfinder system, using the process detailed in [this wiki entry](https://github.com/foundryvtt-starfinder/foundryvtt-starfinder/wiki/Compendium-Image-Mapping). Once enabled, it performs two functions (you may need to reload your world after enabling):


1. The module includes the appropriate flag in its module.json file to tell the system where the mapping json file is (as described in [Step 1](https://github.com/foundryvtt-starfinder/foundryvtt-starfinder/wiki/Compendium-Image-Mapping#step-1-creating-a-module-and-modulejson)).

2. It adds this button to the compendium tab for GMs. Clicking it will spool through all the actors in the system compendium, compiling a json file as specified by the sfrpg system's compendium image mapping function (as described in [Step 2](https://github.com/foundryvtt-starfinder/foundryvtt-starfinder/wiki/Compendium-Image-Mapping#step-2-creating-a-mapping)). Any actors that already have art/token art will have the path to those assets added to the json file. Any actors without them will show the default art/token art.

![image](https://user-images.githubusercontent.com/34078802/227305566-b5810b84-5a03-4677-bb12-da92cd924ca5.png)



## Changelog

v0.1.0 - Initial release
v0.2.0 - Added some user-friendliness functionality (dialog confirmation & UI notification), localization, and a function to back the art map up each time a new one is generated
