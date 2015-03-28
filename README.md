###cairobusroutes
This is the cairo bus routes data of the [cairobusroutes](http://cairobusroutes.com/) website in json format, also included is the scraper used to get the data from the website.
###Usage
* First clone the repository
```
git clone https://github.com/mahmoudelbadry/cairobusroutes-json
```
* To use the scraper you need [nodejs](https://nodejs.org/) installed and you need to install the dependencies with the command:
```bash
npm install
```
* After that, you start the scraper with:
```
node index.js
```
this will save the [data](https://github.com/mahmoudelbadry/cairobusroutes-json/tree/master/data) directory,
with each route having a json file, and an [all.json](https://github.com/mahmoudelbadry/cairobusroutes-json/tree/master/data/all.json) containing all the bus routes

###Data Format

```javascript
//a single bus route consists of the following:
{
    "number": "117", //Number of the bus
    "route": [ // array of the bus stops, ordered by where the bus goes first (route is bi-deirectional)
        {
            "stop": "Abd al-Monaam Riad Square (Tahrir Bus Station)", //location of the stop
            "neighbourhood": "Downtown" // neighbourhood the bus stop located in
        },
    ]
}
```
Note: sometimes the site doesn't provide the neighbourhood, so I assume the neighbourhood is the same as the stop

###Special Thanks
* [Tristan Thomas](https://tristanthomas.me/) for creating [cairobusroutes](http://cairobusroutes.com/) and making its data under an open license.

###Copyright
All Cairo Bus Routes content, including text, routes and photos, is released under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). for more information visit the [cairobusroutes](http://cairobusroutes.com/) website.

The JSON files outputed by the scraper are also under the same license.

The scraper code is released under the [MIT license](http://opensource.org/licenses/MIT).
