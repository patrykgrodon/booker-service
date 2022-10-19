import { Badge, IconButton, IconButtonProps, Tooltip } from "@mui/material";
import Spinner from "../Spinner/Spinner";
import useStyles from "./styles";

type Props = IconButtonProps & {
  icon: React.ElementType;
  tooltip: string;
  isLoading?: boolean;
  enabled?: boolean;
  disableTooltipMargin?: boolean;
  withBadge?: boolean;
};

const ActionIconButton = ({
  icon: Icon,
  isLoading = false,
  enabled = false,
  tooltip,
  disableTooltipMargin = false,
  withBadge = false,
  ...props
}: Props) => {
  const classes = useStyles();
  if (isLoading) {
    return (
      <IconButton
        {...props}
        className={classes.container}
        disabled
        aria-label={tooltip}
        size="large">
        <Spinner className={classes.spinner} size="small" button />
      </IconButton>
    );
  }
  return (
    <Tooltip
      title={tooltip}
      className={disableTooltipMargin ? "" : classes.tooltip}>
      <span>
        <IconButton
          aria-label={tooltip}
          disabled={!enabled}
          {...props}
          className={classes.container}
          size="large">
          {withBadge && (
            <Badge
              color="info"
              classes={{ colorInfo: classes.colorInfo }}
              variant="dot"
              data-testid="badge">
              <Icon fontSize="small" />
            </Badge>
          )}
          {!withBadge && <Icon fontSize="small" />}
        </IconButton>
      </span>
    </Tooltip>
  );
};
export default ActionIconButton;
