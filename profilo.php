<?php 
    require_once 'auth.php';
    if (!$userid = checkAuth()) 
    {
        header("Location: index.php");
        exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $query = "SELECT * FROM users WHERE id = $userid";
    $res = mysqli_query($conn, $query);
    $info = mysqli_fetch_assoc($res);

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
        <link rel="stylesheet" href="profilo.css" />
        <link rel="stylesheet" href="generic.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="generic.js" defer="true"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Lilita+One&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
    </head>

    <body>

    <header>
        <h2><span class="azzurro">Benvenut<?php echo (strcmp($info['genere'], "f") === 0) ? "a " : "o "; ?></span><?php echo $_SESSION["username"]; ?></h2>
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

            <section class="container">

                <?php 

                    if($info['foto']==null && ($info['genere']=='m'||$info['genere']=='o'))
                    {
                        echo "<img src='images/male_avatar.gif'>";
                    }else if($info['foto']==null && $info['genere']=='f')
                    {
                        echo "<img src='images/female_avatar.gif'>";
                    }else
                    {
                        echo "<img src='".$info['foto']."'>";
                    }
                ?>

                <div class="info">

                    <?php 

                        echo "<p><span class='azzurro'>Nome: </span>".$info['nome']."</p>";
                        echo "<p><span class='azzurro'>Cognome: </span>".$info['cognome']."</p>";
                        if($info['genere']=='m')
                        {
                            echo "<p><span class='azzurro'>Genere: </span>Maschio</p>";
                        }
                        if($info['genere']=='f')
                        {
                            echo "<p><span class='azzurro'>Genere: </span>Femmina</p>";
                        }
                        if($info['genere']=='o')
                        {
                            echo "<p><span class='azzurro'>Genere: </span>Altro</p>";
                        }
                        echo "<p><span class='azzurro'>Username: </span>".$info['username']."</p>";
                        echo "<p><span class='azzurro'>Email: </span>".$info['email']."</p>";
                        echo "<p><span class='azzurro'>Data Iscrizione: </span>".$info['data_iscrizione']."</p>";

                    ?>

                </div>

            </section>
            <p class='azzurro'>Citazione Preferita:</p>
            <?php 
                if($info['citazione'] == null)
                {
                    echo "<p>Non hai ancora scelto la tua citazione preferita, cercala nella home!</p>";
                }else
                {
                    echo "<p class='citazione'>".$info['citazione']."</p>";
                }
            ?>

            
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