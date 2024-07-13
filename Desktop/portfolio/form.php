<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = "ikalwani@umich.edu"; // Replace with your email address
    $subject = "Message from your website";
    $body = "Name: $name\nEmail: $email\nMessage:\n$message";

    if (mail($to, $subject, $body)) {
        echo json_encode(array('status' => 'success'));
        exit;
    } else {
        echo json_encode(array('status' => 'error', 'message' => 'Failed to send message.'));
        exit;
    }
}
?>
