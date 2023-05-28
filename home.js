function aggiungi(event)
{
    event.stopPropagation();
    event.preventDefault();

    const id = event.currentTarget.parentNode.dataset.id;
    const title = event.currentTarget.parentNode.dataset.title;
    const image = event.currentTarget.parentNode.dataset.image;


    const formData = new FormData();
    formData.append('id', id);
    formData.append('titolo',title);
    formData.append('poster',image);
    fetch("save_content.php", {method: 'post', body: formData}).then(onResponse).then(onJsonQuery);
    event.currentTarget.classList.add('hidden'); 
    const already = document.createElement('p');
    already.textContent="Aggiunto alla lista";
    event.currentTarget.parentNode.appendChild(already);
    creaNonVisti(id,title,image);
}

function onJsonContent(json)
{
    console.log(json);
    const section=document.querySelector('#content');
    section.innerHTML='';

    const block=document.createElement('div');
    block.classList.add('block');

    const img=document.createElement('img');
    img.src=json.image;

    const info=document.createElement('div');
    info.classList.add('info');
    const titolo=document.createElement('h3');
    titolo.textContent=json.title;

    const quote=document.createElement('div');
    quote.classList.add('vote');

    const anno=document.createElement('p');
    anno.textContent=json.year;
    const voto=document.createElement('p');
    voto.textContent=json.imDbRating + "/10";

    const tipo=document.createElement('p');
    tipo.textContent=json.type + " - " + json.genres;

    const sinossi_testo=document.createElement('p');
    sinossi_testo.textContent="Sinossi:";
    sinossi_testo.classList.add('azzurro');
    const sinossi=document.createElement('p');
    sinossi.textContent=json.plotLocal;

    const durata=document.createElement('p');

    if(json.tvSeriesInfo!==null)
    {
        durata.textContent="Durata: " + json.tvSeriesInfo.seasons.length + " stagioni";
    }else if(json.runtimeStr!==null)
    {
        durata.textContent="Durata: " + json.runtimeStr;
    }else
    {
        durata.textContent="Durata: " + json.runtimeMins;
    }

    const cast=document.createElement('p');
    cast.textContent="Cast: " + json.stars;

    const premi=document.createElement('p');
    premi.textContent="Premi: " + json.awards;

    const trailer=document.createElement('a');
    trailer.href=json.linkEmbed;
    trailer.textContent="Trailer";

    const simili=document.createElement('p');
    simili.textContent="Simili:";

    const similar=document.createElement('div');
    similar.classList.add('similar');

    for(let i=0;i<3;i++)
    {
        const doc=json.similars[i];

        const container=document.createElement('a');
        container.href="#content";
        container.classList.add('container');
        container.dataset.id=doc.id;
        container.dataset.title=doc.title;
        container.dataset.image=doc.image;

        const titolo = document.createElement('h3');
        titolo.textContent=doc.title;
        const img = document.createElement('img');
        img.classList.add('poster');
        img.src=doc.image;

        container.addEventListener('click',fetch_content);

        container.appendChild(titolo);
        container.appendChild(img);
        similar.appendChild(container);


        if(!doc.selected)
        {
            const button=document.createElement('button');
            button.classList.add('button');
            button.textContent='Aggiungi alla lista';
            button.addEventListener('click',aggiungi);
            container.appendChild(button);
        }else
        {
            const already = document.createElement('p');
            already.textContent="Già in lista";
            container.appendChild(already);
        }
    }

    section.appendChild(block);

    block.appendChild(img);
    block.appendChild(info);

    info.appendChild(titolo);
    info.appendChild(quote);
    quote.appendChild(anno);
    quote.appendChild(voto);
    info.appendChild(tipo);
    info.appendChild(sinossi_testo);
    info.appendChild(sinossi);
    info.appendChild(durata);

    section.appendChild(cast);
    section.appendChild(premi);
    section.appendChild(trailer);
    section.appendChild(simili);
    section.appendChild(similar);

}

function onResponse(response) 
{
    return response.json();
}

function fetch_content(event)
{
    const id=event.currentTarget.dataset.id;
    fetch('content_data.php?q='+encodeURIComponent(id)).then(onResponse).then(onJsonContent);
}

const containers=document.querySelectorAll('.container');
for(const container of containers)
{
    container.addEventListener('click',fetch_content);
}

function onJsonQuery(json)
{
    console.log(json);
    if (!json.ok) 
    {
        return null;
    }

}

function removeFromList(event)
{
    event.stopPropagation();
    event.preventDefault();
    const id=event.currentTarget.parentNode.dataset.id;
    fetch('remove_content.php?q='+id).then(onResponse).then(onJsonQuery);
    event.currentTarget.parentNode.remove();
}

