<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <form method="POST" action="index.php">
    <label for="name">名前：</label>
    <input type="text" name="name" size="15">
    <input type="submit" name="submit" value="送信">
  </form>

  <?php
    if (!empty($_REQUEST["submit"])) {
      // 処理を3秒間中断
      sleep(3);
      print("こんにちは。" . htmlspecialchars($_POST["name"], ENT_QUOTES | ENT_HTML5, "UTF-8") . "さん");
    }
  ?>
</body>
</html>