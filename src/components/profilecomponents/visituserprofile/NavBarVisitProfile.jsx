import { useParams } from "react-router-dom";

import ProfileSpinners from "../../../spinners/ProfileSpinners";
import { navBarProfileMessages } from "../profileComponentsMessages";

import { useVisitedUser } from "../../../features/profile/hooks/useVisitedUser";
import { getProfilePhotoUrl } from "../../../utils/mediaUrls";
import NavBarVisitProfileView from "../../../features/profile/components/NavBarVisitProfileView";

export default function NavBarVisitProfile() {
  const { email } = useParams();
  const { user, loading, error } = useVisitedUser(email);

  if (loading) return <p>{navBarProfileMessages.charging}</p>;
  if (error) return <ProfileSpinners />;
  if (!user) return null;

  const photoUrl = getProfilePhotoUrl(user.userId, user.profilePhoto);

  return <NavBarVisitProfileView user={user} photoUrl={photoUrl} />;
}
