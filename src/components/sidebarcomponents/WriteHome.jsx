import React from "react";
import { useWriteHome } from "../../features/sidebar/hooks/useWriteHome";
import WriteHomeView from "../../features/sidebar/components/WriteHomeView";

const WriteHome = () => {
  const {
    books,
    loading,
    error,

    openDropdownId,
    toggleDropDown,

    showModal,
    openModal,
    closeModal,

    messages,
    goToSales,
    editBook,
    deleteBook,
  } = useWriteHome();

  return (
    <WriteHomeView
      books={books}
      loading={loading}
      error={error}
      openDropdownId={openDropdownId}
      onToggleDropDown={toggleDropDown}
      showModal={showModal}
      onOpenModal={openModal}
      onCloseModal={closeModal}
      messages={messages}
      onGoToSales={goToSales}
      onEditBook={editBook}
      onDeleteBook={deleteBook}
    />
  );
};

export default WriteHome;
