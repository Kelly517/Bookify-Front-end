import React from "react";
import { useParams } from "react-router-dom";

import ProfileSpinners from "../../../spinners/ProfileSpinners";
import { navBarProfileMessages } from "../profileComponentsMessages";

import { useVisitedUser } from "../../../features/profile/hooks/useVisitedUser";
import { useVisitedUserBooks } from "../../../features/profile/hooks/useVisitedUserBooks";
import BooksUserVisitProfileView from "../../../features/profile/components/BooksUserVisitProfileView";

export default function BooksUserVisitProfile() {
  const { email } = useParams();
  const { user, loading, error } = useVisitedUser(email);

  const userId = user?.userId;
  const { books, loadingBooks, errorBooks } = useVisitedUserBooks(email);

  if (loading) return <p>{navBarProfileMessages.charging}</p>;
  if (error) return <ProfileSpinners />;
  if (!user) return null;

  return <BooksUserVisitProfileView books={books} loadingBooks={loadingBooks} errorBooks={errorBooks} />;
}
