const fetch = require('node-fetch');
const { DOMParser } = require('xmldom');
const xmlToJSON = require('xmlToJSON');
xmlToJSON.stringToXML = (string) => new DOMParser().parseFromString(string, 'text/xml');

let data = ''; // data var to be passed in

// you can change the defaults by passing the parser an options object of your own
var myOptions = {
  mergeCDATA: false,
  xmlns: false,
  attrsAsObject: false
}

// init the function
function getUser() {
  fetch(`https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=diabetes&retmax=50`)
    .then(res => res.text())          // convert to plain text
    .then(text => 
      console.log(xmlToJSON.parseString(text, myOptions)) // parse XML to JSON
    )
};

// Post Method 
(async () => {
  const rawResponse = await fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({a: 1, b: 'Textual content'})
  });
  const content = await rawResponse.json();

  console.log(content);
})();
  
// call get user data
getUser();

