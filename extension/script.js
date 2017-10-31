document.addEventListener("DOMContentLoaded", function() {
  getPoetry();
});
//Randomly selects a poem. Yeah. This simple.
function getPoetry() {
    var xhr = new XMLHttpRequest();
    entries = null;
    url = 'http://poetrydb.org/author/*';
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            entries = JSON.parse(this.responseText);
            entry = entries[Math.floor(Math.random()*entries.length)];

            title = entry.title;
            lines = entry.lines;

            final_string = "";
            for (i = 0; i < entry.linecount; i++) {
                final_string += lines[i] + '\n';
            }

            final_string += '\n\t' + entry.author;
            document.getElementById("title").textcontent = title;
            document.getElementById("poetry").textcontent = final_string;
        }
    };
    xhr.open('GET', url);
    xhr.send();
}
