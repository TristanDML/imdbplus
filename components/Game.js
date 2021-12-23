import React, { useState } from "react"
import SbEditable from "storyblok-react"
import { render } from "storyblok-rich-text-react-renderer"
import styles from "../styles/Game.module.scss"
import { getData } from "../utils/storyblok"
import RelatedItemGallerySmall from "./RelatedItemGallerySmall"
import RelatedItemGallery from "./RelatedItemGallery"
import InPageSlideshow from "./InPageSlideshow"
import SmallCardList from "./SmallCardList"
import { resolveHref } from "next/dist/next-server/lib/router/router"
import BigCardList from "./BigCardList"

// const resolveDirectors = {
//   en: 'Directors',
//   nl: 'Regisseurs',
// }

// const resolveWriters = {
//   en: 'Writers',
//   nl: 'Schrijvers',
// }

// const resolveStars = {
//   en: 'Stars',
//   nl: 'Sterren',
// }

// const resolveMerchandise = {
//   en: 'Merchandise',
//   nl: 'Producten',
// }

// const resolveNews = {
//   en: 'News',
//   nl: 'Nieuws',
// }
const resolveCharacters = {
  en: 'Characters',
  nl: 'Personage',
}


const Game = ({ data, level }) => {
  var locale = 'en';
  //enriching data
  if (level === 'data') {
    locale = data.story.lang;
    var content = data.story.content;
    var platforms = data.rels.filter(obj => {
      return content.platform.includes(obj.uuid);
    });
    // var directors = data.rels.filter(obj => {
    //   return content.directors.includes(obj.uuid);
    // });
    // var stars = data.rels.filter(obj => {
    //   return content.stars.includes(obj.uuid);
    // });
    // var writers = data.rels.filter(obj => {
    //   return content.writers.includes(obj.uuid);
    // })
    // var studios = data.rels.filter(obj => {
    //   return content.studios.includes(obj.uuid);
    // })
    if (content.character){
      var characters=data.rels.filter(obj => {
        return content.character.includes(obj.uuid);
    })
    

  } else {
    var content = data;

  }
  var pictures = content.pictures;
  // const [products, setProducts] = useState([]);
  // getData(data.story.uuid, locale, content.preview = false, 'product', 'game').then(
  //   function (result) {
  //     setProducts(result.data.stories);
  //   });

  // const [newsitems, setNewsitems] = useState([]);
  // getData(data.story.uuid, locale, content.preview = false, 'newsitem', 'game').then(
  //   function (result) {
  //     setNewsitems(result.data.stories);
  //   });


  //returning the HTML
  return (
    <SbEditable content={content} key={content._uid}>
      <main>
        {/* <div className={[styles.movie, styles.test].join(' ')}> */}
        <div className={styles.game}>
          <h1 className={styles.title}>
            {content.title}
          </h1>
          <div className={styles.imagegallery}>
            <InPageSlideshow pictures={pictures}></InPageSlideshow>
          </div>  
          <div className={styles.Summary}>
            {render(content.Summary)}
          </div>
          {/* <div className={styles.links}>
              <a href={""}>VISIT</a>
            </div> */}
           <div className={styles.navlink}>
              <a href={"styles.links"} >LINK</a>
            </div> 
          <div className={styles.mainpicture} style={{ backgroundImage: `url("${content.mainpicture.filename}")` }}>
          </div>
          {/* <div className={styles.immagegalery}>
          <div className={styles.picture} style={{ backgroundImage: `url("${content.pictures.filename}")` }}>
          </div>
        </div> */}
        <div className={styles.game}>
        {characters && characters.length > 0 && <SmallCardList items={characters} title={resolveCharacters[locale]} type='character'></SmallCardList>}
        </div>
        </div>
        <div className={styles.platforms}>
                {platforms && platforms.length > 0 && <BigCardList items={platforms} title={resolveCharacters[locale]} type='platform'></BigCardList>}
                  </div>
      </main>
    </SbEditable>
  )
}
}

export default Game
