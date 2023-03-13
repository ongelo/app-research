import { Button, Group, Modal } from "@mantine/core";

type Props = {
  onConfirm: () => void;
  onClose: () => void;
};

const ModalResetConfirmation: React.FC<Props> = ({ onConfirm, onClose }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  return (
    <Modal
      opened
      title="Are you sure you want to discard your changes?"
      centered
      onClose={onClose}
    >
      <Group>
        <Button onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="red">
          Confirm
        </Button>
      </Group>
    </Modal>
  );
};

export default ModalResetConfirmation;
