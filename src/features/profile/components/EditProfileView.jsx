import React from "react";
import "../../../css/profile/editProfile.css";
import { Danger } from "../../../icons/Icons";

export default function EditProfileView({
  // state
  activeTab,
  onTabChange,
  user,
  formData,
  error,
  loadingUser,
  saving,
  deleting,

  // uploader control (no tocamos ImageUploader, solo lo mostramos)
  showUploader,
  onShowUploader,
  renderUploader,

  // actions
  onChangeField,
  onCancel,
  onSave,

  // delete modal
  showModal,
  onOpenDeleteModal,
  onCloseDeleteModal,
  onConfirmDelete,
}) {
  return (
    <div className="profileEdit-wrapper">
      <div className="profileEdit-sidebar">
        <button
          className={activeTab === "editar" ? "active" : ""}
          onClick={() => onTabChange("editar")}
        >
          Editar perfil
        </button>

        <button
          className={activeTab === "gestionar" ? "active" : ""}
          onClick={() => onTabChange("gestionar")}
        >
          Gestión de la cuenta
        </button>
      </div>

      <div className="profileEdit-content">
        {loadingUser ? <p>Cargando...</p> : null}
        {error ? <p className="error-message">{error}</p> : null}

        {activeTab === "editar" && user && (
          <div className="profileEdit-form">
            <h1>Editar perfil</h1>
            <p>
              Mantén la privacidad de tus datos personales. Cualquier usuario
              que pueda ver tu perfil puede ver la información que añades aquí.
            </p>

            {/* uploader (sin tocar su lógica) */}
            {showUploader ? renderUploader() : null}

            <div className="profileEdit-photo-section">
              <img
                className="profileEdit-photo"
                src={user.profilePhotoUrl}
                alt="Foto de perfil"
              />

              <div className="profileEdit-photo-buttons">
                <button type="button" onClick={onShowUploader}>
                  Subir nueva foto
                </button>
                <button type="button" id="delete-photo" disabled>
                  Eliminar
                </button>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSave();
              }}
            >
              <div className="profileEdit-input-group">
                <div className="profileEdit-name-lastname-group">
                  <div className="profileEdit-field">
                    <label>Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => onChangeField("name", e.target.value)}
                    />
                  </div>

                  <div className="profileEdit-field">
                    <label>Apellido</label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={(e) => onChangeField("lastname", e.target.value)}
                    />
                  </div>
                </div>

                <label>Nombre de usuario</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={(e) => onChangeField("userName", e.target.value)}
                />

                <label>Información</label>
                <textarea
                  name="aboutMe"
                  value={formData.aboutMe}
                  onChange={(e) => onChangeField("aboutMe", e.target.value)}
                />
              </div>

              <div className="profileEdit-action-buttons">
                <button
                  type="button"
                  className="profileEdit-cancel"
                  onClick={onCancel}
                  disabled={saving || deleting}
                >
                  Cancelar
                </button>

                <button type="submit" className="profileEdit-save" disabled={saving || deleting}>
                  {saving ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "gestionar" && (
          <div className="profileEdit-account-management">
            <h2>Gestión de la cuenta</h2>

            <div className="profileEdit-delete-section">
              <h3>Desactivación y eliminación</h3>

              <div className="profileEdit-delete-card">
                <div className="profileEdit-delete-text">
                  <h4>Eliminar datos y cuenta</h4>
                  <p>
                    Si eliminas tu cuenta no podrás recuperarla nunca. Se eliminará
                    permanentemente de tu cuenta de BOOKIFY BOOKS.
                  </p>
                </div>

                <button
                  className="profileEdit-delete-button"
                  onClick={onOpenDeleteModal}
                  disabled={deleting}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}

        {showModal ? (
          <div
            className="deleteModal-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) onCloseDeleteModal();
            }}
          >
            <div className="deleteModal-content">
              <div>
                <Danger />
                <h3>Eliminar cuenta</h3>
                <p>Si eliminas tu cuenta no podrás recuperarla nunca.</p>
                <p>Se eliminará permanentemente de tu cuenta de BOOKIFY BOOKS</p>

                <button onClick={onCloseDeleteModal} disabled={deleting}>
                  Cancelar
                </button>
                <button onClick={onConfirmDelete} disabled={deleting}>
                  {deleting ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
