<?php

// Only allow POST request
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Invalid request");
}

// Get form data safely
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');
$services = isset($_POST['service']) ? $_POST['service'] : [];

// Convert checkbox array to string
$service_list = is_array($services) ? implode(", ", $services) : "None";

// Basic validation
if (empty($name) || empty($email) || empty($message)) {
    die("Please fill all required fields.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email format.");
}

// OPTIONAL: Save to database
$conn = mysqli_connect("localhost", "root", "", "portfolio");

if (!$conn) {
    die("Database connection failed");
}

// Insert data securely
$stmt = mysqli_prepare(
    $conn,
    "INSERT INTO contacts (name, email, message, services)
     VALUES (?, ?, ?, ?)"
);

mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $message, $service_list);

if (mysqli_stmt_execute($stmt)) {
    echo "✅ Message sent successfully!";
} else {
    echo "❌ Error saving message";
}

mysqli_close($conn);

?>
