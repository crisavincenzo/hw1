<?php 
  require_once 'auth.php';

  if (checkAuth()) 
  {
    header("Location: home.php");
    exit;
  }  

  $error = array('INVALID_USERNAME' => '','USERNAME_USED' => '', 'LOW_PASSWORD' => '', 'DIFFERENT_PASSWORD' => '','REGEX_PASSWORD' =>'','INVALID_EMAIL' => '','EMAIL_USED' => '','FAILED' => '');
  
  if(isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["confirm_password"]) && isset($_POST["email"]) && isset($_POST["name"]) && 
      isset($_POST["surname"]) && isset($_POST["genere"]) && isset($_POST["allow"]))
  {
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

    if(!preg_match('/^[a-zA-Z0-9_]{4,16}$/', $_POST['username'])) 
    {
      $error['INVALID_USERNAME'] = "Username non valido";
    } else 
    {
      $username = mysqli_real_escape_string($conn, $_POST['username']);
      $query = "SELECT username FROM users WHERE username = '$username'";
      $res = mysqli_query($conn, $query);
      if (mysqli_num_rows($res) > 0) { $error['USERNAME_USED'] = "Username già utilizzato"; }
    }
    
    if (strlen($_POST["password"]) < 8) { $error['LOW_PASSWORD'] = "Caratteri password insufficienti";} 

    if(!(preg_match('/[!@#$&^&*(),.?":{}|<>]/',$_POST["password"]))) { $errore['REGEX_PASSWORD'] = "La password deve contenere almeno un carattere speciale.";}

    if (strcmp($_POST["password"], $_POST["confirm_password"]) != 0) { $error['DIFFERENT_PASSWORD'] = "Le password non coincidono";}

    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) 
    {
      $error['INVALID_EMAIL'] = "Email non valida";
    } else 
    {
      $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
      $res = mysqli_query($conn, "SELECT email FROM users WHERE email = '$email'");
      if (mysqli_num_rows($res) > 0) {$error['EMAIL_USED'] = "Email già utilizzata";}
    }

    $no_error=true; 
    foreach ($error as $key => $value) 
    {
      if (strlen($value) > 0) $no_error=false;
    }

    if($no_error)
    {
      $name = mysqli_real_escape_string($conn, $_POST['name']);
      $surname = mysqli_real_escape_string($conn, $_POST['surname']);
      $password = mysqli_real_escape_string($conn, $_POST['password']);
      $password = password_hash($password, PASSWORD_BCRYPT);
      $genere = mysqli_real_escape_string($conn, $_POST['genere']);

      $query="INSERT INTO users(username,pwd,nome,cognome,email,genere) VALUES
        (\"$username\", \"$password\", \"$name\", \"$surname\", \"$email\",\"$genere\")";
        
      if (mysqli_query($conn, $query)) 
      {
        header("Location: redirect.php");
        exit;
      } else 
      {
        $error['FAILED'] = "Errore di connessione al Database";
      }
    }
    mysqli_close($conn);
  }
?>

