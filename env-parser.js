function envparser(t) {
  var r = {};
  //t expected to be string
  //we parse the format:
  //<VARNAME>=<VALUE> and output object
  //each entry is seperated by \n.
  var Entries = t.split("\n");
  var i;
  for(i = 0; i < Entries.length; i++) {
    //some magic lmao
    var Name = Entries[i].slice(0, Entries[i].indexOf("="));
    //console.log(`NAME=${Name}`);
    var Value = Entries[i].slice(Entries[i].indexOf("=")+1, Entries[i].length);
    //console.log(`VALUE=${Value}`);
    //Now set r.
    r[Name] = Value;
  }
  return r;
}
