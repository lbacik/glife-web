FROM dunglas/frankenphp:1-php8.5-bookworm

ENV SERVER_NAME=:80 \
    SERVER_ROOT=public/

RUN apt-get -y update && apt-get install -y \
    curl git zip unzip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . /opt/app
WORKDIR /opt/app

RUN composer install --no-interaction --optimize-autoloader \
    && ./bin/console tailwind:build \
    && ./bin/console asset-map:compile \
    && chown -R www-data:www-data /opt/app/var
