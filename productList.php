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

// Query to get products from the 'product' table
$sql = "SELECT productID, productName, quantity, price FROM product";
$result = mysqli_query($conn, $sql);
?>

<html>
<head>
    <title>Product List</title>
</head>
<body>
    <h2>Product List</h2>

    <table border="1" cellpadding="5" cellspacing="0">
        <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>

        <?php
        if (mysqli_num_rows($result) > 0) {
            // Display each product row
            while ($row = mysqli_fetch_assoc($result)) {
                echo "<tr>";
                echo "<td>" . $row['productName'] . "</td>";
                echo "<td>" . $row['quantity'] . "</td>";
                echo "<td>$" . $row['price'] . "</td>";
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='4'>No products found</td></tr>";
        }
        ?>
    </table>
</body>
</html>

<?php
// Close the connection
mysqli_close($conn);
?>