
function round(value, decimals) {
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
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
// function to update the total child count (numerator)
function updateCountTotal(exampleNumber) {
	// get the correct name to identify (i.e. childCount_31)
	var name = 'childCount' + exampleNumber;
	// ge the correct ID for the total to place total
	var totID = 'countTot' + exampleNumber;
	var arr = document.getElementsByName(name);
	var tot = 0;
	for(var i = 0; i < arr.length; i++) {
		if(parseInt(arr[i].value))
			tot += parseInt(arr[i].value);
	}
	document.getElementById(totID).value = tot;

}

// function to udpate total child enrollment (denominator)
function updateEnrollmentTotal(exampleNumber) {
	// get the correct name to identify (i.e. childCount_31)
	var name = 'childEnrollment' + exampleNumber;
	// ge the correct ID for the total to place total
	var totID = 'enrollmentTot' + exampleNumber;
	var arr = document.getElementsByName(name);
	var tot = 0;
	for(var i = 0; i < arr.length; i++) {
		if(parseInt(arr[i].value))
			tot += parseInt(arr[i].value);
	}
	document.getElementById(totID).value = tot;

}

// function to let dropdown menu reflect in Calculator box
function updateCalc(exampleNumber) {
	// get the ID of the dropdown menu
	var groupID = '2group' + exampleNumber;
	// get string value of it
	var choice = document.getElementById(groupID).value;
	// where to place it
	var location = 'calcBox' + exampleNumber;
	document.getElementById(location).textContent=choice;
	//document.getElementById(location).value = choice;
}

// function to update the box with the answer of percentage
function getAnswer(exampleNumber) {
	
	var groupID = 'raceOptions' + exampleNumber;
	// get string representation of group and example (i.e. "A_31")
	var thisRace = document.getElementById(groupID).value;
	// get # of students enrolled in program (i.e. 11)
	var raceCount = document.getElementById(thisRace).value; 
	// get string ID for total of the example
	var enrollmentID = thisRace + 't';
	// int - # of total students of that group (i.e. 1211)
	var enrollmentTotal = document.getElementById(enrollmentID).value;
	var percentage = raceCount/enrollmentTotal;
	var percentageRounded = round(percentage,4);
	var answerID = 'answer' + exampleNumber;
	if (exampleNumber.charAt(2)==4) {
		document.getElementById(answerID).textContent = percentageRounded;
	}
	else {
		document.getElementById(answerID).textContent = strip(percentageRounded*100)+"%";
	}
	//document.getElementById(answerID).value = percentageRounded;
}

// function to get the percentage of all other students
function getOthers(exampleNumber) {
	// get ID of the count total
	var countTotalID = 'countTot' + exampleNumber;
	var countTotal = document.getElementById(countTotalID).value;
	
	// get race's count to subtract
	var groupID = 'raceOptions' + exampleNumber;
	var raceSelection = document.getElementById(groupID).value;
	var amountToSubtract = document.getElementById(raceSelection).value; 
	var numerator = countTotal - amountToSubtract;

	// do the same for the total child enrollment

	// get ID of the enrollment total
	var enrollmentTotalID = 'enrollmentTot' + exampleNumber;
	var enrollmentTotal = document.getElementById(enrollmentTotalID).value;
	// get race's enrollment to subtract
	var totEnrollmentID = raceSelection + 't';
	var amountToSubtractDenom = document.getElementById(totEnrollmentID).value;
	var denominator = enrollmentTotal - amountToSubtractDenom;

	// calculate risk for others
	var riskOthers = numerator/denominator;
	var riskOthersRounded = round(riskOthers,4);
	var answerID = 'answer' + exampleNumber + 'others';
	if (exampleNumber.charAt(2)==4) {
		document.getElementById(answerID).textContent = riskOthersRounded;
	}
	else {
		document.getElementById(answerID).textContent = strip(riskOthersRounded*100)+"%";
	}
	//document.getElementById(answerID).value = riskOthersRounded;

	// calculate risk ratio
	var riskNumerator = amountToSubtract / amountToSubtractDenom;
	var riskRatio = riskNumerator / riskOthers;
	var riskRatioRounded = round(riskRatio, 4);
	var riskAnswerID = 'answer' + exampleNumber + 'ratio';
	document.getElementById(riskAnswerID).textContent = strip(riskRatioRounded);
	//document.getElementById(riskAnswerID).value = riskRatioRounded;
}
// function to get the percentage of all other state students (ex 5.1)
function getOthers5(exampleNumber) {
	// get ID of the count total
	var countTotalID = 'countTot' + exampleNumber;
	var countTotal = document.getElementById(countTotalID).value;
	
	// get race's count to subtract
	var groupID = 'raceOptions' + exampleNumber;
	// splice string for race option to get rid of 's'
	groupID = groupID.substring(0, groupID.length-1);
	// continue
	var raceSelection = document.getElementById(groupID).value;
	// add back the 's' for the value search
	raceSelection = raceSelection + 's';
	var amountToSubtract = document.getElementById(raceSelection).value; 
	var numerator = countTotal - amountToSubtract;
	// do the same for the total child enrollment

	// get ID of the enrollment total
	var enrollmentTotalID = 'enrollmentTot' + exampleNumber;
	var enrollmentTotal = document.getElementById(enrollmentTotalID).value;
	// get race's enrollment to subtract
	var totEnrollmentID = raceSelection + 't';
	var amountToSubtractDenom = document.getElementById(totEnrollmentID).value;
	var denominator = enrollmentTotal - amountToSubtractDenom;
	// calculate risk for others
	var riskOthers = numerator/denominator;
	var riskOthersRounded = round(riskOthers,4);
	var answerID = 'answer' + exampleNumber + 'others';
	if (exampleNumber.charAt(2)==4) {
		document.getElementById(answerID).textContent = riskOthersRounded;
	}
	else {
		document.getElementById(answerID).textContent = strip(riskOthersRounded*100)+"%";
	}

	//document.getElementById(answerID).value = riskOthersRounded;

	// calculate risk ratio
	// get the risk from district, non-state
	var districtID = raceSelection.substring(0, raceSelection.length-1); // B_51
	var districtNum = document.getElementById(districtID).value;
	var districtID2 = districtID + 't';
	var districtDen = document.getElementById(districtID2).value;
	var riskNumerator = districtNum / districtDen;
	var riskRatio = riskNumerator / riskOthers;
	var riskRatioRounded = round(riskRatio, 4);
	var riskAnswerID = 'answer' + exampleNumber + 'ratio';
	document.getElementById(riskAnswerID).textContent = strip(riskRatioRounded);
	//document.getElementById(riskAnswerID).value = riskRatioRounded;
}

function getOthers6(exampleNumber) {
	// reminder: passed on is _61s
	// get A (ratios of district over district total for each)
	var HLstring = "HL" + exampleNumber;
	var HLdistrict = document.getElementById(HLstring.slice(0,-1)).value;
	var HLdistrictTot = document.getElementById(HLstring.slice(0,-1) + "t").value;
	var HLratio = HLdistrict/HLdistrictTot;

	var AIstring = "AI" + exampleNumber;
	var AIdistrict = document.getElementById(AIstring.slice(0,-1)).value;
	var AIdistrictTot = document.getElementById(AIstring.slice(0,-1) + "t").value;
	var AIratio = AIdistrict/AIdistrictTot;

	var Astring = "A" + exampleNumber;
	var Adistrict = document.getElementById(Astring.slice(0,-1)).value;
	var AdistrictTot = document.getElementById(Astring.slice(0,-1) + "t").value;
	var Aratio = Adistrict/AdistrictTot;

	var Bstring = "B" + exampleNumber;
	var Bdistrict = document.getElementById(Bstring.slice(0,-1)).value;
	var BdistrictTot = document.getElementById(Bstring.slice(0,-1) + "t").value;
	var Bratio = Bdistrict/BdistrictTot;

	var NHstring = "NH" + exampleNumber;
	var NHdistrict = document.getElementById(NHstring.slice(0,-1)).value;
	var NHdistrictTot = document.getElementById(NHstring.slice(0,-1) + "t").value;
	var NHratio = NHdistrict/NHdistrictTot;

	var Wstring = "W" + exampleNumber;
	var Wdistrict = document.getElementById(Wstring.slice(0,-1)).value;
	var WdistrictTot = document.getElementById(Wstring.slice(0,-1) + "t").value;
	var Wratio = Wdistrict/WdistrictTot;

	var TMstring = "2M" + exampleNumber;
	var TMdistrict = document.getElementById(TMstring.slice(0,-1)).value;
	var TMdistrictTot = document.getElementById(TMstring.slice(0,-1) + "t").value;
	var TMratio = TMdistrict/TMdistrictTot;
	
	// get B (ratios of state to state total)
	var stateTotal = document.getElementById("enrollmentTot" + exampleNumber).value;
	var HLdistrictState = document.getElementById(HLstring).value;
	var HLdistrictTotState = document.getElementById(HLstring + "t").value;
	var HLratioState = HLdistrictTotState/stateTotal;

	var AIdistrictState = document.getElementById(AIstring).value;
	var AIdistrictTotState = document.getElementById(AIstring + "t").value;
	var AIratioState = AIdistrictTotState/stateTotal;

	var AdistrictState = document.getElementById(Astring).value;
	var AdistrictTotState = document.getElementById(Astring + "t").value;
	var AratioState = AdistrictTotState/stateTotal;

	var BdistrictState = document.getElementById(Bstring).value;
	var BdistrictTotState = document.getElementById(Bstring + "t").value;
	var BratioState = BdistrictTotState/stateTotal;

	var NHdistrictState = document.getElementById(NHstring).value;
	var NHdistrictTotState = document.getElementById(NHstring + "t").value;
	var NHratioState = NHdistrictTotState/stateTotal;

	var WdistrictState = document.getElementById(Wstring).value;
	var WdistrictTotState = document.getElementById(Wstring + "t").value;
	var WratioState = WdistrictTotState/stateTotal;

	var TMdistrictState = document.getElementById(TMstring).value;
	var TMdistrictTotState = document.getElementById(TMstring + "t").value;
	var TMratioState = TMdistrictTotState/stateTotal;

	// calcualte C (A*B)
	var HLc = HLratio*HLratioState;

	var AIc = AIratio*AIratioState;

	var Ac = Aratio*AratioState;

	var Bc = Bratio*BratioState; 

	var NHc = NHratio*NHratioState;

	var Wc = Wratio*WratioState;

	var TMc = TMratio*TMratioState;
	// get answers
	// get ID
	var groupChoice = document.getElementById(("raceOptions" + exampleNumber).slice(0,-1)).value;
	// we get something like HL_61
	var groupChoiceChopped = groupChoice.slice(0,-3); // get back HL
	// weighted risk
	var weightedRisk;
	if (groupChoiceChopped == "HL") {
		weightedRisk = (1 - HLratioState)*(HLratio);
	}
	else if (groupChoiceChopped == "AI") {
		weightedRisk = (1 - AIratioState)*(AIratio);
	}
	else if (groupChoiceChopped == "A") {
		weightedRisk = (1 - AratioState)*(Aratio);
	}
	else if (groupChoiceChopped == "B") {
		weightedRisk = (1 - BratioState)*(Bratio);
	}
	else if (groupChoiceChopped == "NH") {
		weightedRisk = (1 - NHratioState)*(NHratio);
	}
	else if (groupChoiceChopped == "W") {
		weightedRisk = (1 - WratioState)*(Wratio);
	}
	else if (groupChoiceChopped == "2M") {
		weightedRisk = (1 - TMratioState)*(TMratio);
	}
	var weightedRiskR = round(weightedRisk,6);
	if (exampleNumber.charAt(2)==4) {
		document.getElementById(("answer" + exampleNumber).slice(0,-1)).textContent = strip(weightedRiskR);
	}
	else {
		document.getElementById(("answer" + exampleNumber).slice(0,-1)).textContent = strip(weightedRiskR*100)+"%";
	}
	// second weighted risk
	var sumC = HLc + AIc + Ac + Bc + NHc + Wc + TMc;
	var toSubtract;
	if (groupChoiceChopped == "HL") {
		toSubtract = HLc;
	}
	else if (groupChoiceChopped == "AI") {
		toSubtract = AIc;
	}
	else if (groupChoiceChopped == "A") {
		toSubtract = Ac;
	}
	else if (groupChoiceChopped == "B") {
		toSubtract = Bc;
	}
	else if (groupChoiceChopped == "NH") {
		toSubtract = NHc;
	}
	else if (groupChoiceChopped == "W") {
		toSubtract = Wc;
	}
	else if (groupChoiceChopped == "2M") {
		toSubtract = TMc;
	}
	var weightedAll = sumC - toSubtract;
	var weightedAllR = round(weightedAll,6);
	if (exampleNumber.charAt(2)==4) {
		document.getElementById("answer" + exampleNumber + "others").textContent = strip(weightedAllR);
	}
	else {
		document.getElementById("answer" + exampleNumber + "others").textContent = strip(weightedAllR*100)+"%";
	}
	// divide 2 for final weighted ratio
	var weightedFinal = weightedRisk/weightedAll;
	var weightedFinalR = round(weightedFinal,6);
	document.getElementById("answer" + exampleNumber + "ratio").textContent = strip(weightedFinalR);
}

function getOthers7(exampleNumber) {
	// get ID of the count total
	var countTotalID = 'countTot' + exampleNumber;
	var countTotal = document.getElementById(countTotalID).value;
	
	// get race's count to subtract
	var groupID = 'raceOptions' + exampleNumber;
	var raceSelection = document.getElementById(groupID).value;
	var amountToSubtract = document.getElementById(raceSelection).value; 
	var numerator = countTotal - amountToSubtract;

	// do the same for the total child enrollment

	// get ID of the enrollment total
	var enrollmentTotalID = 'enrollmentTot' + exampleNumber;
	var enrollmentTotal = document.getElementById(enrollmentTotalID).value;
	// get race's enrollment to subtract
	var totEnrollmentID = raceSelection + 't';
	var amountToSubtractDenom = document.getElementById(totEnrollmentID).value;
	var denominator = enrollmentTotal - amountToSubtractDenom;

	// calculate risk for others
	var riskOthers = numerator/denominator;
	var riskOthersRounded = round(riskOthers,4);
	var answerID = 'answer' + exampleNumber + 'others';
	if (exampleNumber.charAt(2)==4) {
		document.getElementById(answerID).textContent = riskOthersRounded;
	}
	else {
		document.getElementById(answerID).textContent = strip(riskOthersRounded*100)+"%";
	}
	//document.getElementById(answerID).value = riskOthersRounded;

	// calculate risk difference
	var riskNumerator = amountToSubtract / amountToSubtractDenom;
	var riskDiff = riskNumerator - riskOthers;
	var riskDiffR = round(riskDiff, 4);
	var riskAnswerID = 'answer' + exampleNumber + 'ratio';
	document.getElementById(riskAnswerID).textContent = riskDiffR;
	//document.getElementById(riskAnswerID).value = riskRatioRounded;
}

function getOthers8(exampleNumber) {

	// get race composition
	var groupID = 'raceOptions' + exampleNumber;
	var raceSelection = document.getElementById(groupID).value;
	var raceCount = document.getElementById(raceSelection).value; // i.e. 316
	var groupTotal = document.getElementById("countTot"+exampleNumber).value; // i.e. 1222
	var composition = raceCount/groupTotal;
	var compositionR = round(composition,4);
	document.getElementById("comp"+exampleNumber).textContent = strip(compositionR*100)+"%";
	// find percentage of enrolled students who were this race
	var raceTotal = document.getElementById(raceSelection+'t').value; // i.e. 6224
	var enrollmentTotal = document.getElementById("enrollmentTot"+exampleNumber).value;
	var percentRace = raceTotal/enrollmentTotal;
	document.getElementById("perc"+exampleNumber).textContent = strip(percentRace*100)+"%";
	var difference = composition - percentRace;
	document.getElementById("diff"+exampleNumber).textContent = round(difference*100,2);
	// calculate relative difference
	var relative = difference / percentRace;
	document.getElementById("relative"+exampleNumber).textContent = round(relative,4)*100;

}

function getOthers9(exampleNumber) {

	// get race composition
	var groupID = 'raceOptions' + exampleNumber;
	var raceSelection = document.getElementById(groupID).value;
	var raceCount = document.getElementById(raceSelection).value; // i.e. 316
	var groupTotal = document.getElementById("countTot"+exampleNumber).value; // i.e. 1222
	var composition = raceCount/groupTotal;
	var compositionR = round(composition,4);
	document.getElementById("comp"+exampleNumber).textContent = strip(compositionR*100)+"%";
	// find percentage of enrolled students who were this race
	var raceTotal = document.getElementById(raceSelection+'t').value; // i.e. 6224
	var enrollmentTotal = document.getElementById("enrollmentTot"+exampleNumber).value;
	var percentRace = raceTotal/enrollmentTotal;
	document.getElementById("perc"+exampleNumber).textContent = strip(round(percentRace,4)*100)+"%";
	// calculate upper bound
	var bound = percentRace + Math.sqrt(percentRace*(1-percentRace)/groupTotal);
	document.getElementById("bound"+exampleNumber).textContent = strip(round(bound,4)*100)+"%";
}

var $body   = $(document.body);
var navHeight = $('.navbar').outerHeight(true) + 10;

$('#sidebar').affix({
      offset: {
        top: 245,
        bottom: navHeight
      }
});


$body.scrollspy({
	target: '#leftCol',
	offset: navHeight
});