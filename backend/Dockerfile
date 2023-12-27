FROM --platform=linux/amd64  python:alpine3.13
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

EXPOSE 8080

ENV PATH="/home/app/.local/bin:${PATH}"
# CMD gunicorn --bind :$PORT office.wsgi

