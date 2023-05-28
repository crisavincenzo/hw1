<?php
  include 'auth.php';
  if (checkAuth()) 
  {
    header('Location: home.php');
    exit;
  }

  if (isset($_POST["username"]) && isset($_POST["password"]) )
  {
        
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

    $username = mysqli_real_escape_string($conn, $_POST['username']);
   
    $query = "SELECT * FROM users WHERE username = '".$username."'";
       
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
        
    if (mysqli_num_rows($res) > 0) 
    {
      $riga = mysqli_fetch_assoc($res);
      if (password_verify($_POST['password'], $riga['pwd'])) 
      {
      
        $_SESSION["username"] = $riga['username'];
        $_SESSION["user_id"] = $riga['id'];
        header("Location: home.php");
        mysqli_free_result($res);
        mysqli_close($conn);
        exit;
      }
    
    }  
    $error = "Credenziali non valide.";
}

?>

<!DOCTYPE html>
<html>
  <head>
    <title>BingePlan</title>
    <link rel="shortcut icon" href="images/logo1.png" type="image/x-icon">
    <link rel="stylesheet" href="login.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="login.js" defer="true"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lilita+One&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
  </head>

  <body>

    <div class="container">
      <img src="images/wired-outline-62-film.gif"> <h1>BingePlan</h1>
    </div>
    
    <form name='login' method='post'>
      <h2>Effettua il login</h2>

      <?php   
      if (isset($error)) 
      {
        echo "<p class='animate__animated animate__bounce errorephp'>$error</p>";
      }             
      ?>
      <p class="animate__animated animate__bounce errore hidden">Inserisci username e password.</p>

      <label><input type='text' name='username' placeholder="Nome Utente"></label>
      <label><input type='password' name='password' placeholder="Password"><img src="images/wired-lineal-69-eye.gif" class="show"></label>
      <input type='submit' value="Accedi" class="button">
      <p class="opaco">Non hai un account? <a href="signup.php">Registrati ora</a></p>
      <p class="opaco">&#8592;Torna alla <a href="index.php">Schermata iniziale</a></p>
    </form>
  
  </body>
</html>
