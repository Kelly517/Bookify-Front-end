import React from "react";
import { useMyBooks } from "../../features/profile/hooks/useMyBooks";
import BooksUserProfileView from "../../features/profile/components/BooksUserProfileView";

const BooksUserProfile = () => {
  const { books, loading, error } = useMyBooks();
  return <BooksUserProfileView books={books} loading={loading} error={error} />;
};

export default BooksUserProfile;
