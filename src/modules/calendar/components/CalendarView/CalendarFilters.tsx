import { FilterListOutlined } from "@mui/icons-material";
import {
  Badge,
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
import { useEffect } from "react";

import { lsNames } from "common/constants/webStorageItems";
import { useMenu } from "common/hooks";
import { getLSItem } from "common/utils/webStorage";
import { useAuth } from "modules/auth/contexts";
import useCompanyEmployees from "modules/employees/hooks/useCompanyEmployees";
import { CalendarColorDot } from "..";

type CalendarFiltersProps = {
  checkedEmployees: string[];
  changeCheckedEmployees: (newCheckedUsers: string[]) => void;
};

const CalendarFilters = ({
  changeCheckedEmployees,
  checkedEmployees,
}: CalendarFiltersProps) => {
  const { closeMenu, menuEl, openMenu } = useMenu();

  const { user } = useAuth();

  const { employees } = useCompanyEmployees(user?.id);

  const handleChangeCheckedEmployees = (id: string, checked: boolean) => {
    // Remove non exist users
    const existsEmployees = checkedEmployees.filter(
      (employeeId) =>
        !!employees?.find((employee) => employee.id === employeeId)
    );
    const newCheckedEmployees = checked
      ? [id, ...existsEmployees]
      : existsEmployees.filter((userId) => userId !== id);
    changeCheckedEmployees(newCheckedEmployees);
  };

  // This useEffect set all users as checked when no saved state in local storage(probably, first calendar load), also check if all users exists
  useEffect(() => {
    if (!employees) return;
    const lsCheckedEmployees = getLSItem<string[]>(
      lsNames.calendar.checkedEmployees
    );
    if (lsCheckedEmployees) {
      const withoutRemovedEmployees = lsCheckedEmployees.filter(
        (employeeId) => !!employees.find(({ id }) => id === employeeId)
      );
      if (withoutRemovedEmployees.length === lsCheckedEmployees.length) return;
      changeCheckedEmployees(withoutRemovedEmployees);
    } else {
      changeCheckedEmployees(employees.map(({ id }) => id));
    }
  }, [employees, changeCheckedEmployees]);

  return (
    <>
      <IconButton onClick={(e) => openMenu(e.currentTarget)}>
        <Badge badgeContent={checkedEmployees.length} color="primary">
          <FilterListOutlined />
        </Badge>
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
              {employees?.map(({ firstName, lastName, id, calendarColor }) => (
                <ListItem key={id} disablePadding>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={checkedEmployees.includes(id)}
                        onChange={(_, checked) => {
                          handleChangeCheckedEmployees(id, checked);
                        }}
                      />
                    }
                    label={`${firstName} ${lastName}`}
                  />
                  <CalendarColorDot color={calendarColor} sx={{ ml: "auto" }} />
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
