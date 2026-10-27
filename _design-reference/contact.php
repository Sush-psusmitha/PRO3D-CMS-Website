<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["name"])) { 
    $nameerr = "Name is required";
  } else {
    $name = test_input($_POST["name"]);
  }
  
  if (empty($_POST["email"])) {
    $emailerr = "Email is required";
  } else {
    $email = test_input($_POST["email"]);
  }
    
  if (empty($_POST["contact"])) {
    $contacterr = "";
  } else {
    $contact = test_input($_POST["contact"]);
  }

  if (empty($_POST["message"])) {
    $messageerr = "";
  } else {
    $message = test_input($_POST["message"]);
  }

  if (empty($_POST["country"])) {
    $countryerr = "country is required";
  } else {
    $country = test_input($_POST["country"]);
  }
}
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

$email = filter_var($email, FILTER_SANITIZE_EMAIL); // Sanitizing E-mail.
// After sanitization Validation is performed

if (!preg_match("/^[a-zA-Z ]*$/", $name)) {
     
      echo "<span>* Name should include only letters and whitespace. *</span>";
    }
    else{
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

if (!preg_match("/^[0-9]{10}$/", $contact)) {
echo "<span>* Please Fill Valid Contact No. *</span>";
} else {

$subject = "Received message from THEPRO3DSTUDIO website";
// To send HTML mail, the Content-type header must be set.
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From:' . $email. "\r\n"; // Sender's Email

$template = "Enquiry from Pro3D Studio Website Contact Page:\n\n <br> Name: " . $name . "<br>"
. "\n\n Email: " . $email . "<br>" 
. "\n\n Contact No: " . $contact . "<br>"
. "\n\n Country: " . $country . "<br>"
. "\n\n Message: " . $message  ;
$sendmessage =  $template;
// Message lines should not exceed 70 characters (PHP rule), so wrap it.

// Send mail by PHP Mail Function.
mail("rnagu979@gmail.com", $subject, $sendmessage, $headers);
echo "Your Query has been received, We will contact you soon.";
}
}
else {
echo "<span>* invalid email *</span>";
}
} 
?>