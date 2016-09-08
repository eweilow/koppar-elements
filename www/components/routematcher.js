function parse(sections) {
  var parts = [];
  
  sections.forEach(function(section) {
    if(!section) return;

    var split = section.split("/");
    split.forEach(function(str){
      if(!str) return;

      if(!(/^(?:(?:[\-A-z0-9]+)|(?:(?:\:[A-z][A-z0-9]*)?\:[A-z][A-z0-9]*))$/.test(str))) {
        throw new Error("Invalid URL part: '" + str + "'");
      }
      parts.push(str);
    });
  })

  var start = "";
  if(sections[0].indexOf("/") === 0) {
    start = "/";
  }
  return parts;
}

function notEmpty(str) {
  return !!str;
}

function matches(sections, path, lazy) {
  var splitRoute = path.split("/").filter(notEmpty);

  var parameters = {

  };

  var matches = false;
  if(sections.length === splitRoute.length || lazy) {
    matches = sections.every(function(section, index) {
      var exec = /^\:([A-z][A-z0-9]*)(?:\:([A-z][A-z0-9]*))?$/.exec(section);

      var routeSection = splitRoute[index];
      if(exec === null) { //No parameter
        if(section === routeSection) return true;
      } else {
        var name = exec[1];
        var type = exec[2];
        
        switch(type) {
          case "int":
            var parse = parseInt(routeSection);
            if(!isNaN(parse)) {
              parameters[name] = parse;
              return true;
            }
            break;
        }
        parameters[name] = routeSection;
        return true;
      }
      return false;
    });
  }

  return {
    route: sections.join("/"),
    path: path,
    matches: matches,
    parameters: parameters
  }
}

window.routing = {};
window.routing.parse = parse;
window.routing.matches = matches;