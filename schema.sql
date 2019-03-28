CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE main(id integer primary key autoincrement not null, title text, summary text, creator text, videoURL text, genre text, location text);
CREATE TABLE text(id integer primary key autoincrement not null, paragraphs text);
CREATE TABLE pictures(id integer primary key autoincrement not null, pictureURL text);
