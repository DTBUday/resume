var fs = require('fs');
var pdf = require('html-pdf');

function renderHtml(resumeJson) {
	try {
    		var themePkg = require('jsonresume-theme-clean');
	} catch (err) {
		console.log('Error: Theme is not installed')
		process.exit();
	}
	return themePkg.render(resumeJson);
}

function createPdf(resumeJson, callback) {
    var html = renderHtml(resumeJson);
    pdf.create(html, {format: 'Letter'}).toFile("resume.pdf", callback);
}

createPdf(JSON.parse(fs.readFileSync('./resume.json','utf8')), function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Successfully written to file');
	}
});
