

let Parser = require('rss-parser');
let parser = new Parser();
const fs = require('fs');
const { convertArrayToCSV } = require('convert-array-to-csv');



(async () => {
  let feed = await parser.parseURL('https://www.lepoint.fr/politique/rss.xml');

  var id = 0
  var csvarray = []

  feed.items.forEach((item) => {
    const List = []
    List.push(id++,item.pubDate,item.link,item.enclosure.url,item.enclosure.length)

    desc = item.content
    var trimmedString = desc.substr(0, 64);

    if (desc.charAt(64) === " ") {
      List.push(trimmedString)
    } else {
      trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
      List.push(trimmedString+"...")
    }
    csvarray.push(List)
  });




 
const csvFromArrayOfArrays = convertArrayToCSV(csvarray, {
  separator: ','
});
fs.writeFile('test.csv', csvFromArrayOfArrays, err => {
  if (err) {
    console.error(err);
  }

});
})();