import { useCallback, useEffect, useState } from "react";
import type { AdminUserType } from "../../lib/definition";

export default function UserAdmin() {
  const [utilisateurs, setUtilisateurs] = useState<AdminUserType[]>([]);

  const fetchUsers = useCallback(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin`)
      .then((res) => res.json())
      .then((data) => setUtilisateurs(data.dashboardUtilisateurs))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="admin-table">
      <ul className="table-header">
        <li>Id</li>
        <li>Pseudo</li>
        <li>Role</li>
        <li>Statut</li>
        <li>Actions</li>
      </ul>
      {utilisateurs.map((user) => (
        <ul className="table-header-data" key={user.id}>
          <li>{user.id}</li>
          <li>{user.pseudo}</li>
          <li>{user.role_id === 1 ? "Administrateur" : "Utilisateur"}</li>
          <li>{user.is_validated ? "Validé" : "En attente"}</li>
          <li>
            <button
              type="button"
              className="button-admin"
              onClick={() => {
                fetch(
                  `${import.meta.env.VITE_API_URL}/api/admin/users/${user.id}`,
                  {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      pseudo: user.pseudo,
                      role_id: user.role_id,
                      is_validated: true,
                    }),
                  },
                ).then(() => {
                  fetchUsers();
                });
              }}
            >
              Valider
            </button>

            <button
              type="button"
              className="button-admin"
              onClick={() => {
                const newRole = user.role_id === 1 ? 3 : 1;

                fetch(
                  `${import.meta.env.VITE_API_URL}/api/admin/users/${user.id}`,
                  {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      pseudo: user.pseudo,
                      role_id: newRole,
                      is_validated: user.is_validated,
                    }),
                  },
                ).then(() => {
                  fetchUsers();
                });
              }}
            >
              Changer rôle
            </button>

            <button
              type="button"
              className="button-admin"
              onClick={() => {
                fetch(`${import.meta.env.VITE_API_URL}/api/users/${user.id}`, {
                  method: "DELETE",
                }).then((res) => {
                  if (res.status === 204) {
                    fetchUsers();
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
