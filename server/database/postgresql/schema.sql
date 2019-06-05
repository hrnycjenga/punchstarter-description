DROP TABLE IF EXISTS product;

CREATE TABLE product(
  productId INTEGER PRIMARY KEY, 
  productTitle TEXT, 
  productSummary TEXT, 
  productCreator TEXT, 
  productVideoURL TEXT, 
  productCategroy TEXT, 
  productCompanyAddress TEXT
  );

DROP TABLE IF EXISTS descriptions;

CREATE TABLE descriptions(
  descriptionId INT PRIMARY KEY, 
  descriptionEntry TEXT
  );

DROP TABLE IF EXISTS pictures;

CREATE TABLE pictures(
  pictureId INT PRIMARY KEY, 
  pictureURL TEXT
  );
