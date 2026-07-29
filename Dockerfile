# Executive Report Web Platform — internal static hosting image.
# Serves the zero-build static site with a hardened, non-root nginx.
FROM nginxinc/nginx-unprivileged:1.27-alpine

# Copy the static site (server/dev files are excluded via .dockerignore).
COPY --chown=101:101 . /usr/share/nginx/html

# Install the site's nginx config and drop the deploy folder from the web root.
USER 0
RUN cp /usr/share/nginx/html/deploy/nginx.conf /etc/nginx/conf.d/default.conf \
 && rm -rf /usr/share/nginx/html/deploy
USER 101

# Non-root nginx listens on 8080; front it with the internal reverse proxy (TLS + SSO).
EXPOSE 8080
