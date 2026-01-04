import React from "react";
import { useReadLibrary } from "../../features/sidebar/hooks/useReadLibrary";
import ReadView from "../../features/sidebar/components/ReadView";

const Read = () => {
  const { books, loading, error } = useReadLibrary();
  return <ReadView books={books} loading={loading} error={error} />;
};

export default Read;