require('es6-promise').polyfill();
require('isomorphic-fetch');
var cheerio = require('cheerio');

fetch('https://github.com/trending')
.then(function(response) {
    if (response.status >= 400) {
        throw new Error("Bad response from server");
    }
    return response.text();
})
.then(function(htmlTxt) {
    var $ = cheerio.load(htmlTxt);
    var metas = [];
    var repos=$('.repo-list-item');
    var len = repos.length;
    repos.each(function(i,repo){
      var prefix = $(this).find('.repo-list-name').text().split("\n").join("").replace(/ /gi,"");
      var description =$(this).find('.repo-list-description').text();
      var meta =$(this).find('.repo-list-meta').text().split("\n").join("").replace(/ /gi,"");
      metas.push({
        prefix : prefix,
        description :description,
        meta : meta
      });
      if(i=len){
        console.log(metas);
      }
    }).then(function(){
      console.log(metas);
    });
    console.log(metas);
});