<!DOCTYPE html>
<html>
  <head>
    <title>BingePlan</title>
    <link rel="shortcut icon" href="images/logo1.png" type="image/x-icon">
    <link rel="stylesheet" href="signup.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="signup.js" defer="true"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lilita+One&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
  </head>

  <body>

    <div class="container">
      <img src="images/wired-outline-62-film.gif"> <h1>BingePlan</h1>
    </div>
    <h2>Crea il tuo nuovo account</h2>
    <p class="slogan">Mantieni <span class='azzurro'> sempre aggiornata </span> la tua WatchList!</p>
    <article>
      
      <main>
        <form name='signup' method='post'>  

          <?php
            if(strlen($error['FAILED'])!==0)
            {
            echo "<p class='animate__animated animate__bounce errore'>" .$error['FAILED']."</p>";
            }
          ?> 
          
          
          <p id="err_empty_name" class="errore hidden animate__animated animate__bounce">&#8595; Campo obbigatorio</p>
          <p id="err_name_regex" class="errore hidden animate__animated animate__bounce">&#8595; Nome non valido</p>
          <label id="name">Nome <input type='text' name='name'></label>
          
          
          <p id="err_empty_surname" class="errore hidden animate__animated animate__bounce">&#8595; Campo obbigatorio</p>
          <p id="err_surname_regex" class="errore hidden animate__animated animate__bounce">&#8595; Cognome non valido</p>
          <label id="surname">Cognome <input type='text' name='surname'></label>
          
          
          <p id="err_genere" class="errore hidden animate__animated animate__bounce">&#8595; Campo obbigatorio</p>
          <label id="genere">Genere <input type='radio' name='genere' value="m" class="sel">Maschio
          <input type='radio' name='genere' value="f" class="sel">Femmina
          <input type='radio' name='genere' value="a" class="sel">Altro
          </label>
          
          
          <p id="err_email_regex" class="errore hidden animate__animated animate__bounce">&#8595; Email non valida</p>
          <p id="err_email" class="errore hidden animate__animated animate__bounce">&#8595; Email già in uso</p>
          <p id="err_empty_email" class="errore hidden animate__animated animate__bounce">&#8595; Campo obbligatorio</p>
          <?php
            if(strlen($error['INVALID_EMAIL'])!==0)
            {
              echo "<p class='animate__animated animate__bounce errore'>&#8595; " .$error['INVALID_EMAIL']."</p>";
            }
            if(strlen($error['EMAIL_USED'])!==0)
            {
              echo "<p class='animate__animated animate__bounce errore'>&#8595; " .$error['EMAIL_USED']."</p>";
            }
          ?>
          <label id="email">Email <input type='text' name='email'></label>
          
          
          <p id="err_username_regex" class="errore hidden animate__animated animate__bounce">&#8595; Sono ammesse lettere, numeri e underscore e un massimo di 16 caratteri</p>
          <p id="err_username" class="errore hidden animate__animated animate__bounce">&#8595; Username già in uso</p>
          <p id="err_empty_username" class="errore hidden animate__animated animate__bounce">&#8595; Campo obbligatorio</p>
          <?php
            if(strlen($error['INVALID_USERNAME'])!==0)
            {
            echo "<p class='animate__animated animate__bounce errore'>&#8595; " .$error['INVALID_USERNAME']."</p>";
            }
            if(strlen($error['USERNAME_USED'])!==0)
            {
            echo "<p class='animate__animated animate__bounce errore'>&#8595; " .$error['USERNAME_USED']."</p>";
            }
          ?> 
          <label id="username">Scegli Username <input type='text' name='username'> </label>

          
          <p id="err_low_password" class="errore hidden animate__animated animate__bounce">&#8595; La password deve contenere almeno 8 caratteri e almeno uno speciale </p>
          <?php
            if(strlen($error['LOW_PASSWORD'])!==0)
            {
              echo "<p class='animate__animated animate__bounce errore'>&#8595; " .$error['LOW_PASSWORD']."</p>";
            }
            if(strlen($error['REGEX_PASSWORD'])!==0)
            {
              echo "<p class='animate__animated animate__bounce errore'>&#8595; " .$error['REGEX_PASSWORD']."</p>";
            }
          ?>
          <label id="password">Scegli Password <input type='password' name='password'><img src="images/wired-lineal-69-eye.gif" class="show"></label>
          
          <p id="err_password2" class="errore hidden animate__animated animate__bounce">&#8595; Campo obbigatorio</p>
          <p id="err_different_password" class="errore hidden animate__animated animate__bounce">&#8595; Le password non coincidono</p>
          <?php
            if(strlen($error['DIFFERENT_PASSWORD'])!==0)
            {
              echo "<p class='animate__animated animate__bounce errore'>&#8595; " .$error['DIFFERENT_PASSWORD']."</p>";
            }
          ?>
          <label id="confirm_password">Conferma Password <input type='password' name='confirm_password'><img src="images/wired-lineal-69-eye.gif" class="show"></label>
          
          
          <p id="err_allow" class="errore hidden animate__animated animate__bounce">&#8595; Accetta i termini e condizioni per continuare </p>
          <label class='condizioni'><input type='checkbox' name='allow' value="checked">Accetto i termini e condizioni d'uso di BingePlan.</label>

          <label><input type='submit' value="Crea account" class="button"></label>  
          <p class="opaco">&#8212;&#8212;&#8212;&#8212; Hai già un account? <a href="login.php">Accedi ora</a> &#8212;&#8212;&#8212;&#8212;</p>
        
        </form>
      
      </main>
     
    </article>
    <p>&#8592;Torna alla <a href="index.php">Schermata iniziale</a></a>
  </body>
</html>

