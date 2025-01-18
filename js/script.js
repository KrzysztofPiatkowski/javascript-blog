/* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  }); */
const titleClickHandler = function(event) {
  event.preventDefault();
    
  //console.log('Link was cliked!');

  //console.log(event);
    
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  const clickedElement = this.classList.add('active');
  //console.log('clickedElement:', clickedElement);
  //console.log('clickedElement (with plus):'+ clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');

  for (const activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = this.getAttribute('href');
  // const getAttribute = this.getAttribute('href').replace('#','');
  //console.log('article selector: ', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  // const foundArticle = document.querySelector(`.${getAttribute}`);
  //console.log('Found article: ', targetArticle);

  /* [DONE] add class 'active' to the correct article */
  // eslint-disable-next-line no-unused-vars
  const activeArticle = targetArticle.classList.add('active');
};
  

{ const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
  
function generateTitleLinks(customSelector = '') {
  //console.log('Function has generated new title links');

  /* remove the content of the link list in the left column */
  const titleList = document.querySelector(optTitleListSelector).innerHTML='';

  /* for each article */

  let html = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  //const articles = document.querySelectorAll(optArticleSelector);
  //console.log('Artykuły: '+articles);

  for (const article of articles) {

    /* read each article id and save it as a constant */
    const articleId = article.getAttribute('id');
    //console.log(articleId);

    /* find element with the article title and and save its content to the constant */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //console.log(articleTitle);

    /* based on these information create link HTML code and save it to the constant */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);

    /* insert the created HTML code to the link list in the left column */
      
    //console.log(titleList);
    document.querySelector(optTitleListSelector).insertAdjacentHTML('beforeend', linkHTML);
    html = html + linkHTML;
    //console.log(html);
  }
  titleList.innerHTML = html;
  //console.log(titleList);

  const links = document.querySelectorAll('.titles a');
  for (const link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();
}

const optArticleSelector = '.post',
optTitleSelector = '.post-title',
optTitleListSelector = '.titles',
optArticleTagsSelector = '.post-tags .list',
optArticleAuthorSelector = '.post-author',
optTagsListSelector = '.tags.list',
optCloudClassCount = 5,
optCloudClassPrefix = 'tag-size-',
optAuthorsListSelector = '.authors.list';

function calculateTagsParams(tags) {
  /* tagsObject = {};
  const newArray = Object.values(tags);
  let min = newArray[0];
  let max = 0;
  for (let i=1; i<newArray.length; i++) {
    if (newArray[i]<min) {
      min = newArray[i];
    } else if (newArray[i]>max) {
      max = newArray[i];
    }
  }
  tagsObject.min = min;
  tagsObject.max = max;
  return tagsObject; */

  const params = {max: 0, min: 999999};

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass (count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return `${optCloudClassPrefix}${classNumber}`;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array 
  let allTags = []; */
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (const article of articles) {

    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    //console.log(tagWrapper)

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      //console.log(tag);

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-'+tag+'">'+tag+'</a></li> ';
      //console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);

      /* [NEW] check if this link is NOT already in allTags 
      if(allTags.indexOf(linkHTML) == -1){
         [NEW] add generated code to allTags array
        allTags.push(linkHTML);
      } */
     /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
      /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.insertAdjacentHTML('beforeend', html);

  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList
  tagList.innerHTML = allTags.join(' '); */
  console.log(allTags);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    //allTagsHTML += '<li><a href="#tag-'+tag+'">'+tag+'</a></li> ' + ' (' + allTags[tag] + ') ';
    const tagLinkHTML = '<li><a href="#tag-'+tag+'" class="' + calculateTagClass(allTags[tag], tagsParams) +'">'+tag+'</a></li> ';
    console.log('tagLinkHTML:', tagLinkHTML);

    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += tagLinkHTML;

  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

}

generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clikedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clikedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  //console.log(tag);

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  //console.log(activeTagLinks);

  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {

    /* remove class active */
    activeTagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  //console.log('Taglink to : '+tagLinks);

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {

    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let allLinksToTag of allLinksToTags) {

    /* add tagClickHandler as event listener for that link */
    allLinksToTag.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){

  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (const article of articles) {

    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    //console.log(authorWrapper)

    /* make html variable with empty string */
    let html = '';

    /* get tag from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    //console.log(articleAuthor);

    /* split tags into array */
    const articleAuthorsArray = articleAuthor.split(', ');

    for (let author of articleAuthorsArray) {

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#author-'+articleAuthor+'">'+articleAuthor+'</a></li>';
      //console.log(linkHTML);

      /* add generated code to html variable */
      html = linkHTML;
      //console.log(html);

      /* [NEW] check if this link is NOT already in allTags */
      if(!allAuthors[author]) {
      /* [NEW] add tag to allTags object */
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }

    }

    /* insert HTML of all the links into the author wrapper */
    authorWrapper.insertAdjacentHTML('beforeend', html);

  /* END LOOP: for every article: */
  }
   /* [NEW] find list of tags in right column */
   const authorList = document.querySelector(optAuthorsListSelector);

   /* [NEW] add html from allTags to tagList */
   //authorList.innerHTML = allAuthors.join(' ');

    /* [NEW] create variable for all links HTML code */
    let allAuthorsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let author in allAuthors){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      //allAuthorsHTML += author + ' (' + allAuthors[author] + ') ';
      allAuthorsHTML += '<li><a href="#author-'+author+'">'+author+'</a> (' + allAuthors[author] + ') </li>';
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    authorList.innerHTML = allAuthorsHTML;

}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clikedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clikedElement.getAttribute('href');

  /* make a new constant "author" and extract articleAuthor from the "href" constant */
  const author = href.replace('#author-', '');
  //console.log(author);

  /* find all tag links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  //console.log(activeAuthorLinks);

  /* START LOOP: for each active tag link */
  for (let activeAuthorLink of activeAuthorLinks) {

    /* remove class active */
    activeAuthorLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  //console.log('Authorlink to : '+authorLinks);

  /* START LOOP: for each found tag link */
  for (let authorLink of authorLinks) {

    /* add class active */
    authorLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){

  /* find all links to authors */
  const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */
  for (let allLinksToAuthor of allLinksToAuthors) {

    /* add tagClickHandler as event listener for that link */
    allLinksToAuthor.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();