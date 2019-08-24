import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as firebase from 'firebase'
import { async } from 'q';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        BenneGopalKrishna AppDev
      </Link>{' '}
      {new Date().getFullYear()}
      {'. Built with '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function SignIn() {
  const classes = useStyles();
  let emailField = React.createRef();
  let passwordField = React.createRef();

  function fetchConfig(){
      let p = new Promise((resolve,reject)=>{
                var oReq = new XMLHttpRequest();
                oReq.addEventListener("load", function(){
                  let responseJSON = JSON.parse(this.responseText);
                  resolve(responseJSON["FIRESTORE_KEY"]);
                });
                oReq.open("GET", "https://bgkconfig.herokuapp.com/config",true);
                oReq.send();
      })
      return p;
  }

  async function initializeFireBaseApp(){
    const key = await fetchConfig();
    const app = firebase.initializeApp({
        apiKey : key,
        authDomain: "bennegopalkrishnatmplproj.firebaseapp.com",
    })
    return app;
}
  let app_auth_controller;
  initializeFireBaseApp().then(app=>{
    app_auth_controller = firebase.auth(app);
  });
  const onSubmitForm = () =>{
    let email = emailField.current.value;
    let password = passwordField.current.value;
    app_auth_controller.signInWithEmailAndPassword(email,password).then((cred)=>{
            window.location.href = `/home?uname=${cred.user.email}`
    }).catch((err)=>{
        var errorCode = err.code;
        var errorMessage = err.message;
        if (errorCode === 'auth/wrong-password') {
        console.log('Wrong password.');
        } else {
        console.log(errorMessage);
        }
        console.log(err);
    })
    
    //window.location.href = "/home";
}
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailField}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordField}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmitForm}
          >
              Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}