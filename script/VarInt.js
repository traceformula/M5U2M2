VarInt = {};
VarInt.bin = function (a){
  a = a>>>0;
  var s = (a>>>0).toString(2);
  if(s.length < 7){
    var l = 7 - s.length;
    for(var i=0; i<l; i++) s = "0" + s;
  }
  return s;
}

VarInt.toBin = function (a){
  a = (a>>>0);
  var s = " 1" + this.bin((a & 127));
  a = a>>>7;
  while(a>0){
     var b = a & 127;
     a = a>>>7;
     s = " 0" + this.bin(b) + s;
  }
  return s;
}

VarInt.toarray = function(s){
	var ar = s.trim().split(" ");
	var result = new Array();
	for(var i=0; i<ar.length/2; i++){
		result[i] = new Array();
		result[i][0] = parseInt(ar[i*2]);
		result[i][1] = parseInt(ar[i*2+1]);
	}
	return result;
}

VarInt.encode = function (ar){
  if(typeof(ar) === 'string') ar = this.toarray(ar);	
  var cur = 0;
  var s = "";
  for(var i=0; i<ar.length; i++){
    var x = ar[i][0] -cur;
    cur = ar[i][0];
    var y = ar[i][1];
    s += this.toBin(x) + this.toBin(y);
  }
  return s;
}


VarInt.decode = function (s){
  var result = "";
  s = s.split(" ").join("");
  var l = s.length/8;
  var cur = 0;
  var count = 0;
  var prv = 0;
  for(var i=0; i<l; i++){
    var ss = s.substring(0,8);
    
    s = s.substring(8,s.length);
    cur = (cur * 128) + (127& parseInt(ss,2));    
    if(ss[0] === "1") {
        count = (count+1) & 1;
        if(count == 1) {
           prv += cur;
           result += prv + " ";          
        }else {
           result += cur + " ";
        }
	cur = 0;        
    }    
    
  }
  return result;
}

var s = VarInt.encode("92 9 102 8 112 7 150 12 2000 128 5284 127");
console.log(s);
console.log(VarInt.toarray(VarInt.decode(s)));