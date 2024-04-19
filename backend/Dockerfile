
# FROM  --platform=linux/amd64 python:alpine3.13
# RUN apk add --update busybox-suid
# RUN addgroup app && adduser -S -G app app
# USER app

# ENV PIP_DISABLE_PIP_VERSION_CHECK=1
# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1
# RUN pip install gunicorn

# WORKDIR /app
# COPY ./app/requirements.txt .
# RUN pip install -r requirements.txt
# COPY ./app .
# RUN python manage.py collectstatic
# ENV POSTGRES_NAME=${POSTGRES_NAME}
# ENV POSTGRES_USER=${POSTGRES_USER}
# ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
# ENV POSTGRES_HOST=${POSTGRES_HOST}
# ENV POSTGRES_PORT=${POSTGRES_PORT}
# ENV PORT=80
# EXPOSE 80

# ENV PATH="/home/app/.local/bin:${PATH}"
# # CMD gunicorn --bind :$80 office.wsgi
# CMD gunicorn --bind :${PORT} office.wsgi


FROM  --platform=linux/amd64 python:alpine3.13
RUN apk add --update busybox-suid
RUN addgroup app && adduser -S -G app app
USER app

ENV PIP_DISABLE_PIP_VERSION_CHECK=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
RUN pip install gunicorn

WORKDIR /app
COPY ./app/requirements.txt .
RUN pip install -r requirements.txt
COPY ./app .
RUN python manage.py collectstatic
ENV POSTGRES_NAME=${POSTGRES_NAME}
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_HOST=${POSTGRES_HOST}
ENV POSTGRES_PORT=${POSTGRES_PORT}
ENV PORT=3000
EXPOSE 3000

ENV PATH="/home/app/.local/bin:${PATH}"
# CMD gunicorn --bind :$80 office.wsgi
CMD gunicorn --bind :${PORT} office.wsgi
# CMD gunicorn --bind :${PORT} office.wsgi:application


