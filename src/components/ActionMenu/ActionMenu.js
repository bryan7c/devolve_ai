import { useState } from "react";
import {IconButton, Menu} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

/**
 * A component that renders an action menu with a list of options
 * @param {Object} props - Component props
 * @param {string} props.devolucaoId - ID of the item to which the menu belongs
 * @param {ReactNode} props.children - List of options to be displayed in the menu
 * @returns {ReactNode} - A component that renders an action menu with a list of options
 */
function ActionMenu({ devolucaoId, children }) {
  // State that controls the visibility of the menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Boolean indicating if the menu is open or not
  const open = Boolean(anchorEl);

  // Function that sets the anchor element to the current element
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function that closes the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Return the JSX that renders the menu
  return (
    <>
      <IconButton
        aria-label="more"
        id={`long-button-${devolucaoId}`}
        aria-controls={`long-menu-${devolucaoId}`}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={`long-menu-${devolucaoId}`}
        MenuListProps={{
          "aria-labelledby": `long-button-${devolucaoId}`,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "20ch",
          },
        }}
      >
        {children}
      </Menu>
    </>
  );
}

export default ActionMenu;
