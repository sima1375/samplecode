/*
function change option select 
*/ 
var select=document.getElementsByClassName('form-select'); 
var url = location.href; 
var name_Select = [];
  for (i = 0; i < select.length; i++) {
    select[i].addEventListener("change", function(){
     var name = this.name;
      var value = this.value;
      var query_url = String(url).split('?');   
      if(query_url[1]){
        var part1_query_url = query_url[1].split('&');
        for (i = 1; i < part1_query_url.length ; i++) {
                var data = part1_query_url[i].split('=');   
                if(url.includes(name)){
                    if(data[0] == name){                    
                        location.href  = updateUrl(url,name,value);
                    }   
                }
                else{
                    location.search += '&' + name + '=' +  value ;
                }
            }

        }
        else{
            location.search += '&' + name + '=' +  value ;
        }
      localStorage.setItem(name, JSON.stringify(value));
    });

    /*
    show change option select
    */ 

    var element = JSON.parse(localStorage.getItem(select[i].name));
    select[i].options[element].selected = true;
    name_Select += select[i].name + ' ';
    var firstch = select[i].options[0].value;
    console.log(firstch);
    if(select[i].value != firstch) {
      var tag = document.createElement("div");
      tag.innerText = (select[i].name + ' ' + select[i].value);
      //tag.classList.add('del_show_select');
      var element = document.getElementById("show_info_select");
      element.appendChild(tag);
    }

}
/*
delete show option select
*/ 
var child_show = document.getElementById("show_info_select").childNodes;
for (var i = 0; i < child_show.length; i++) {
    child_show[i].addEventListener("click", function(){
      document.getElementById("show_info_select").removeChild(this);
      var text_child_show = this.textContent.split(" ");
      var name_split = name_Select.split(" ");
      for (var j = 0; j < name_split.length; j++){
        if(name_split[j] == text_child_show[0]){
          console.log(name_split[j]);
          localStorage.setItem( text_child_show[0], JSON.stringify(0));
          select[j].firstChild.selected = true;
          location.href  = removeURLParameter(url,text_child_show[0]); 
      }
    }
    });
  }

/* 
function updateUrl() 
input: url,key,value
output: update url
*/
function updateUrl(url,key,value){
    if(value!==undefined){
      value = encodeURI(value);
    }
    var hashIndex = url.indexOf("#")|0;
    if (hashIndex === -1) hashIndex = url.length|0;
    var urls = url.substring(0, hashIndex).split('?');
    var baseUrl = urls[0];
    var parameters = '';
    var outPara = {};
    if(urls.length>1){
        parameters = urls[1];
    }
    if(parameters!==''){
      parameters = parameters.split('&');
      for(k in parameters){
        var keyVal = parameters[k];
        keyVal = keyVal.split('=');
        var ekey = keyVal[0];
        var evalue = '';
        if(keyVal.length>1){
            evalue = keyVal[1];
        }
        outPara[ekey] = evalue;
      }
    }

    if(value!==undefined){
      outPara[key] = value;
    }else{
      delete outPara[key];
    }
    parameters = [];
    for(var k in outPara){
      parameters.push(k + '=' + outPara[k]);
    }

    var finalUrl = baseUrl;

    if(parameters.length>0){
      finalUrl += '?' + parameters.join('&'); 
    }

    return finalUrl + url.substring(hashIndex); 
}


/* 
function removeURLParameter() 
input: url,key
output: update url
*/
function removeURLParameter(url, parameter) {
  var urlparts = url.split('?');
  var urlpartsplit;
  if(urlparts[1].charAt(0)=="="){
    urlpartsplit = urlparts[1].replace("=",'');
  }
  else{
    urlpartsplit = urlparts[1];
  }
    if (urlparts.length >= 2) {

      var prefix = encodeURIComponent(parameter) + '=';
      var pars = urlpartsplit.split(/[&;]/g);
 
      //reverse iteration as may be destructive
      for (var i = pars.length; i-- > 0;) {
         //idiom for string.startsWith
         if (pars[i].lastIndexOf(prefix, 0) !== -1) {
            pars.splice(i, 1);
         }
      }
 
      return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
   
  }

  return url;
}