let numberOfTrainees = 15;
var trainingDates = [];
var trainingDays = [];
var loadForYear = new Date().getFullYear();

let checkboxNames = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

function setHeader() {
	let gruppe = $("#Gruppe").val();
	$('#header').html("Tora Hombu Dojo Trainingsliste<br>"+gruppe);
}

function loadTrainingDays() {
	trainingDays = [];
	var dayCounter = 1;
	checkboxNames.forEach(elementName => {
		if ($("#"+elementName).is(':checked')) trainingDays.push(dayCounter);	
		dayCounter++;
	});
}

function renderTable(trainings) {
	let table = $("<table>");
	$("body").append(table);
	var row = $('<tr>');
	table.append(row);
	var cell = $('<td>');
	cell.addClass('name').text('Name');
	row.append(cell);

	trainings.forEach(datum => {
		var dateString = dateFormat(datum, "dd.<br>mm.");
		row.append($('<td>').html(dateString));		
	});


	for (var x=1; x <= numberOfTrainees; x++) {
		var row = $('<tr>');
		table.append(row);
		for (var i=0; i<=trainings.length; i++) {
			var cell = $('<td>');
			if (i == 0) {
				cell.addClass('name').text('Name');
			}
			cell.html('&nbsp;');
			row.append(cell);
		}
	}
}

function calculateTrainingDates(weekDays) {
	console.log("calculateTrainingDates");
	trainingDates = [];
	var d = new Date();
	d.setMonth(0, 1);
	d.setFullYear(loadForYear);

	while (d.getFullYear() == loadForYear) {
		if (weekDays.includes(d.getDay())) {
			trainingDates.push(new Date(d));
		}	
		d.setDate(d.getDate()+1);
	}
}

function renderTwoTables() {
	var middle = Math.floor(trainingDates.length / 2);
	var trainingChunks = trainingDates.slice(0, middle);
	renderTable(trainingChunks);

	var trainingChunks = trainingDates.slice(middle, trainingDates.length);
	renderTable(trainingChunks);
}

function reloadAll() {
	$("table").remove();
	loadTrainingDays();
	setHeader();
	calculateTrainingDates(trainingDays);
	if (trainingDates.length > 0) 
		renderTwoTables();
}

function changeYear(event) {
	console.log($("this"));
	loadForYear = $(this).find('option:selected').text();
	
	console.log(loadForYear);
	reloadAll();
}

function initialLoad() {
	var d = new Date();
	for (var i=0; i<3; i++) {
		var option = $("<option>");
		option.value = d.getFullYear();
		option.text(d.getFullYear());
		$("#yearSelector").append(option);
		d.setFullYear(d.getFullYear()+1);
	}
}

initialLoad();

reloadAll();

$("#Gruppe").on("input", setHeader);

$("#yearSelector").on("change", changeYear);

checkboxNames.forEach(elementName => {
	$("#"+elementName).on("input", reloadAll);
})