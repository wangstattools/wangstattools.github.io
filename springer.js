
function round(value, decimals) {
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// this function is to deal with floating point issue (i.e. 12.000001 instead of 12.00)
function strip(number) {
	if (number >= 100)
    	return (parseFloat(number).toPrecision(5));
    else if (number <= 100 && number >= 10)
    	return (parseFloat(number).toPrecision(4));
    else if (number <= 10 && number >= 1)
    	return (parseFloat(number).toPrecision(3));
    else 
    	return (parseFloat(number).toPrecision(2));
}
// function to update the total of row
function updateTotal(row) {
	var name = 'a' + row;
	// get the correct ID for the total to place total
	var totID = 'T' + row;
	var arr = document.getElementsByName(name);
	var tot = 0;
	for(var i = 0; i < arr.length; i++) {
		if(parseInt(arr[i].value))
			tot += parseInt(arr[i].value);
	}
	document.getElementById(totID).value = tot;
	// update the total of the totals column
	var t1 = parseInt(document.getElementById('T1').value);
	if (isNaN(t1))
		t1 = 0;
	var t2 = parseInt(document.getElementById('T2').value);
	if (isNaN(t2))
		t2 = 0;
	document.getElementById('TT').value = t1 + t2;
}

// function to update the total of column
function updateTotalc(column, length) {
	var sum = 0;
	for (var i = 1; i <= length; i++) {
		var a = parseInt(document.getElementById(column + i).value);
		if (isNaN(a))
			a = 0;
		sum += a;
	}
	var id = length + 1;
	var sumID = column + id;
	document.getElementById(sumID).value = sum;
}

function calculate() {
	var a = parseInt(document.getElementById('A1').value);
	var b = parseInt(document.getElementById('B1').value);
	var c = parseInt(document.getElementById('A2').value);
	var d = parseInt(document.getElementById('B2').value);
	var n = parseInt(document.getElementById('TT').value);
	var f1 = parseInt(document.getElementById('T1').value);
	var f2 = parseInt(document.getElementById('T2').value);
	var g1 = parseInt(document.getElementById('A3').value);
	var g2 = parseInt(document.getElementById('B3').value);
	// P Not
	var PNot = (a+d)/n;
	if (isNaN(PNot))
		document.getElementById('answerPNot').innerHTML = 'Invalid';
	else
		document.getElementById('answerPNot').innerHTML = round(PNot,4);
	// P C
	var PC = (f1*g1/n + f2*g2/n)/n;
	if (isNaN(PC))
		document.getElementById('answerPC').innerHTML = 'Invalid';
	else
		document.getElementById('answerPC').innerHTML = round(PC,4);
	// K hat
	var k = (PNot-PC)/(1-PC);
	if (isNaN(k))
		document.getElementById('answerK').innerHTML = 'Invalid';
	else
		document.getElementById('answerK').innerHTML = round(k,4);
	// variance of K hat
	var variance = 1/((1-PC)*(1-PC))*(PNot)*(1-PNot)/n;
	if (isNaN(variance))
		document.getElementById('answerVar').innerHTML = 'Invalid';
	else
		document.getElementById('answerVar').innerHTML = round(variance,12);
	var lowerCI = round(k - 1.96*Math.sqrt(variance),4);
	var higherCI = round(k + 1.96*Math.sqrt(variance),4);
	if (isNaN(lowerCI) || isNaN(higherCI))
		document.getElementById('answerCI').innerHTML = 'Invalid';
	else
		document.getElementById('answerCI').innerHTML = '['+lowerCI+', '+higherCI+']';
}	




