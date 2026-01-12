import React from "react";
import { useNavigate } from "react-router-dom";
import ProfilePhotoModalView from "../../features/profile/components/ProfilePhotoModalView";
import EditProfileView from "../../features/profile/components/EditProfileView";
import { useEditProfile } from "../../features/profile/hooks/useEditProfile";
import { getProfilePhotoUrl } from "../../utils/mediaUrls";

// 👇 lo dejamos igual, NO refactor por ahora
import ImageUploader from "./ImageUploader";

const EditProfile = () => {
  const navigate = useNavigate();

  const {
    user,
    loadingUser,
    error,

    activeTab,
    setActiveTab,

    showModal,
    setShowModal,

    showUploader,
    setShowUploader,

    formData,
    onChangeField,

    save,
    saving,

    removeAccount,
    deleting,
  } = useEditProfile();

  const photoUrl = user
    ? getProfilePhotoUrl(user.userId, user.profilePhoto)
    : "";

  const onCancel = () => navigate("/dashboard/profile");

  const onSave = async () => {
    const result = await save();
    if (result.ok) navigate("/dashboard/profile");
  };

  const onConfirmDelete = async () => {
    const result = await removeAccount();
    if (result.ok) navigate("/");
  };

  return (
    <EditProfileView
      activeTab={activeTab}
      onTabChange={setActiveTab}
      user={user ? { ...user, profilePhotoUrl: photoUrl } : null}
      formData={formData}
      error={error}
      loadingUser={loadingUser}
      saving={saving}
      deleting={deleting}
      onChangeField={onChangeField}
      onCancel={onCancel}
      onSave={onSave}
      showModal={showModal}
      onOpenDeleteModal={() => setShowModal(true)}
      onCloseDeleteModal={() => setShowModal(false)}
      onConfirmDelete={onConfirmDelete}
      showUploader={showUploader}
      onShowUploader={() => setShowUploader(true)}
      renderUploader={() =>
        user ? (
          <ProfilePhotoModalView
            title="Actualizar foto de perfil"
            onClose={() => setShowUploader(false)}
          >
            <ImageUploader
              title="Foto de perfil"
              buttonText="Elegir foto"
              previewShape="circle"
              defaultPreview={photoUrl}
              uploadUrl={`http://localhost:8080/api/bookify/profile/photo/${user.userId}`}
              onSuccess={() => window.location.reload()}
            />
          </ProfilePhotoModalView>
        ) : null
      }
    />
  );
};

export default EditProfile;
