DROP TABLE IF EXISTS project;

CREATE TABLE project(
  projectId SERIAL, 
  projectTitle TEXT, 
  projectSummary TEXT, 
  projectVideo TEXT, 
  projectAddress TEXT
  );

DROP TABLE IF EXISTS descriptions;

CREATE TABLE descriptions(
  descriptionId SERIAL, 
  descriptionEntry TEXT
  );

DROP TABLE IF EXISTS pictures;

CREATE TABLE pictures(
  pictureId SERIAL, 
  pictureURL TEXT
  );
