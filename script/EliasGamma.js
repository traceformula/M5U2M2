EliasGamma = { };
EliasGamma.log = function (x){
		x = x>>>0;
		var result = 0;
		x = x>>>1;
		while(x>0){
			result++;
			x = x>>>1;
		}
		return result;
	}

EliasGamma.pad = function pad(x, length, c){
		if(!c) c = "0";
		while(x.length < length) x = c + x;
		return x;
	}
EliasGamma.encodeNumber =	function encodeNumber(x){
		x = x>>>0;
		var n = this.log(x);
		x = x - (1<<n);
		return this.pad("", n, "1") + "0" + this.pad((n==0)?"":(x).toString(2), n); 
	}
EliasGamma.encode =	function encode(s){
		var ss = s.split(" ");
		var result ="";
		for(var i=0; i<ss.length; i++){
			result += this.encodeNumber(ss[i]);
		}
		return result;
	}
EliasGamma.decode =	function decode(s){
		if(!s) return "";
		for(var i=0; i<s.length; i++){
			if(s[i] == "0"){
				var ss = s.substring(i+1, 2*i+1);
				return (parseInt(ss, 2) + (1<<i)) + " " + this.decode(s.substring(2*i+1)); 
			}
		}
	}

function convert(s){
	return s.split("(").join("[").split(")").join("]");
}	
function remove(s){
	var r = "";
	var space = false;
	for(var i=0; i<s.length; i++){
		if(s[i] == " " || s[i] == "\t") {
			if(!space) r+= s[i];
			space = true;
			continue;
		}else space = false;
		if(s[i]>='0' && s[i]<='9') r += s[i];
	}
	return r;
}
var s = EliasGamma.encode("92 9 102 8 112 7 150 12 2000 128 5284 127");
//var s = EliasGamma.encode("10 20 300 400 300");
//var s = EliasGamma.encode(remove("[(92, 9), (102, 8), (112, 7), (150, 12), (2000, 128), (5284, 127)]"));
console.log(s);
console.log(EliasGamma.decode(s));

