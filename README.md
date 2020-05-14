# Project4 (Solo)

## Overview
For my project 4 I decided to create a fitness tracker app which would allow you to create and log workouts to allow a user to track their progress. I chose to create this app to show my love of fitness and help everyone keep their health goals within reach.

## Brief
- Build a full-stack app
- Use django framework as a proxy
- Front-end built with React
- Back-end built with python
- Include several components 
- Include a router for the different pages
- Be deployed and accessible to the public 

## Technologies used
- JavaScript (ES6)
- React.js
- PostgreSQL
- SCSS
- HTML, JSX
- Git and GitHub
- Material UI
- Django
- Python


# Backend 

## Approach (JWT_AUTH)

JWT_AUTH is an app that was created inside the project 4 folder and it contains the user model and Django's custom authentication which would allow a user to register an account and login.

```
class User(AbstractUser):
    
  image = models.CharField(max_length=200)
  level = models.IntegerField(default=0)
 

```
The user model consisted of the image and level fields but would be populated with other fields via the user serializer
## Serializers (user)

```
class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})

        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirmation', 'muscle_trainings', 'cardios')
        extra_kwargs = {
          'muscle_trainings': {'required': False},
          'cardios': {'required': False}

        }

```

The user serializer will 'validate' the password by checking if the password matches the password confirmation, if not, it will throw an error message.
The Meta class also added the fields: 'username', 'email', 'password', 'password confirmation', 'muscle trainings' and 'cardios'. I found by adding the workouts to the user would make it easier to display them in a 'profile view' which would show all the workouts for an associated user.

## Views (user)
```
class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful'})

        return Response(serializer.errors, status=422)
```
I created a RegisterView to allow a user to create an account which would be posted to the PostgreSQL database and saved.

```
class LoginView(APIView):

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid credentials'})

        token = jwt.encode({'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}!'})

```

When the user tries to log in with the registered account the algorithim will check if the password and email is valid and it will check the JSON Web Token with the one already given to the user to see if they match.

```
class JWTAuthentication(BasicAuthentication):

    def authenticate(self, request):
        header = request.headers.get('Authorization')

        if not header:
            return None

        if not header.startswith('Bearer'):
            raise PermissionDenied({'message': 'Invalid Authorization header'})

        token = header.replace('Bearer ', '')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied({'message': 'Invalid token'})
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'No such subject'})

        return (user, token)
```
This JWTAuthentication function is used to check if the Authorization header is valid and return the token and user.

```
class ProfileView(APIView):
  
  permission_classes = (IsAuthenticated,)
  def get(self, request):
    user = User.objects.get(pk=request.user.id)
    serialized_user = PopulateUserSerializer(user)
    return Response(serialized_user.data)
  

```

The last step for the JWT_AUTH app was to create a ProfileView to display the user and the associated workouts.

## Approach (Workouts)

Workouts is an app that was created inside the project 4 folder to handle the models, views, serializers etc. for the workouts specifically.

## Models
```
class MuscleTraining(models.Model):
  name = models.CharField(max_length=50)
  muscles_worked = models.CharField(max_length=100)
  weight = models.IntegerField()
  duration = models.IntegerField(null=True)
  sets = models.IntegerField()
  reps = models.IntegerField()
  speed = models.IntegerField(null=True)
  user = models.ForeignKey(User, related_name='muscle_trainings', on_delete=models.CASCADE)

  def __str__(self):
    return f'{self.name}'

class Cardio(models.Model):
  type = models.CharField(max_length=50)
  duration = models.IntegerField()
  distance = models.IntegerField()
  speed = models.FloatField(null=True)
  user = models.ForeignKey(User, related_name='cardios', on_delete=models.CASCADE)
  def __str__(self):
    return f'{self.type}'

```

I created 2 models to separate muscle training and cardio workouts. This would prove useful later on as they contain some different fields. On the cardio model I created the fields that needed to be displayed on the Front-end such as type, duration and distance. The speed field is empty because the calculation is done on the post request on the Front.

## Serializers (Workouts)

```
class MuscleTrainingSerializer(serializers.ModelSerializer):
  class Meta:
    fields = ('id', 'name','muscles_worked', 'weight','duration', 'sets', 'reps', 'user')
    model = MuscleTraining

class CardioSerializer(serializers.ModelSerializer):
  class Meta:
    fields = ('id', 'type', 'duration', 'distance', 'user', 'speed')
    model = Cardio
```
These 2 serializers add the fields that were on the model so that they are visible from the Django Rest Framework.

## Views (Workouts)
```
class ListViewCardio(APIView): 
    permission_classes = (IsAuthenticated, )
    def post(self, request):
        request.data['user'] = request.user.id
        cardio = CardioSerializer(data=request.data)
        if cardio.is_valid():
            cardio.save()
            return Response(cardio.data, status=HTTP_201_CREATED)
        return Response(cardio.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class DetailViewCardio(RetrieveUpdateDestroyAPIView): 
  serializer_class = CardioSerializer
  queryset = Cardio.objects.all()
```

