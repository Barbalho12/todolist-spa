import React from 'react';

import API from '../../API'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import ClearIcon from '@material-ui/icons/Clear';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import DoneAllIcon from '@material-ui/icons/DoneAll';

import TextField from '@material-ui/core/TextField';
import { Container } from './styles';

import Card from '@material-ui/core/Card';


// import Websocket from 'react-websocket';
import SockJsClient from 'react-stomp';


const useStyles = makeStyles((theme) => ({

  list:{
    maxHeight: 300, 
    overflow: 'auto',
    width: '100%',
    maxWidth: 360,
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    padding:'10px'
  },
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

let starting  = true;

function CheckboxList() {
  const classes = useStyles();
  const [name,setName] = React.useState();
  const [optionPage, setOptionPage] = React.useState(0);
  const [listItens, setListItens] = React.useState([]);
  const [clientRef, setClientRef] = React.useState([]);

  let tempOptionPage = 0;

  function update(){
    if(tempOptionPage === 0){
      API.findAll().then(response => {
        response.json().then( list => {
          setListItens(list);
        });
      });
    } else if(tempOptionPage === 1){
      API.findAllLefts().then(response => {
        response.json().then( list => {
          setListItens(list);
        });
      });
    } else if(tempOptionPage === 2){
      API.findAllCompleteds().then(response => {
        response.json().then( list => {
          setListItens(list);
        });
      });
    }
  }

  if(starting){
    update();
    setName("");
    starting = false;
  }

  const handleToggle = (task) => () => {
    task.completed = !task.completed;
    API.setCompleted(task.id, task.completed).then(response => {
      update();
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    API.create(name).then( response => {
      setName('');
      update();
    });
  }

  const buttomNavigationChange = (event, newValue) => {
    setOptionPage(newValue);
    tempOptionPage = newValue;
    update();
  }

  

  const deleteTask = (id) => {
    API.delete(id).then( response => {
      update();
    });
  }

  return (
    <div>
      <form className={classes.inputtext} onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField id="standard-basic" value={name} label="Nova tarefa" onChange={ (e) => { setName(e.target.value)} } className={classes.inputtext} />
        <Button variant="contained" onClick={handleSubmit} color="primary" className={classes.button}>ADICIONAR</Button>
      </form>


     
        <List className={classes.list}>
          {listItens.map((task) => {
            return (
              <ListItem key={`checkbox-list-${task.id}`} role={undefined} dense button onClick={handleToggle(task)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={task.completed}
                    tabIndex={task.id}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText id={`checkbox-description-${task.id}`} primary={task.description} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" color="secondary" aria-label="clear" onClick={() => { {deleteTask(task.id)} }} >
                    <ClearIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
     


      <BottomNavigation
        value={optionPage}
        onChange={buttomNavigationChange} 
        showLabels className={classes.root}>
        <BottomNavigationAction label="Todas"  value={0} icon={<FormatListBulletedIcon />} />
        <BottomNavigationAction label="Pendentes" value={1}  icon={<QueryBuilderIcon />} />
        <BottomNavigationAction label="Concluídas" value={2}  icon={<DoneAllIcon />} />
      </BottomNavigation>
      <SockJsClient url={API.webSocketURL} topics={['/topic/tasks']}
            onMessage={(msg) => { update(); }}
            ref={ (client) => { setClientRef(client) }} />
      </div>
  );
}

function Main() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <h1 className={classes.title}>TODO List</h1>
      <Card className={classes.root}>
        <CheckboxList/>
      </Card>
    </Container>
  );
}

export default Main;