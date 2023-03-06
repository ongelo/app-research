import { Anchor, Notification } from "@mantine/core";
import Link from "next/link";
import { Check } from "tabler-icons-react";

type Props = {
  onClose: () => void;
};

const AlertSuccess: React.FC<Props> = ({ onClose }) => {
  return (
    <Notification
      icon={<Check size="1rem" />}
      title="Success!"
      color="teal"
      mb="lg"
      onClose={onClose}
    >
      Your research form has been saved. See{" "}
      <Link href="research/preview" legacyBehavior>
        <Anchor>preview</Anchor>
      </Link>
      .
    </Notification>
  );
};

export default AlertSuccess;