I created a ListView to be able to post workouts to the API with a user. I used a generic view from the Django Rest Framework to add the end points such as get post delete etc. for an individual cardio or muscle workout.


## Approach (Front-end)

For the Front-end, an app was created called 'frontend' which would handle the web design, the API calls and the displaying of the users workouts.

## Register and Login

```
class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        email: '',
        password: ''
      },
      error: ''

    }
  }

  handleChange(event) {
    const { name, value } = event.target
    const data = { ...this.state.data, [name]: value }
    this.setState({ data: data })
  }

  handleSubmit(event) {
    event.preventDefault()

    axios.post('/api/login',
      this.state.data, { headers: { 'Authorization': '' } })
      .then(res => {
        console.log(res)
        const token = res.data.token
        auth.setToken(token)
        this.props.history.push('/workouts')
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  render() {
    // const { error } = this.state
    return <>
      <SignInSide
        handleChange={(event) => this.handleChange(event)}
        handleSubmit={(event) => this.handleSubmit(event)}
        error={this.state.error}
      />
      {console.log('first error:' , this.state.error)}
    </>
  }


}
class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      data: {
        email: '',
        username: '',
        password: '',
        password_confirmation: ''
      },
      errors: {}
    }
  }

  handleChange(event) {
    console.log(event)
    const { name, value } = event.target
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
    console.log(this.state.data)
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state.data)
    axios.post('/api/register',
      this.state.data, { headers: { 'Authorization': '' } })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data }))
    // console.log('err:', err.response.data))


  }

  render() {
    return <>
      <SignUp
        {...this.state.errors}
        handleChange={(event) => this.handleChange(event)}
        handleSubmit={(event) => this.handleSubmit(event)} />
      {console.log('errors:', this.state.errors)}
    </>
  }

}
```
The Register and Login were both class components which allowed the use of this.state and a post request using axios. The handle change function would spread the state into a new object and overwrite the fields with the information that the user has written in the form.

The Register forms handle submit function would post the 'data' to the database with the Authorization header and new bearer token associated with the new user.

The Login function would do essentially the same as register but would only post the email and password to a different endpoint and they would be validated on the Back-end to check the users bearer token, authorization header etc.

## Displaying the workouts 

```
class Workouts extends React.Component {

  constructor() {
    super()
    this.state = {
      workouts: {
        muscle_trainings: [],
        cardios: []
      },
      errors: {}
    }

  }

  componentDidMount() {
    axios.get('/api/profile', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then((res) => this.setState({ workouts: res.data }))
    // .catch(err => this.setState({ errors: err.response.data.errors }))
  }


  render() {
    const { workouts } = this.state
    console.log('workouts', this.state.workouts)

    return <>
    <Dashboard {...this.state.workouts}/>
    </>

  }


}
```

To display the workouts i used material UI. The dashboard template gave me everything i needed such as a NavBar and space to display information.

## Adding a workout

A user is able to add a muscle training or cardio workout via a built in form.

Adding a workout will be similar to the Register component as the data will be posted to the API and displayed on the front end via an axios request.

Once the workout has been posted it will save to the specific user logged in if the fields are entered correctly.

```
handleSubmit(event) {
    event.preventDefault()
    const dataToPost = this.state.data
    const speed = Number(dataToPost.duration) / Number(dataToPost.distance)
    dataToPost.speed = speed
    axios.post('/api/workouts/cardio/',
      dataToPost,
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => this.props.history.push('/workouts'))
      .catch(err => this.setState({ error: err.response.data.errors }))
    console.log(dataToPost)
  }
```  

The speed was calculated in the handleSubmit function and displayed on a graph on the home page.

```
const dataCardio =
    cardios.map((cardio) => {
      return { speed: cardio.speed, pv: 2400, amt: 2400 }
    })
    
const renderLineChartCardio = (
    <LineChart width={400} height={200} data={dataCardio} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="speed" stroke="#ff0000" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  )
```

I used a React Library called 'Rechart' which required the data to be provided to the graph in object form. This meant that I had to map over the data to produce new objects with the speed to be displayed as a value on the graph.

## Lessons Learned

My use of time management was my biggest downfall as I underestimated how long the Back-end would take and how complicated the models and relationships were.

The lesson I learnt from this is in the future to properly map out exactly how I want my models to be with all the relationships to other models before starting and to not assume things will work as you want them to first time round!

I'm glad i chose to do this project solo as this was a massive learning curve for me and really made me realise what my strengths and weaknesses are when designing an app.

## Big Wins

The biggest win I had whilst making this app is how smoothly the Front-end went with no major bugs in functionality.

## Future Features

There are definitely some future feature that i could implement which would improve app such as a 'map my run' section which would allow users to map out their running journey and look at other users running routes for inspiration.
