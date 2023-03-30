<!--- Downloads @ Latest Badge -->
<!--- ![Latest Release Download Count](https://img.shields.io/github/downloads/ian612/sfrpg-art-map/latest/module.zip) -->

<!--- Forge Bazaar Install % Badge -->
<!--- ![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fsfrpg-art-map&colorB=4aa94a) -->

# Starfinder Compendium Art Mapper ![](https://img.shields.io/badge/Foundry-v10-informational)

This module allows you to generate a compendium art map json file automatically from the compendiums of actors included in the Starfinder system, using the process detailed in [this wiki entry](https://github.com/foundryvtt-starfinder/foundryvtt-starfinder/wiki/Compendium-Image-Mapping). Once enabled, it performs two functions (you may need to reload your world after enabling):

1. The module includes the appropriate flag in its module.json file to tell the system where the mapping json file is (as described in [Step 1](https://github.com/foundryvtt-starfinder/foundryvtt-starfinder/wiki/Compendium-Image-Mapping#step-1-creating-a-module-and-modulejson)).

2. It adds this button to the compendium tab for GMs. Clicking it will spool through all the actors in the system compendium, compiling a json file as specified by the sfrpg system's compendium image mapping function (as described in [Step 2](https://github.com/foundryvtt-starfinder/foundryvtt-starfinder/wiki/Compendium-Image-Mapping#step-2-creating-a-mapping)). Any actors that already have art/token art will have the path to those assets added to the json file. Any actors without them will show the default art/token art.

![image](https://user-images.githubusercontent.com/34078802/227305566-b5810b84-5a03-4677-bb12-da92cd924ca5.png)


## Using this module with Compendium Image Mapper

I recommend using the [Compenium Image Mapper](https://foundryvtt.com/packages/imagemapper) to automatically map your compendium art files ([GitLab Link](https://gitlab.com/Wilco7302/compendium-image-mapper)). Because this module uses the system's built-in art mapping functionality, it is not overwritten when the system updates. Because Compendium Image Mapper uses a different method of assigning the images to actors, though, some extra steps need to be taken to get everything to work correctly together.

1. Ensure that both modules are enabled and that your world is running.
2. Find the module's installation directory. This should be your user data directory/modules/sfrpg-art-map.
3. Open the module.json file and remove the highlighted lines of code in the image below (make a copy of this as we'll need to add them back in later).

![image](https://user-images.githubusercontent.com/34078802/228699774-a09c8adb-3882-409b-9262-f878cfac4e6e.png)

4. Refresh the program to reload it.
5. Use the Compendium Image Mapper to map the compendium's art you want (A), then when finished generate the Compendium Art Map (B).

![image](https://user-images.githubusercontent.com/34078802/228703466-9b54ad30-739d-496b-bbfb-df55129e3f34.png)

6. Re-open the module.json file (from step 3), and add back the previously deleted code.

That should be it! If you need to update the images, you can follow this process again, or just manually update the filepaths in the file specified by the "sfrpg-art" flag (the code removed in step 3 above).


## Changelog

v0.1.0 - Initial release

v0.2.0 - Added some user-friendliness functionality (dialog confirmation & UI notification), localization, and a function to back the art map up each time a new one is generated
