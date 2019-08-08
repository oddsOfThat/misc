
function gcd(a,b){
	while(a!=b){
		if(a>b) a=a-b;
		else b=b-a;
	}
	if(a>1)	return a		
	else return null
}

function cool(){
let out = [1,1];

for(let i=2;i<1000;i++){
	if(gcd(i,out[i-1])){
		out.push(out[i-1]/gcd(i,out[i-1]));
	}
	else{
		out.push(out[i-1]+i+1);
	}
}
return out
}
function lab(){
let lab = [0,1];

for(let i=2;i<1000;i++){
	lab.push(i);
}
return lab
}


