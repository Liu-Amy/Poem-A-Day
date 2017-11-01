document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.local.get("poems", function(poemsObj) {

        var poems = poemsObj.poems;
        if (typeof poems === "undefined") {
            //need to initialize

            getPoetry(true);

        } else {
            //was already initialized :D
            entry = poems[Math.floor(Math.random()*poems.length)];
            title = entry.title;
            lines = entry.lines;

            final_string = "";
            for (i = 0; i < entry.linecount; i++) {
                final_string += lines[i] + '\n';
            }

            final_string += '\n- ' + entry.author;
            document.getElementById("title").innerHTML = title;
            document.getElementById("poetry").innerHTML = final_string;
            getPoetry(false);
        }
    });
});

//Randomly selects a poem. Yeah. This simple.
function getPoetry(initialload) {
    var xhr = new XMLHttpRequest();
    entries = null;
    url = 'http://poetrydb.org/author/*';
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            entries = JSON.parse(this.responseText);
            short_poems = []
            for (i = 0 ; i < entries.length; i++) {
                if (entries[i].linecount <= 40) {
                    short_poems.push(entries[i]);
                }
            }
            chrome.storage.local.set({"poems": short_poems}, function() {});
            if (initialload) {
                entry = short_poems[Math.floor(Math.random()*short_poems.length)];
                title = entry.title;
                lines = entry.lines;

                final_string = "";
                for (i = 0; i < entry.linecount; i++) {
                    final_string += lines[i] + '\n';
                }

                final_string += '\n- ' + entry.author;
                document.getElementById("title").innerHTML = title;
                document.getElementById("poetry").innerHTML = final_string;
            }
        }
    };
    xhr.open('GET', url);
    xhr.send();
}
