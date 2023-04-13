import { useState } from "react";
import {IconButton, Menu} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function ActionMenu({ devolucaoId, children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
