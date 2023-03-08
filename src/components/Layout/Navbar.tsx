import { Navbar as MantineNavbar, NavLink } from "@mantine/core";
import { Activity, Notebook, Settings } from "tabler-icons-react";

type Props = {
  opened: boolean;
};

const Navbar: React.FC<Props> = ({ opened }) => {
  return (
    <MantineNavbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <MantineNavbar.Section grow>
        <NavLink label="My researches" icon={<Notebook size="1rem" />} />
        <NavLink label="Analytics" icon={<Activity size="1rem" />} />
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <NavLink label="Account settings" icon={<Settings size="1rem" />} />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
