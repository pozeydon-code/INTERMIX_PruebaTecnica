import { Badge, badgeClasses, styled } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import ButtonIcon from "./ButtonIcon";
import { useDialogContext } from "../context/DialogContext";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
  }
`;

const Header = ({ cart }) => {
  const { setIsOpen } = useDialogContext();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/15 bg-background/25 backdrop-blur ">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 ">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-balance">
            Global Shop
          </h1>
        </div>

        <div
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-4"
        >
          <ButtonIcon outlined>
            <ShoppingCartIcon fontSize="small" />
            <CartBadge badgeContent={cart.length} overlap="circular" />
          </ButtonIcon>
        </div>
      </div>
    </header>
  );
};

export default Header;
