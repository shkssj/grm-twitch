# grm-twitch
Twitch live integration for Fivem

# How to install
- Download the script and drop in the resources folder
- Install the packages executing install.bat or using 'npm i' in the console
- Open your server.cfg and add this: ensure grm-twitch
- Go to: https://dev.twitch.tv/console/apps
- Create a new application
- Insert a name, set the category: Game Integration and set url oauth to: http://localhost
- Copy the client id and generate a new secret, then copy it
- Open the script and go to "server/twitch.js"
- Paste your application client id & client secret into the variables

# How to import 
Use the export (checkLive) and use te guide of how to use it

# Functions
```lua
    -- Mini lua example

    -- If you don't want to filter the title with a word
    local response = exports['grm-twitch']:checkLive('TWITCH_USERNAME')

    if response == 'live' then
        print('The streamer is in live')
    elseif response == 'notlive' then
        print('The streamer is not in live')
    end

    ----------------------------------------------------------

    -- If you want to filter the title with a word
    local response = exports['grm-twitch']:checkLive('TWITCH_USERNAME', 'word')

    if response == 'live' then
        print('The streamer is in live')
    elseif response == 'live_not_title' then
        print('The streamer is in live but the title don\'t include the word you provided')
    elseif response == 'notlive' then
        print('The streamer is not in live')
    end
```
