# -

## Setup
You can setup the application with just one command.

```shell
make setup
```

This should build the backend docker image, install all the frontend
dependencies using pnpm and build the frontend app.


## Development
To run the application there are two separate commands, one for the backend
and one for the frontend.

```shell
# Run the backend with all its dependencies like databases and such
make run-backend
```

```shell
# Run the frontend using the local development server
make run-frontend
```


# Other utilities
For other helpful commands, please refer to the help command
from the [Makefile][makefile].

```shell
make help
```


[makefile]: https://github.com/lvieirajr/django-react-template/blob/master/Makefile
