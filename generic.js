
function show_sidebar(event)
{
    if(event.target.id==="search_button" && show===true)
    {
        event.target.removeEventListener('click',show_sidebar);
    }else
    {
        document.querySelector('.sidebar').classList.toggle('show_all');
        document.querySelector('article').classList.toggle('open');
        document.querySelector('footer').classList.toggle('open_footer');
    }

    if(document.querySelector('.sidebar').classList.contains('show_all'))
    {
        show=true;
    }else
    {
        show=false;
        document.querySelector('.cerca img').addEventListener('click',show_sidebar);
    }

}

function cambioimg(event)
{
    const riga=event.currentTarget;
    const img=riga.querySelector('img');

    if(black===false)
    {
        if(riga.id==="home")
        {
            img.src="images/home_black.png";
            black=true;
        }
        if(riga.id==="news")
        {
            img.src="images/news_black.png";
            black=true;
        }
        if(riga.id==="popolari")
        {
            img.src="images/fire_black.png";
            black=true;
        }
        if(riga.id==="profilo")
        {
            img.src="images/user_black.png";
            black=true;
        }
        if(riga.id==="logout")
        {
            img.src="images/log-out_black.png";
            black=true;
        }
    }else
    {
        if(riga.id==="home")
        {
            img.src="images/home.png";
            black=false;
        }
        if(riga.id==="news")
        {
            img.src="images/news.png";
            black=false;
        }
        if(riga.id==="popolari")
        {
            img.src="images/fire.png";
            black=false;
        }
        if(riga.id==="profilo")
        {
            img.src="images/user.png";
            black=false;
        }
        if(riga.id==="logout")
        {
            img.src="images/log-out.png";
            black=false;
        }
    }
}


let black=false;
const all_a=document.querySelectorAll(".sidebar a");
for(const a of all_a)
{
    a.addEventListener('mouseenter',cambioimg);
    a.addEventListener('mouseleave',cambioimg);
}

let show=false;
document.querySelector('#lateral_button').addEventListener('click',show_sidebar);
document.querySelector('.cerca img').addEventListener('click',show_sidebar);
