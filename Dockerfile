FROM nginx:alpine

# Copy sources and sitemap for google SEO
COPY src/ sitemap.xml /usr/share/nginx/html