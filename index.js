var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var huntsman = require('huntsman');
var spider = huntsman.spider();
spider.extensions = [
    huntsman.extension('recurse'),
    huntsman.extension('cheerio')
];
var dataDir = './data/';
if(!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

var allBuses = [];

spider.on(/http:\/\/cairobusroutes\.com\/[0-9]+$/, function(err,res) {
    var bus = {};
    var route = [];
    var $ = res.extension.cheerio;
    $('.fa-map-marker').each(function(i, elem) {
        var paragraph = $(this).parents('p').text().trim();
        paragraph = paragraph.split(',');
        var busStop = {};
        busStop.stop = paragraph[0].trim();
        busStop.neighbourhood = (paragraph.length > 1) ? paragraph[1].trim() : paragraph[0].trim();
        route.push(busStop);
    });
    var busNumber = $('.entry-title').text();
    busNumber = busNumber.match(/[0-9]+/)[0];
    bus.number = busNumber;
    bus.route = route;
    allBuses.push(bus);
    var path = dataDir + bus.number + '.json';
    fs.writeFile(path, JSON.stringify(bus , null, 4), function(err) {
        if(err) throw err;
        console.log(path + ' is created');
    });
}); 
// var exitHandler = new EventEmitter();
spider.on('HUNTSMAN_EXIT', function() {
    var path = dataDir + 'all.json';
    fs.writeFile(path, JSON.stringify(allBuses, null, 4) , function(err) {
        if(err) throw err;
        console.log(path + 'is created');
    });
});
spider.on('/type/all-buses'); 
spider.queue.add('http://cairobusroutes.com/');
spider.start();
