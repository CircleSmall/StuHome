<?php
/*
 * 1:成功上传
 *-1:文件超过规定大小
 *-2:文件类型不符
 *-3:移动文件出错
 */
if(is_uploaded_file($_FILES['upfile']['tmp_name'])){

 $photo_types=array('image/jpg', 'image/jpeg','image/png','image/pjpeg','image/gif','image/bmp','image/x-png');//定义上传格式
        $max_size=700000;    //上传照片大小限制,默认700k
        $photo_folder="upload/".date("Y")."/".date("m")."/".date("d")."/"; //上传照片路径
        ///////////////////////////////////////////////////开始处理上传
        if(!file_exists($photo_folder))//检查照片目录是否存在
        {
            mkdir($photo_folder, 0777, true);  //mkdir("temp/sub, 0777, true);
        }

$upfile=$_FILES['upfile'];
$name=$upfile['name'];
$type=$upfile['type'];
$size=$upfile['size'];
$tmp_name=$upfile['tmp_name'];

$file = $_FILES["upfile"];
$photo_name=$file["tmp_name"];
//echo $photo_name;
$photo_size = getimagesize($photo_name);

if($max_size < $file["size"])//检查文件大小
           echo "-1";       //echo "<script>alert('对不起，文件超过规定大小!');history.go(-1);</script>";
if(!in_array($file["type"], $photo_types))//检查文件类型
           echo "-2";       //echo "<script>alert('对不起，文件类型不符!');history.go(-1);</script>";
if(!file_exists($photo_folder))//照片目录
                  mkdir($photo_folder);
$pinfo=pathinfo($file["name"]);
$photo_type=$pinfo['extension'];//上传文件扩展名
$photo_server_folder = $photo_folder.time().".".$photo_type;//以当前时间和7位随机数作为文件名，这里是上传的完整路径


if(!move_uploaded_file ($photo_name, $photo_server_folder))
            {
             echo "-3"; //echo "移动文件出错";
                exit;
            }
$pinfo=pathinfo($photo_server_folder);
$fname=$pinfo['basename'];
echo "1";   //echo " 已经成功上传：".$photo_server_folder."<br />";




}
?>
