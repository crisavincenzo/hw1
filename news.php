<?php 
    require_once 'auth.php';
    if (!$userid = checkAuth()) 
    {
        header("Location: index.php");
        exit;
    }
    
    if(isset($_POST["search"]))
    {
        $search = $_POST["search"];
        $_SESSION["search"]=$search;
        header("Location: contents.php");
        exit;
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <title>BingePlan</title>
        <link rel="shortcut icon" href="images/logo1.png" type="image/x-icon">
        <link rel="stylesheet" href="news.css" />
        <link rel="stylesheet" href="generic.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="news.js" defer="true"></script>
        <script src="generic.js" defer="true"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Lilita+One&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
    </head>

    <body>

    <header>
        <h2>Ultime <span class="azzurro">Notizie</span> sul cinema</h2>
        <h1>BingePlan</h1>   
    </header>

    <main>
        <div class="sidebar">
            <div class="logo_content">
                <div class="logo">
                   <img src="images/wired-outline-62-film.gif">
                   <div class="nome">BingePlan</div> 
                </div>
                <img src="images/menu.png" id="lateral_button">
            </div>

            <form name='search' method='post'>
            <label class="cerca">
                <img src="images/search.png" id="search_button">   
                <input type="text" name="search" placeholder="Cerca contenuto..."> 
            </label>  
            </form> 
            
            <ul class="nav">
                <li>
                    <a href="home.php" id="home">
                        <img src="images/home.png"> 
                        <span class="link">Home</span>
                    </a>
                    <span class="tip">Home</span>
                </li>

                <li>
                    <a href="news.php" id="news">
                        <img src="images/news.png"> 
                        <span class="link">News</span>
                    </a>
                    <span class="tip">News</span>
                </li>

                <li>
                    <a href="popular.php" id="popolari">
                        <img src="images/fire.png"> 
                        <span class="link">Popolari</span>
                    </a>
                    <span class="tip">Popolari</span>
                </li>

                <li>
                    <a href="profilo.php" id="profilo">
                        <img src="images/user.png"> 
                        <span class="link">Profilo</span>
                    </a>
                    <span class="tip">Profilo</span>
                </li>

                <li>
                    <a href="logout.php" id="logout">
                        <img src="images/log-out.png"> 
                        <span class="link">Logout</span>
                    </a>
                    <span class="tip">Logout</span>
                </li>


            </ul>
            
        </div>

       

        <article>
            <img src="images/loading.gif" id="loading">

        </article>

    </main>

    <footer>
        <section class="colonna"> 
            <h1>BingePlan</h1>
            <p>Vincenzo Crisà</p>
            <p>1000016666</p>
        </section>

        <section class="colonna"> 
            <strong>AZIENDA</strong>
            <p>Chi siamo</p>
            <p>Lavora con noi</p>
        </section>

        <section class="colonna">
            <strong>LINK UTILI</strong>
            <p>NEWSDATA.io</p>
            <p>IMDB.com</p>
            <p>Informazioni legali</p>
        <section>
    </footer>

    </body>
</html>