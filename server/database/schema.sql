CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  label VARCHAR(45)
);

CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname VARCHAR(45) NOT NULL,
  lastname VARCHAR(45) NOT NULL,
  pseudo VARCHAR (45) NOT NULL,
  email VARCHAR(45) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  age INT NULL,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE comment (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  rating INT NULL,
  name VARCHAR(45),
  text TEXT,
  recipe_id INT,
  user_id INT,
  FOREIGN KEY (recipe_id) REFERENCES recipe(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE favori (
  recipe_id INT,
  user_id INT,
  FOREIGN KEY (recipe_id) REFERENCES recipe(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE week_meal (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(45) NULL,
  recipe_id INT,
  user_id INT,
  FOREIGN KEY (recipe_id) REFERENCES recipe(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);




