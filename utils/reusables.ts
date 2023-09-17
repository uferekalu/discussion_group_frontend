import React, { useState } from "react";

const Reusables = () => {
  const [isCreateGroup, setIsCreateGroup] = useState<boolean>(false);
  const [openCreateGroup, setOpenCreateGroup] = useState<boolean>(false);
  
  const handleOpenCreateGroup = () => setOpenCreateGroup(true);
  const handleCloseCreateGroup = () => setOpenCreateGroup(false);

  const closeIsCreateGroup = () => setIsCreateGroup(false);
  const openIsCreateGroup = () => setIsCreateGroup(true);

  return {
    isCreateGroup,
    setIsCreateGroup,
    closeIsCreateGroup,
    openIsCreateGroup,
    openCreateGroup,
    handleOpenCreateGroup,
    handleCloseCreateGroup,
  };
};

export { Reusables };
