<?php
// Database configuration
$servername = "localhost";
$username = "root"; // Replace with your database username
$password = "";     // Replace with your database password
$dbname = "shop";   // Database name

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

    // Get username and password from form
    $inputUsername = $_POST['username'];
    $inputPassword = $_POST['password'];

    // Query to check if user exists
    $sql = "SELECT * FROM user WHERE username = '$inputUsername' AND password = '$inputPassword'";
    $result = mysqli_query($conn, $sql);

    // Check if the query returns a matching user
    if (mysqli_num_rows($result) > 0) {
        // Login successful, redirect to product.php
        header("Location: start.html");
        exit(); // Ensure no further code is executed
    } else {
        // Invalid credentials
        echo "Invalid username or password.";
    }

// Close connection
mysqli_close($conn);
?>
