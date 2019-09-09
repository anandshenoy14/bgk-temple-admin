import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));
export default function DataTable(props) {
  const classes = useStyles();
  const rows = props.records ;
  const columnHeaders = ["First_Name","Surname","City"];
  return (
    <Paper className={classes.root}>
      <Table className={classes.table + ' myTable'}>
        <TableHead>
          <TableRow>
                      {columnHeaders.map(header => (
                          <TableCell align="right">
                              {header}
                          </TableCell>
                      ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
                {columnHeaders.map(header =>(
                    <TableCell align="right">{row[header]}</TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
