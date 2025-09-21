import { Dialog } from "@mui/material";

const ErrorModal = ({ isOpen, onClose, error }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-destructive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">¡Fuera de Servicio!</h3>
        <p className="text-muted-foreground">
          El servicio esta fuera de linea intentelo mas tarde
        </p>

        <p>{String(error)}</p>
      </div>
    </Dialog>
  );
};

export default ErrorModal;
