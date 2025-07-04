export type AdminRecipeType = {
  user_id: number;
  name: string;
  id: number;
  is_validated: boolean;
};

export type AdminIngredientsType = {
  nom: string;
  calories: number;
  proteines: number;
  glucides: number;
  lipides: number;
  sucre: number;
  sel: number;
  id: number;
  is_validated: boolean;
};

export type AdminUserType = {
  pseudo: string;
  firstname: string;
  lastname: string;
  email: string;
  id: number;
  age: number;
  role_id: number;
  is_validated: boolean;
};
