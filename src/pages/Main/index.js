import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import DeleteIcon from '@material-ui/icons/Delete';

import ClearIcon from '@material-ui/icons/Clear';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import DoneAllIcon from '@material-ui/icons/DoneAll';



import TextField from '@material-ui/core/TextField';

import { Container, Title } from './styles';
import { findByLabelText } from '@testing-library/react';

import Card from '@material-ui/core/Card';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     // backgroundColor: theme.palette.background.paper,
//   },
// }));

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    padding:'10px'
  },
  
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
    
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button:{
    margin: "10px",
    width:"90%"
  },
  inputtext: {
    margin: "10px",
    width: "90%"
  },
  container: {
    flexDirection: 'column',

  },
  title: {
    margin:"20px",
    color: theme.palette.primary.main,
  }
}));

function CheckboxList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="clear">
                <ClearIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Todas" icon={<FormatListBulletedIcon />} />
      <BottomNavigationAction label="Pendentes" icon={<QueryBuilderIcon />} />
      <BottomNavigationAction label="Concluídas" icon={<DoneAllIcon />} />
    </BottomNavigation>
  );
}

function ActionButton() {
  const classes = useStyles();
  return (
    <Button variant="contained" color="primary" className={classes.button}>ADICIONAR</Button>
  );
}

function BasicTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.inputtext} noValidate autoComplete="off">
      <TextField id="standard-basic" label="Nova tarefa" className={classes.inputtext}/>
    </form>
  );
}

function Main() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  
  return (
    <Container className={classes.container}>
      <h1 class={classes.title}>TODO List</h1>
      <Card className={classes.root}>
        <BasicTextFields/>
        <ActionButton/>
        <CheckboxList/>
        <SimpleBottomNavigation/>
      </Card>
    </Container>
  );
}

export default Main;