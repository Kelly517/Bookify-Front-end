import { useEffect, useMemo, useState } from "react";
import { loadAuthFromStorage } from "../../../storage/authStorage";
import { deleteUserByEmail, getUserByEmail, updateUserByEmail } from "../../../services/profileService";

export function useEditProfile() {
  const { email } = loadAuthFromStorage();

  const [activeTab, setActiveTab] = useState("editar");
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    userName: "",
    aboutMe: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showUploader, setShowUploader] = useState(false);

  const [loadingUser, setLoadingUser] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const canWork = useMemo(() => Boolean(email), [email]);

  useEffect(() => {
    if (!canWork) return;

    let cancelled = false;
    setLoadingUser(true);
    setError("");

    getUserByEmail(email)
      .then((data) => {
        if (cancelled) return;
        setUser(data);
        setFormData({
          name: data?.name || "",
          lastname: data?.lastname || "",
          userName: data?.userName || "",
          aboutMe: data?.aboutMe || "",
        });
      })
      .catch(() => {
        if (!cancelled) setError("Error mostrando los datos");
      })
      .finally(() => {
        if (!cancelled) setLoadingUser(false);
      });

    return () => {
      cancelled = true;
    };
  }, [canWork, email]);

  const onChangeField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const save = async () => {
    if (!canWork) {
      setError("No se encontró el email del usuario.");
      return { ok: false };
    }

    setSaving(true);
    setError("");
    try {
      await updateUserByEmail(email, formData);
      return { ok: true };
    } catch {
      setError("Error actualizando los datos");
      return { ok: false };
    } finally {
      setSaving(false);
    }
  };

  const removeAccount = async () => {
    if (!canWork) {
      setError("No se encontró el email del usuario.");
      return { ok: false };
    }

    setDeleting(true);
    setError("");
    try {
      await deleteUserByEmail(email);
      return { ok: true };
    } catch {
      setError("Error eliminando la cuenta");
      return { ok: false };
    } finally {
      setDeleting(false);
    }
  };

  return {
    // auth/user
    email,
    user,
    loadingUser,
    error,

    // ui state
    activeTab,
    setActiveTab,
    showModal,
    setShowModal,
    showUploader,
    setShowUploader,

    // form
    formData,
    onChangeField,

    // actions
    save,
    saving,
    removeAccount,
    deleting,
  };
}
