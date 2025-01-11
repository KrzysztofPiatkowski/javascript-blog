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

  /* get 'href' attribute from the clicked link */

    const articleSelector = this.getAttribute('href')
    // const getAttribute = this.getAttribute('href').replace('#','');
    console.log('article selector: ', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    // const foundArticle = document.querySelector(`.${getAttribute}`);
    console.log('Found article: ', targetArticle);

  /* add class 'active' to the correct article */
    const activeArticle = targetArticle.classList.add('active');
  }

  const links = document.querySelectorAll('.titles a');

  for (const link of links) {
    link.addEventListener('click', titleClickHandler);
  }