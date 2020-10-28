import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Typography,
  Toolbar,
  IconButton,
  Tooltip,
  Box,
  Hidden,
  TextField,
  Button,
} from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";
import { ITransactionData } from "../../../store/transactions/actions";
import TypeSwitch from "./TypeSwitch";
import { IFilter } from "../TransactionsView";

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    actions: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
    },
  })
);

interface ITransactionsToolbarProps {
  handleOpenDialog: (data?: ITransactionData | null) => void;
  refreshTransactions: () => void;
  filter: IFilter;
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateFilterChange: (date: Date | null) => void;
  handleResetFilter: () => void;
}
const TransactionsToolbar: React.FC<ITransactionsToolbarProps> = ({
  handleOpenDialog,
  refreshTransactions,
  filter,
  handleFilterChange,
  handleDateFilterChange,
  handleResetFilter,
}) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography variant="h6" id="tableTitle" component="div">
        Transactions
      </Typography>
      <Tooltip title="Refresh">
        <IconButton color="secondary" onClick={refreshTransactions}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
      <Box flex="1 0 auto">
        <Button
          variant="contained"
          color="secondary"
          endIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Create
        </Button>
      </Box>

      <Box className={classes.actions}>
        <Hidden smDown>
          <Box mr={2} ml={2} display="flex" alignItems="center">
            {!filter.credit ||
            !filter.debet ||
            filter.date ||
            filter.name ||
            filter.amount ? (
              <Tooltip title="Reset filter">
                <IconButton color="primary" onClick={handleResetFilter}>
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            ) : null}
            <Typography variant="body1" component="span">
              Filter
            </Typography>
          </Box>
          <Box mr={2} width={160} flex="1 0 auto">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                disableFuture
                autoOk
                name="date"
                size="small"
                inputVariant="outlined"
                label="Date"
                value={filter.date}
                onChange={handleDateFilterChange}
              />
            </MuiPickersUtilsProvider>
          </Box>
          <Box mr={2} width={140}>
            <TextField
              variant="outlined"
              size="small"
              label="Name"
              name="name"
              value={filter.name}
              onChange={handleFilterChange}
            />
          </Box>
          <Box mr={2} width={90} flex="1 0 auto">
            <TextField
              variant="outlined"
              label="Amount"
              size="small"
              name="amount"
              type="number"
              value={filter.amount}
              onChange={handleFilterChange}
            />
          </Box>
          <TypeSwitch
            type={{ debet: filter.debet, credit: filter.credit }}
            handleChange={handleFilterChange}
            row={true}
          />
        </Hidden>
      </Box>
    </Toolbar>
  );
};

export default TransactionsToolbar;