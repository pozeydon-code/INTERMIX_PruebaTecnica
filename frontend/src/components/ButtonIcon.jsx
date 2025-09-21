import { IconButton } from "@mui/material";

const ButtonIcon = ({ outlined = false, children, onClick }) => {
  return (
    <>
      <IconButton
        onClick={onClick}
        className={`border-1 p-1.5 rounded ${outlined ? "border-transparent" : "border-ring/30"} hover:bg-accent hover:text-white hover:border-accent transition-colors`}
      >
        {children}
      </IconButton>
    </>
  );
};

export default ButtonIcon;
