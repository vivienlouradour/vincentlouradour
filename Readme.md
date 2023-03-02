# Vincent Louradour static website

## Hand deployment

- `git clone | pull`
- `docker build -t vincentlouradour`
- if already a previous container running : 
  - `docker stop vincentlouradour_website`
  - `docker container rm vincentlouradour_website`
- `docker run --name vincentlouradour_website -t -d -p 8080:80 vincentlouradour`

## Thumbnails

Use of [thumbnail-maker](https://github.com/onildoaguiar/image-thumbnail) library to create thumbnails from pictures.  
Launch thumbnails creation : `npm run thumbnail` or `node ./thumbnail-maker/thumbnail-maker.js`. (Run `npm install` before).  
Script : `/thumbnail-maker/thumbnail-maker.js`.  
Algo : look for every picture in `/assets/images/gallery` folder, and creates a thumbnails from it (same name but add `.thumb` extension).  

## Todo

- [x] Add a picture viewer 
- [x] Add youtube link to "l'appel des grèves"
- [x] Split picture thumbs in 2 columns (one on mobile)
- [x] Change youtube thumbnail
- [x] Optimize banner video size / length
- [x] Optimize pictures size/loading
- [ ] Fix banner title display on mobile 
- [ ] Fix columns display
- [ ] add text before video
- [ ] title too big (cumul de l'oubli)
