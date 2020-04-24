import React, { useState } from 'react'
import { Link } from 'react-router-dom'


import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
// import Link from '@material-ui/core/Link'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
// import NotificationsIcon from '@material-ui/icons/Notifications'

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
// import { mainListItems, secondaryListItems } from './listItems'
// import Chart from './Chart'
// import Deposits from './Deposits'
// import Orders from './Orders'

// let counter = 0
// let counterMuscle = 0

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" >
//         Toms Fitness
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   )
// }



const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
}))

const Dashboard = ({ muscle_trainings, cardios }) => {
  
  const mappedCardios = cardios.map((cardio) => {
    return cardio.user
  })
  console.log('user:', mappedCardios)

  // const [cardioCounter, setCardio] = useState(0)
  // const [muscleCounter, setMuscle] = useState(0)

  const dataCardio =
    cardios.map((cardio) => {
      return { speed: cardio.speed, pv: 2400, amt: 2400 }
      // { name: 'Page B', uv: 100, pv: 2400, amt: 2400 },
      // { name: 'Page A', uv: 300, pv: 2400, amt: 2400 }
    })
  // { name: 'Page A', uv: 200, pv: 2400, amt: 2400 },
  // { name: 'Page B', uv: 100, pv: 2400, amt: 2400 },
  // { name: 'Page A', uv: 300, pv: 2400, amt: 2400 }
  const dataMuscle =
    muscle_trainings.map((muscle) => {
      return { name: muscle.name, weight: muscle.weight, pv: 2400, amt: 2400 }
      // { name: 'Page B', uv: 100, pv: 2400, amt: 2400 },
      // { name: 'Page A', uv: 300, pv: 2400, amt: 2400 }
    })



  console.log('data:', dataMuscle)

  const renderLineChartCardio = (
    <LineChart width={400} height={200} data={dataCardio} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="speed" stroke="#ff0000" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  )
  const renderLineChartMuscle = (
    <LineChart width={400} height={200} data={dataMuscle} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="weight" stroke="#ff0000" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  )


  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  console.log('cardio:', cardios)
  return (

    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Workouts
          </Typography>
          <IconButton color="inherit">
            {/* <Badge badgeContent={4} color="secondary"> */}
            {/* <NotificationsIcon /> */}
            {/* </Badge> */}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        { open ? <List className="list-item">
          <Link to="/cardio/new">
            Log a cardio workout
          </Link>
        </List> : null}
        <Divider />
        { open ? <List className="list-item">
          <Link to="/muscle_training/new">
            Log a muscle training workout
          </Link>
        </List> : null}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                Speed (min/km)
                {renderLineChartCardio}
                {/* <Chart /> */}
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                Weight (kg)
                {renderLineChartMuscle}
                {/* <Chart /> */}
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            {/* <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid> */}
            {/* Recent Orders */}
            <Grid item xs={12} className="bottom-grid">
              <Paper className={classes.paper}>
                <div className="headers">
                  {/* <h2>Workout type: </h2>
                  <h2>Duration: </h2>
                  <h2>Distance: </h2> */}
                </div>
                {/* <div> */}
                <div className="workout-container">
                  <div className="container">
                    {/* <div className="columns is-multiline"> */}
                    <h3 className="workout-title">Cardio:</h3>
                    {cardios.map((workout, key) => {
                      return <div key={key} className="column">
                        <div className="card">
                          <header className="card-header">
                            <p className="card-header-title">
                              {/* {workout.type} */}
                              {/* <h3 className="subtitle"> */}
                                Workout {key + 1}
                              {/* </h3> */}
                            </p>
                            <div className="cardio-icon">
                              <a href="#" className="card-header-icon">
                                {/* <span className="icon"> */}

                                {/* </span> */}
                              </a>
                            </div>
                          </header>
                          <div className="card-content">
                            <div className="content">

                              {/* <div className="workout-subtitles">
                                <p className="table"> Type </p>
                                <p className="table"> Duration </p>
                                <p className="table"> Distance </p>
                                <p className="table"> Speed </p>
                              </div>
                              <div className="workout-subtitles2">
                                <p>{workout.type}</p>
                                <p>{workout.duration}</p>
                                <p>{workout.distance}</p>
                                <p>{workout.speed}</p>
                              </div> */}
                              <p>-Type: {workout.type}</p>
                              <p>-Duration: {workout.duration} mins</p>
                              <p>-Distance: {workout.distance} km</p>
                              <p>-Speed: {workout.speed} min/km</p>
                            </div>
                          </div>
                        </div>
                      </div>



                    })}
                    {/* </div> */}
                  </div>
                  <div className="container">
                    <h3 className="workout-title">Muscle Training:</h3>
                    {muscle_trainings.map((workoutMuscle, key) => {
                      return <div key={key} className="column ">
                        <div className="card">
                          <header className="card-header">
                            <p className="card-header-title">
                              {/* {workoutMuscle.name} */}
                              {/* <h3 className="subtitle"> */}
                                Workout {key + 1}
                              {/* </h3> */}
                            </p>
                            <div className="dumbbell-icon">
                              <a href="#" className="card-header-icon">
                                {/* <span className="icon"> */}

                                {/* </span> */}
                              </a>
                            </div>
                          </header>
                          <div className="card-content">
                            <div className="content">

                              <p>-{workoutMuscle.name}</p>
                              <p>-Muscles Worked: {workoutMuscle.muscles_worked}</p>
                              <p>-weight: {workoutMuscle.weight} kg</p>
                              {/* <p>-Duration: {workoutMuscle.duration} mins</p> */}
                              <p>-{workoutMuscle.sets} sets</p>
                              <p>-{workoutMuscle.reps} reps/set</p>
                            </div>
                          </div>
                        </div>
                      </div>




                    })}
                  </div>
                </div>
                {/* </div> */}

              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            {/* <Copyright /> */}
          </Box>
        </Container>
      </main>
    </div>
  )
}

export default Dashboard