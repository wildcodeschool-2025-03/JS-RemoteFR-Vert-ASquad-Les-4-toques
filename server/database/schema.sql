
CREATE TABLE category (
  id INT AUTO_INCREMENT PRIMARY KEY ,
  name VARCHAR(25)
);

CREATE TABLE recipe(
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



CREATE TABLE ingredient (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nom VARCHAR(50),
    calories VARCHAR(10),
    proteines VARCHAR(10),
    glucides VARCHAR(10),
    lipides VARCHAR(10),
    sucre VARCHAR(10),
    sel VARCHAR(10)
);


CREATE TABLE recipe_ingredient (
  recipe_id INT,
  ingredient_id INT,
  PRIMARY KEY (recipe_id, ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES recipe(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredient(id)
);


CREATE TABLE step (
  id INT AUTO_INCREMENT PRIMARY KEY,
  step_number INT UNSIGNED NOT NULL,
  title VARCHAR(45),
  description TEXT,
  image VARCHAR(255),
  recipe_id INT,
  FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);

CREATE TABLE label (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(45),
  image VARCHAR(255)
);

CREATE TABLE recipe_label(
  label_id INT,
  recipe_id INT,
  PRIMARY KEY (label_id, recipe_id),
  FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);



/**Feeding ingredient table */
INSERT INTO ingredient (nom, calories, proteines, glucides, lipides, sucre, sel) VALUES
('Tomate', '18', '0.9', '3.9', '0.2', '2.6', '0'),
('Pain', '265', '9', '49', '3.2', '5', '0.5'),
('Mozzarella', '280', '18', '2', '22', '1', '0.7'),
('Huile d\'olive', '884', '0', '0', '100', '0', '0'),
('Basilic', '23', '3.2', '2.7', '0.6', '0.3', '0.08'),
('Crevettes', '99', '24', '0.2', '0.3', '0', '0.3'),
('Lait de coco', '230', '2.3', '6', '24', '3.3', '0.05'),
('Courgette', '17', '1.2', '3.1', '0.3', '2.5', '0.003'),
('Ail', '149', '6.4', '33', '0.5', '1', '0.02');

/** Feeding category table */

INSERT INTO category (name) VALUES ("entrée");

INSERT INTO category (name) VALUES ("plat");

INSERT INTO category (name) VALUES ("dessert");


/** Feeding label table */

INSERT INTO label (label) VALUES ("vegetarien");

INSERT INTO label (label) VALUES ("vegan");

INSERT INTO label (label ) VALUES ("sans gluten");


/** essai de recettes: à supprimer avant passage en prod */
INSERT INTO recipe (name, picture,  cost, difficulty, nb_people, qte_ingredients, is_validated, category_id) VALUES ("tomates sur du pain","https://www.cuisineactuelle.fr/imgre/fit/~1~cac~2024~09~30~516b1838-4a01-4087-8065-c4e77263c294.jpeg/422x211/quality/70/crop-from/center/focus-point/789%2C568/bruschetta-facon-pain-perdu-la-recette-au-pesto-tomates-et-champignons-pour-ne-plus-jeter-la-baguette-de-la-veille.jpeg", 1, 1, 3, 3, 1, 1);
INSERT INTO recipe (name, picture, cost, difficulty, nb_people, qte_ingredients, is_validated, category_id) VALUES ("crevettes au lait de coco","https://www.mgc-prevention.fr/wp-content/uploads/2010/11/crevettes_coco_2140553819.jpg", 2, 1, 3, 3, 1, 1);
INSERT INTO recipe (name, picture, cost, difficulty, nb_people, qte_ingredients, is_validated, category_id) VALUES ("courgettes à l'ail","https://img.freepik.com/photos-premium/salade-tiede-aux-jeunes-courgettes-ail-aux-herbes_2829-8847.jpg", 2, 1, 3, 3, 1, 1);

INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (1, 1);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (1, 2);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (1, 3);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (1, 4);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (1, 5);


INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (2, 6);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (2, 7);

INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (3, 8);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (3, 9);

INSERT INTO recipe_label (label_id, recipe_id) VALUES (1, 1);

INSERT INTO step (step_number,title,description,recipe_id) VALUES (1, "couper les tomates en tranches", "blablabla", 1);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (2, "couper le pain en tranches", "blablabla", 1);

INSERT INTO step (step_number,title,description,recipe_id) VALUES (3, "couper la mozzarella en tranches", "blablabla", 1);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (4, "mettre la mozzarella sur une tranche de pain", "blablabla", 1);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (5, "mettre les tranches de tomates par dessus", "blablabla", 1);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (6, "terminer par un filet d'huile d'olive", "saler, poivrer selon convenance", 1);



