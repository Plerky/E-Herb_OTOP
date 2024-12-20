<?php
session_start();

// ตรวจสอบว่าผู้ใช้เข้าสู่ระบบหรือยัง
if (!isset($_SESSION['username'])) {
    // หากยังไม่ได้เข้าสู่ระบบ ให้นำไปยังหน้า login
    header("Location: login.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <title>Homepage</title>
</head>
<body>
    <h1>ยินดีต้อนรับ, <?php echo $_SESSION['username']; ?>!</h1>
    <p>นี่คือหน้า Homepage ของคุณ</p>
    <a href="logout.php">ออกจากระบบ</a>
</body>
</html>
