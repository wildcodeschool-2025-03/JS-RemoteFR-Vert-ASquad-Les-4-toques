import { useCallback, useEffect, useState } from "react";
import type { AdminIngredientsType } from "../../lib/definition";

export default function IngredientAdmin() {
  const [ingredients, setIngredients] = useState<AdminIngredientsType[]>([]);

  const fetchIngredients = useCallback(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin`)
      .then((res) => res.json())
      .then((data) => setIngredients(data.dashboardIngredients))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  return (
    <div className="admin-table">
      <ul className="table-header">
        <li>Id</li>
        <li>Ingredient</li>
        <li>Calories</li>
        <li>Statut</li>
        <li>Actions</li>
      </ul>
      {ingredients.map((ing) => (
        <ul className="table-header-data" key={ing.id}>
          <li>{ing.id}</li>
          <li>{ing.nom}</li>
          <li>{ing.calories} </li>
          <li>{ing.is_validated ? "Validé" : "En attente"}</li>
          <li>
            <button
              type="button"
              className="button-admin"
              onClick={() => {
                fetch(
                  `${import.meta.env.VITE_API_URL}/api/admin/ingredients/${ing.id}`,
                  {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      nom: ing.nom,
                      calories: ing.calories,
                      is_validated: true,
                    }),
                  },
                ).then(() => {
                  fetchIngredients();
                });
              }}
            >
              Valider
            </button>

            <button
              type="button"
              className="button-admin"
              onClick={() => {
                fetch(
                  `${import.meta.env.VITE_API_URL}/api/ingredients/${ing.id}`,
                  {
                    method: "DELETE",
                  },
                ).then((res) => {
                  if (res.status === 204) {
                    fetchIngredients();
                  }
                });
              }}
            >
              Supprimer
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
}
