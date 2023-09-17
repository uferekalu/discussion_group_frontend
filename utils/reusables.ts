import React, { useState } from "react";

const Reusables = () => {
  const [isCreateGroup, setIsCreateGroup] = useState<boolean>(false);
  const [openCreateGroup, setOpenCreateGroup] = useState<boolean>(false);
  
  const handleOpenCreateGroup = () => setOpenCreateGroup(true);
  const handleCloseCreateGroup = () => setOpenCreateGroup(false);

  const closeIsCreateGroup = () => setIsCreateGroup(false);
  const openIsCreateGroup = () => setIsCreateGroup(true);

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };

  return {
    isCreateGroup,
    setIsCreateGroup,
    closeIsCreateGroup,
    openIsCreateGroup,
    openCreateGroup,
    handleOpenCreateGroup,
    handleCloseCreateGroup,
    buttonVariants
  };
};

export { Reusables };
