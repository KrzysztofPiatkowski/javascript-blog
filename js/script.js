/* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  }); */


  const titleClickHandler = function(event) {
    event.preventDefault();
    
    console.log('Link was cliked!');

    console.log(event);
    
  /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

  /* [DONE] add class 'active' to the clicked link */
    const clickedElement = this.classList.add('active');
    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus):'+ clickedElement);

  /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');

    for (const activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

  /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = this.getAttribute('href')
    // const getAttribute = this.getAttribute('href').replace('#','');
    console.log('article selector: ', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    // const foundArticle = document.querySelector(`.${getAttribute}`);
    console.log('Found article: ', targetArticle);

  /* [DONE] add class 'active' to the correct article */
    const activeArticle = targetArticle.classList.add('active');
  }
  

{ const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
  
  function generateTitleLinks() {
  console.log('Function has generated new title links');

  /* remove the content of the link list in the left column */
    const titleList = document.querySelector(optTitleListSelector).innerHTML='';

  /* for each article */

    let html = '';
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);

    for (const article of articles) {

      /* read each article id and save it as a constant */
      const articleId = article.getAttribute('id');
      console.log(articleId);

      /* find element with the article title and and save its content to the constant */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);

      /* based on these information create link HTML code and save it to the constant */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* insert the created HTML code to the link list in the left column */
      
      console.log(titleList);
      document.querySelector(optTitleListSelector).insertAdjacentHTML('beforeend', linkHTML);
      html = html + linkHTML;
      console.log(html);
    }
    titleList.innerHTML = html;
    console.log(titleList);

    const links = document.querySelectorAll('.titles a');
  for (const link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();
}

