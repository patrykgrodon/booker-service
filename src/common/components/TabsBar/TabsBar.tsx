import { Tabs, Tab as MuiTab, Paper } from "@mui/material";
import useStyles from "./styles";

export interface Tab {
  label: string;
  Icon?: any;
  to?: string | undefined;
  component?: any;
}

interface TabsBarProps {
  activeTab: number;
  handleChangeTab: (newValue: number) => void;
  ariaLabel: string;
  tabs: Tab[];
}

const TabsBar = ({
  activeTab,
  handleChangeTab,
  tabs,
  ariaLabel,
}: TabsBarProps) => {
  const classes = useStyles();
  const changeTab = (_: any, newValue: any) => handleChangeTab(newValue);
  return (
    <Paper square variant="outlined" className={classes.main}>
      <Tabs
        aria-label={ariaLabel}
        variant="scrollable"
        scrollButtons="auto"
        value={activeTab}
        classes={{ indicator: classes.indicator }}
        onChange={changeTab}>
        {tabs.map(({ label, Icon, to, component }) => (
          <MuiTab
            key={label}
            component={component}
            to={to}
            label={label}
            icon={Icon && <Icon className={classes.icon} />}
            className={classes.tab}
            classes={{ selected: classes.selected }}
          />
        ))}
      </Tabs>
    </Paper>
  );
};
export default TabsBar;
