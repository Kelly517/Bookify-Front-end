import React, { useState, useEffect } from "react";
import logo from "../../assets/sidebar/logo-sidebar.png";
import axios from "axios";
import "../../css/profile/editProfile.css";
import { useNavigate } from "react-router-dom";
import { Danger } from "../../icons/Icons";
import ImageUploader from "./ImageUploader";

const EditProfile = () => {
  const email = localStorage.getItem("email");
  const [activeTab, setActiveTab] = useState("editar");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showUploader, setShowUploader] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    userName: "",
    aboutMe: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/bookify/users/${email}`
        );
        const user = response.data;
        setUser(user);

        const datosUsuario = {
          name: user.name,
          lastname: user.lastname,
          userName: user.userName,
          aboutMe: user.aboutMe,
        };

        setFormData(datosUsuario);
      } catch (error) {
        console.log("Error mostrando los datos");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/bookify/user/${email}`,
        formData
      );
      navigate("/dashboard/profile");
    } catch (error) {
      console.log("Error actualizando los datos");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/profile");
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    try {
      const response = axios.delete(
        `http://localhost:8080/api/bookify/user/${email}`
      );
      navigate("/");
    } catch (error) {}
  };

  const handleUploadImage = () => {
    setShowUploader(true);
  };

  return (
    <div className="profileEdit-wrapper">
      <div className="profileEdit-sidebar">
        <button
          className={activeTab === "editar" ? "active" : ""}
          onClick={() => setActiveTab("editar")}
        >
          Editar perfil
        </button>
        <button
          className={activeTab === "gestionar" ? "active" : ""}
          onClick={() => setActiveTab("gestionar")}
        >
          Gestión de la cuenta
        </button>
      </div>

      <div className="profileEdit-content">
        {activeTab === "editar" && (
          <div className="profileEdit-form">
            <h1>Editar perfil</h1>
            <p>
              Mantén la privacidad de tus datos personales. Cualquier usuario
              que pueda ver tu perfil puede ver la información que añades aquí.
            </p>

            {showUploader && (
              <ImageUploader
                title="Profile"
                uploadUrl={`http://localhost:8080/api/bookify/profile/photo/${user.userId}`}
                onSuccess={(data) =>
                  window.location.reload()
                }
              />
            )}

            <div className="profileEdit-photo-section">
              <img
                className="profileEdit-photo"
                src={`http://localhost:8080/api/bookify/profile/photo/${user.userId}/${encodeURIComponent(user.profilePhoto)}`}
                alt="Foto de perfil"
              />
              <div className="profileEdit-photo-buttons">
                <button onClick={handleUploadImage}>Subir nueva foto</button>
                <button id="delete-photo">Eliminar</button>
              </div>
            </div>

            <form onSubmit={handleSave}>
              <div className="profileEdit-input-group">
                <div className="profileEdit-name-lastname-group">
                  <div className="profileEdit-field">
                    <label>Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="profileEdit-field">
                    <label>Apellido</label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <label>Nombre de usuario</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                />

                <label>Información</label>
                <textarea
                  name="aboutMe"
                  value={formData.aboutMe}
                  onChange={handleChange}
                />
              </div>

              <div className="profileEdit-action-buttons">
                <button className="profileEdit-cancel" onClick={handleCancel}>
                  Cancelar
                </button>
                <button type="submit" className="profileEdit-save">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        )}
        {showModal && (
          <div
            className="deleteModal-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleCancel(); // o setShowModal(false)
              }
            }}
          >
            <div className="deleteModal-content">
              <div>
                {" "}
                <Danger />
                <h3>Eliminar cuenta</h3>
                <p>Si eliminas tu cuenta no podrás recuperarla nunca.</p>
                <p>
                  Se eliminará permanentemente de tu cuenta de BOOKIFY BOOKS
                </p>
                <button onClick={handleCancel}>Cancelar</button>
                <button onClick={handleDeleteAccount}>Eliminar</button>
              </div>
            </div>
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
                    Si eliminas tu no podrás recuperarlo nunca. Se eliminará
                    permanentemente de tu cuenta de BOKIFY BOOKS
                  </p>
                </div>
                <button
                  className="profileEdit-delete-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
