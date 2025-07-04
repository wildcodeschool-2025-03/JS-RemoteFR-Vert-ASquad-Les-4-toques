import { useCallback, useEffect, useState } from "react";
import type { AdminRecipeType } from "../../lib/definition";

export default function RecipeAdmin() {
  const [recettes, setRecettes] = useState<AdminRecipeType[]>([]);

  const fetchRecipe = useCallback(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin`)
      .then((res) => res.json())
      .then((data) => setRecettes(data.dashboardRecettes))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  return (
    <div className="admin-table">
      <ul className="table-header">
        <li>Id</li>
        <li>Utilisateur</li>
        <li>Recette</li>
        <li>Statut</li>
        <li>Actions</li>
      </ul>
      {recettes.map((rec) => (
        <ul className="table-header-data" key={rec.id}>
          <li>{rec.id}</li>
          <li>{rec.user_id}</li>
          <li>{rec.name}</li>
          <li>{rec.is_validated ? "Validé" : "En attente"}</li>
          <li>
            <button
              type="button"
              className="button-admin"
              onClick={() => {
                fetch(
                  `${import.meta.env.VITE_API_URL}/api/admin/recipes/${rec.id}`,
                  {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: rec.name,
                      is_validated: true,
                    }),
                  },
                ).then(() => {
                  fetchRecipe();
                });
              }}
            >
              Valider
            </button>
            <button
              type="button"
              className="button-admin"
              onClick={() => {
                fetch(`${import.meta.env.VITE_API_URL}/api/recipes/${rec.id}`, {
                  method: "DELETE",
                }).then((res) => {
                  if (res.status === 204) {
                    fetchRecipe();
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
