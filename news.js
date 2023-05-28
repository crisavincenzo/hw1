function onJsonNews(json)
{
    const article = document.querySelector('article');
    article.innerHTML="";

   for(let i=0;i<10;i++)
    {
        const doc=json.results[i];
        const title=doc.title;
        const articolo=doc.description;
        const link=doc.link;

        const titolo=document.createElement('h3');
        titolo.textContent=title;
        titolo.classList.add('azzurro');

        const testo=document.createElement('p');
        testo.textContent=articolo;

        const l=document.createElement('a');
        l.textContent='Link notizia';
        l.href=link;

        const notizia = document.createElement('section');
        notizia.classList.add('notizia');
        article.appendChild(notizia);
        notizia.appendChild(titolo);
        notizia.appendChild(testo);
        notizia.appendChild(l);
    }
    
}

function onResponse(response) 
{
    return response.json();
}

fetch('request_php/news_request.php').then(onResponse).then(onJsonNews);
