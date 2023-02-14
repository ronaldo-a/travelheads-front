import { createApi } from "unsplash-js";
import backgroundImg from "../assets/imgs/dino-reichmuth-unsplash.jpg"

async function getRandomPhoto() {
    const api = createApi({
		// See https://unsplash.com/developers
		accessKey: "2ZTZ_z2svGJhW8-r9mGPsLPTexBAopttIprp19HsjUU"
	  });

      try {
        const photo = await api.photos.getRandom({ query: "travel", orientation: "landscape" });
        const photoUrl = photo.response.urls.raw;
        const photoAuthorName = photo.response.user.name;
        const photoAuthorLink = photo.response.user.links.html; 
        api.photos.trackDownload({downloadLocation: photo.response.links.download_location});
        return { photoUrl, photoAuthorName, photoAuthorLink };
    } catch (error) {
        const photoUrl = backgroundImg;
        const photoAuthorName = "Dino Reichmuth";
        const photoAuthorLink = "https://unsplash.com/@dinoreichmuth"
        return { photoUrl, photoAuthorName, photoAuthorLink };
    }
}

export { getRandomPhoto };