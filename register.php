<?php
// การตั้งค่าฐานข้อมูล
$servername = "localhost";
$username = "root"; // เปลี่ยนเป็นชื่อผู้ใช้ของฐานข้อมูล
$password = "";     // เปลี่ยนเป็นรหัสผ่านของฐานข้อมูล
$dbname = "shop";   // ชื่อฐานข้อมูล

// เชื่อมต่อกับฐานข้อมูล
$conn = mysqli_connect($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if (!$conn) {
    die("การเชื่อมต่อล้มเหลว: " . mysqli_connect_error());
}

// ตรวจสอบว่าได้รับข้อมูลจากฟอร์มหรือไม่
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // รับข้อมูลชื่อผู้ใช้ รหัสผ่าน และยืนยันรหัสผ่านจากฟอร์ม
    $inputUsername = $_POST['username'];
    $inputPassword = $_POST['password'];
    $confirmPassword = $_POST['confirm_password'];

    // ตรวจสอบว่ารหัสผ่านตรงกันหรือไม่
    if ($inputPassword !== $confirmPassword) {
        echo "รหัสผ่านไม่ตรงกัน กรุณาลองใหม่";
    } else {
        // ตรวจสอบว่าชื่อผู้ใช้ซ้ำหรือไม่
        $sql = "SELECT * FROM user WHERE username = '$inputUsername'";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            echo "ชื่อผู้ใช้นี้มีอยู่แล้ว กรุณาเลือกชื่ออื่น";
        } else {
            // เพิ่มผู้ใช้ใหม่ลงในฐานข้อมูล
            $sql = "INSERT INTO user (username, password) VALUES ('$inputUsername', '$inputPassword')";

            if (mysqli_query($conn, $sql)) {
                echo "ลงทะเบียนสำเร็จ! คุณสามารถเข้าสู่ระบบได้แล้ว";
                header("Location: Login2.html");
                exit();
            } else {
                echo "เกิดข้อผิดพลาด: " . $sql . "<br>" . mysqli_error($conn);
            }
        }
    }
}

// ปิดการเชื่อมต่อ
mysqli_close($conn);
?>
