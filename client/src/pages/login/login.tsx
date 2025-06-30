import "../login/login.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

type FormType = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>();

  const onSubmit = async (data: FormType) => {
    console.log(data);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, data);

      navigate("/");
    } catch (err) {
      err;
    }
  };

  return (
    <>
      <h2 className="titre">Connexion</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="formulaire">
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
            type="text"
            name="password"
          />
          {errors?.password && <p>{errors.password.message}</p>}
        </div>
        <div className="container_btn">
          <button className="btn" type="submit">
            Se connecter
          </button>
        </div>
      </form>
      <p className="para">
        Pas encore de compte?
        <Link to="/inscription">S'inscrire</Link>
      </p>
    </>
  );
}
