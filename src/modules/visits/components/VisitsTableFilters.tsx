import {
  Badge,
  Checkbox,
  ClickAwayListener,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Paper,
  Popper,
  Typography,
} from "@mui/material";

import { FilterListOutlined } from "@mui/icons-material";
import { useMenu } from "common/hooks";
import { useAuth } from "modules/auth/contexts";
import useCompanyEmployees from "modules/employees/hooks/useCompanyEmployees";
import { ChangeVisitsFilters, VisitsFilters } from "../hooks/useVisitsFilters";

type Props = {
  filters: VisitsFilters;
  changeFilters: ChangeVisitsFilters;
};

const VisitsTableFilters = ({ filters, changeFilters }: Props) => {
  const { menuEl, openMenu, closeMenu } = useMenu();
  const { user } = useAuth();

  const { employees } = useCompanyEmployees(user?.id);

  return (
    <>
      <IconButton
        sx={{ position: "absolute", top: 4, right: 4 }}
        onClick={(e) => openMenu(e.currentTarget)}
      >
        <Badge
          badgeContent={
            Object.values(filters.employees).filter((val) => val).length
          }
          color="primary"
        >
          <FilterListOutlined />
        </Badge>
      </IconButton>
      <Popper
        open={!!menuEl}
        anchorEl={menuEl}
        keepMounted={false}
        placement="bottom-start"
        sx={{ zIndex: 5 }}
      >
        <ClickAwayListener onClickAway={closeMenu}>
          <Paper elevation={5}>
            <Typography variant="h5" sx={{ px: 2, pt: 1, pb: 0.5 }}>
              Employees
            </Typography>
            <Divider />
            <List sx={{ px: 2, py: 1 }}>
              {employees?.map(({ firstName, lastName, id }) => (
                <ListItem key={id} disablePadding>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={!!filters.employees[id]}
                        onChange={(_, checked) => {
                          changeFilters("employees", id, checked);
                        }}
                      />
                    }
                    label={`${firstName} ${lastName}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default VisitsTableFilters;