function creaVisti(id,title,image)
{
    const view_visto=document.querySelector('#view_visto');

    const container=document.createElement('a');
    container.href="#content";
    container.classList.add('container');
    container.dataset.id=id;
    container.dataset.title=title;
    container.dataset.image=image;

    const titolo = document.createElement('h3');
    titolo.textContent=title;
    const img = document.createElement('img');
    img.classList.add('poster');
    img.src=image;

    const button=document.createElement('button');
    button.classList.add('button');
    button.textContent='Non visto';
    button.addEventListener('click',togli_visto);
    
    container.addEventListener('click',fetch_content);
    container.appendChild(titolo);
    container.appendChild(img);
    container.appendChild(button);

    view_visto.appendChild(container);
}

function creaNonVisti(id,title,image)
{
    const view_non_visto=document.querySelector('#view_non_visto');

    const container=document.createElement('a');
    container.href="#content";
    container.classList.add('container');
    container.dataset.id=id;
    container.dataset.title=title;
    container.dataset.image=image;

    const titolo = document.createElement('h3');
    titolo.textContent=title;
    const img = document.createElement('img');
    img.src=image;
    img.classList.add('poster');

    const button=document.createElement('button');
    button.classList.add('button');
    button.textContent='Visto';
    button.addEventListener('click',aggiungi_visto);

    const remove=document.createElement('img');
    remove.src='images/x-circle.png';
    remove.classList.add('remove');
    remove.addEventListener('click',removeFromList);

    container.addEventListener('click',fetch_content);
    container.appendChild(titolo);
    container.appendChild(img);
    container.appendChild(button);
    container.appendChild(remove);

    view_non_visto.appendChild(container);
}

function togli_visto(event)
{   
    event.stopPropagation();
    event.preventDefault();
    const id=event.currentTarget.parentNode.dataset.id;
    const title=event.currentTarget.parentNode.dataset.title;
    const image=event.currentTarget.parentNode.dataset.image;
    event.currentTarget.parentNode.remove();

    fetch('non_visto.php?q='+encodeURIComponent(id)).then(onResponse).then(onJsonQuery);
    creaNonVisti(id,title,image);
}

function aggiungi_visto(event)
{   
    event.stopPropagation();
    event.preventDefault();
    const id=event.currentTarget.parentNode.dataset.id;
    const title=event.currentTarget.parentNode.dataset.title;
    const image=event.currentTarget.parentNode.dataset.image;
    event.currentTarget.parentNode.remove();

    fetch('visto.php?q='+encodeURIComponent(id)).then(onResponse).then(onJsonQuery);
    creaVisti(id,title,image);
}

function aggiungi_citazione(event)
{
    event.preventDefault();
    const citazione=event.currentTarget.parentNode.dataset.citazione;
    const personaggio=event.currentTarget.parentNode.dataset.personaggio;
    fetch('save_citazione.php?q='+encodeURIComponent(citazione+"-"+personaggio)).then(onResponse).then(onJsonQuery);
    event.currentTarget.classList.add('hidden');

    const update=document.createElement('p');
    update.textContent="Bio aggiornata!";
    update.classList.add('azzurro');
    event.currentTarget.parentNode.appendChild(update);

    const view_quote = document.querySelector('#view_quote');
    const buttons=view_quote.querySelectorAll('button.hidden');
    for (const button of buttons)
    {
        if(button!==event.currentTarget)
        {
            button.classList.remove('hidden');
            button.parentNode.querySelector('p.azzurro').classList.add('hidden');
        }
    }
}

const non_visti=document.querySelectorAll('#view_non_visto .button');
for(const non_visto of non_visti)
{
    non_visto.addEventListener('click',aggiungi_visto);
}

const visti=document.querySelectorAll('#view_visto .button');
for(const visto of visti)
{
    visto.addEventListener('click',togli_visto);
}

function onJsonQuote(json)
{
    const view_quote = document.querySelector('#view_quote');
    view_quote.innerHTML = '';
    console.log(json);
    if(!json.error)
    {
        for(let i=0;i<5;i++)
        {
            const doc=json[0][i];
            const title=doc.anime;
            const character=doc.character;
            const quote=doc.quote;

            const div=document.createElement('div');
            const quotes=document.createElement('div');
            quotes.dataset.citazione=quote;
            quotes.dataset.personaggio=character;
            quotes.classList.add('quotes');
            const titolo=document.createElement('h4');
            titolo.textContent='Titolo: '+title;
            titolo.classList.add('azzurro');
            const personaggio= document.createElement('p');
            personaggio.textContent='Personaggio: '+character;
            const frase=document.createElement('p');
            frase.classList.add('quote');
            frase.textContent='\"'+quote+'\"';

            const button = document.createElement('button');
            button.classList.add('button');
            button.textContent="Imposta nella Bio";
            button.addEventListener('click',aggiungi_citazione);

            div.appendChild(titolo);
            div.appendChild(personaggio);
            div.appendChild(frase);

            quotes.appendChild(div);
            quotes.appendChild(button);
            view_quote.appendChild(quotes);
        }
    }else
    {
        const errore= document.createElement('p');
        errore.textContent='Campo non valido.';
        view_quote.appendChild(errore);
    }
    
}

