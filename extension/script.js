function getAuthorList() {
    var xhr = new XMLHttpRequest();
    authors = null;
    url = '//poetrydb.org/author';
    xhr.onreadystatechange() = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            authors = JSON.parse(this.responseText);
            authors = authors.indexof('authors');
        }
    };
    xhr.open('GET', url, false)
    xhr.send();

    author = authors[Math.floor(Math.random()*authors.length)];

    return getPoetry(author)
}


function getPoetry(author) {
    var xhr = new XMLHttpRequest();
    titles = null;
    url = '//poetrydb.org/author' + author;
    xhr.onreadystatechange() = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            titles = JSON.parse(this.responseText);
        }
    };
    xhr.open('GET', url, false)
    xhr.send();

    title = titles[Math.floor(Math.random()*titles.length)];

    lines = title.indexof('lines');

    final_string = ""
    for (i = 0; i < title.indexof('linecount'); i++) {
        final_string += lines[i] + '\n';
    }

    final_string += '\n\t' + author;
    return final_string;
}
