import "../register/register.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

type FormType = {
  firstname: string;
  lastname: string;
  pseudo: string;
  age?: number;
  email: string;
  password: string;
  confirm_password?: string;
};

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>();

  const onSubmit = async (data: FormType) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, data);

      navigate("/");
    } catch (err) {
      err;
    }
  };

  return (
    <>
      <h2 className="titre">Création de compte</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="formulaire">
        <div>
          <label htmlFor="firstname">Prénom</label>
          <input
            {...register("firstname", {
              required: {
                value: true,
                message: "merci de completer ce champ",
              },
              minLength: {
                value: 2,
                message: "le champ doit contenir au minimum 2 caractères",
              },
              maxLength: {
                value: 45,
                message: "le champ doit contenir au maximum 45 caractères",
              },
            })}
            type="text"
            name="firstname"
          />
        </div>
        {errors?.firstname && <p>{errors.firstname.message}</p>}
        <div>
          <label htmlFor="lastname">Nom</label>
          <input
            {...register("lastname", {
              required: {
                value: true,
                message: "merci de completer ce champ",
              },
              minLength: {
                value: 2,
                message: "le champ doit contenir au minimum 2 caractères",
              },
              maxLength: {
                value: 45,
                message: "le champ doit contenir au maximum 45 caractères",
              },
            })}
            type="text"
            name="lastname"
          />
          {errors?.lastname && <p>{errors.lastname.message}</p>}
        </div>
        <div>
          <label htmlFor="pseudo">Pseudo</label>
          <input
            {...register("pseudo", {
              required: {
                value: true,
                message: "merci de completer ce champ",
              },
              minLength: {
                value: 2,
                message: "le champ doit contenir au minimum 2 caractères",
              },
              maxLength: {
                value: 45,
                message: "le champ doit contenir au maximum 45 caractères",
              },
            })}
            type="text"
            name="pseudo"
          />
          {errors?.pseudo && <p>{errors.pseudo.message}</p>}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            {...register("age", {
              required: {
                value: true,
                message: "merci de completer ce champ",
              },
              min: {
                value: 18,
                message: "l'age minimum requis est de 18 ans",
              },
              max: {
                value: 110,
                message: "l'age maximum accepté est de 110 ans",
              },
            })}
            type="number"
            name="age"
          />
          {errors?.age && <p>{errors.age.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "merci de completer ce champ",
              },
              pattern: {
                value:
                  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
                message: "le format d'email est incorrect",
              },
            })}
            type="text"
            name="email"
          />
          {errors?.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            {...register("password", {
              required: {
                value: true,
                message: "merci de completer ce champ",
              },
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
                message:
                  "Le mot de passe doit contenir entre 8 et 16 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial",
              },
            })}
            type="password"
            name="password"
          />
          {errors?.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirm_password">Confirmation du mot de passe</label>
          <input
            {...register("confirm_password", {
              validate: (value) => {
                if (value !== watch("password")) {
                  return "les mots de passe ne sont pas identiques";
                }
              },
            })}
            type="password"
            name="confirm_password"
          />
          {errors?.confirm_password && <p>{errors.confirm_password.message}</p>}
        </div>
        <div className="container_btn">
          <button className="btn" type="submit">
            S'inscrire
          </button>
        </div>
      </form>
      <p className="para">
        Déjà un compte?
        <Link to="/connexion">Se connecter</Link>
      </p>
    </>
  );
}