function searchByCharacter(event)
{
    event.preventDefault();
    fetch('request_php/quote_character.php?q='+encodeURIComponent(form_character.character.value)).then(onResponse).then(onJsonQuote);
    form_character.character.value="";
}

function searchByTitle(event)
{
    event.preventDefault();
    fetch('request_php/quote_title.php?q='+encodeURIComponent(form_title.title.value)).then(onResponse).then(onJsonQuote);
    form_title.title.value="";
}

const form_title = document.forms['title'];
form_title.addEventListener('submit',searchByTitle);

const form_character = document.forms['character'];
form_character.addEventListener('submit', searchByCharacter);

function aggiungi_immagine(event)
{
    const foto=event.currentTarget.parentNode.querySelector('img').src;
    fetch("save_foto.php?q="+encodeURIComponent(foto)).then(onResponse).then(onJsonQuery);
    event.currentTarget.classList.add('hidden');

    const update=document.createElement('p');
    update.textContent="Bio aggiornata!";
    update.classList.add('azzurro');
    event.currentTarget.parentNode.appendChild(update);

    const view_pic = document.querySelector('#view_pic');
    const buttons=view_pic.querySelectorAll('button.hidden');
    for (const button of buttons)
    {
        if(button!==event.currentTarget)
        {
            button.classList.remove('hidden');
            button.parentNode.querySelector('p.azzurro').classList.add('hidden');
        }
    }
}

function onJsonPic(json)
{
    console.log(json);
    const view_pic=document.querySelector('#view_pic');
    view_pic.innerHTML='';
    if(!json.exists)
    {
        const error=document.createElement('p');
        error.textContent="Non hai ancora visto questo contenuto.Aggiungilo per impostare nel tuo profilo l'immagine che vuoi";
        view_pic.appendChild(error);
    }else
    {
        for(let i=0;i<10;i++)
        {
            const doc=json.items[i]

            const pic_container=document.createElement('div');
            pic_container.classList.add('pic_container');
            const pic=document.createElement('img');
            pic.src=doc.image;
            const button = document.createElement('button');
            button.classList.add('button');
            button.textContent="Imposta nella Bio";
            button.addEventListener('click',aggiungi_immagine);

            pic_container.appendChild(pic);
            pic_container.appendChild(button);
            view_pic.appendChild(pic_container);
            
        }
            
    }

}

function onJsonPoster(json)
{
    console.log(json);
    const view_pic=document.querySelector('#view_pic');
    view_pic.innerHTML='';
    if(!json.exists)
    {
        const error=document.createElement('p');
        error.textContent="Non hai ancora visto questo contenuto.Aggiungilo per impostare nel tuo profilo l'immagine che vuoi";
        view_pic.appendChild(error);
    }else
    {
        for(let i=0;i<10;i++)
        {
            const doc=json.posters[i]

            const pic_container=document.createElement('div');
            pic_container.classList.add('pic_container');
            const pic=document.createElement('img');
            pic.src=doc.link;
            const button = document.createElement('button');
            button.classList.add('button');
            button.textContent="Imposta nella Bio";
            button.addEventListener('click',aggiungi_immagine);

            pic_container.appendChild(pic);
            pic_container.appendChild(button);
            view_pic.appendChild(pic_container);
            
        }
            
    }

}

function searchByImage(event)
{
    event.preventDefault();
    fetch('imdb_image.php?q='+encodeURIComponent(form_image.title.value)).then(onResponse).then(onJsonPic);
    form_image.title.value="";
}

function searchByPoster(event)
{
    event.preventDefault();
    fetch('imdb_poster.php?q='+encodeURIComponent(form_poster.title.value)).then(onResponse).then(onJsonPoster);
    form_poster.title.value="";
}

const form_image = document.forms['image'];
form_image.addEventListener('submit',searchByImage);

const form_poster = document.forms['poster'];
form_poster.addEventListener('submit', searchByPoster);

function onJsonNonVisti(json)
{
    if(json.ok===true)
    {
        for(let i=0;i<json.data.length;i++)
        {
            creaNonVisti(json.data[i].id,json.data[i].titolo,json.data[i].poster);
        }    
    }
}

function onJsonVisti(json)
{
    if(json.ok===true)
    {
        for(let i=0;i<json.data.length;i++)
        {
            creaVisti(json.data[i].id,json.data[i].titolo,json.data[i].poster);
        }    
    }
}


fetch('contenuti_non_visti.php').then(onResponse).then(onJsonNonVisti);
fetch('contenuti_visti.php').then(onResponse).then(onJsonVisti);