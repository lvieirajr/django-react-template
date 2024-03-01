# DjangoReactTemplate


## Setup
You can setup the application with just one command.

```shell
make setup
```

This should build both the backend and frontend docker images and setup
all the databases and other parts of the app.


## Development
To run the application there are two separate commands, one for the backend
and one for the frontend.

```shell
# Starts the backend in development mode with all its dependencies 
# like databases and such
make start-backend
```

```shell
# Starts the frontend with hot reloading enabled
make start-frontend
```


# Help
For other helpful commands, please refer to the help command
from the [Makefile][makefile].

```shell
make help
```


[makefile]: https://github.com/lvieirajr/django-react-template/blob/master/Makefile
