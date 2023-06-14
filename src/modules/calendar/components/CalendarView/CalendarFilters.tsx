import { FilterListOutlined } from "@mui/icons-material";
import {
  Box,
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
import { useMenu } from "common/hooks";
import { useAuth } from "modules/auth/contexts";
import useCompanyEmployees from "modules/employees/hooks/useCompanyEmployees";

const CalendarFilters = () => {
  const { closeMenu, menuEl, openMenu } = useMenu();

  const { user } = useAuth();

  const { employees } = useCompanyEmployees(user?.id);

  return (
    <>
      <IconButton onClick={(e) => openMenu(e.currentTarget)}>
        <FilterListOutlined />
      </IconButton>
      <Popper
        open={!!menuEl}
        anchorEl={menuEl}
        keepMounted={false}
        sx={{ zIndex: 5 }}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={closeMenu}>
          <Paper elevation={5}>
            <Box sx={{ p: 1 }}>
              <Typography variant="h5">Filters</Typography>
            </Box>
            <Divider />
            <List sx={{ px: 2, py: 1 }}>
              {employees?.map(({ firstName, lastName, id }) => (
                <ListItem key={id} disablePadding>
                  <FormControlLabel
                    control={<Checkbox size="small" defaultChecked />}
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

export default CalendarFilters;
