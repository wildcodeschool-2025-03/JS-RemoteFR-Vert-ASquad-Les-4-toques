CREATE TABLE category (
  id INT AUTO_INCREMENT PRIMARY KEY ,
  name VARCHAR(25)
);

CREATE TABLE recipe (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
name VARCHAR(45),
cost INT UNSIGNED NOT NULL,
difficulty INT UNSIGNED NOT NULL,
nb_people INT UNSIGNED NOT NULL,
qte_ingredients INT UNSIGNED NOT NULL,
picture TEXT,
additional_text VARCHAR(255),
is_validated BOOLEAN NOT NULL,
category_id INT,
FOREIGN KEY (category_id) REFERENCES category(id),
user_id INT 
);

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

INSERT INTO role (id, label)
values
  (1, "admin"),
  (2, "visiteur"),
   (3, "utilisateur")
  ;





